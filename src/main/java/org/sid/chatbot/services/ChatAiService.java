package org.sid.chatbot.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.util.List;
import java.util.Map;

@BrowserCallable
@AnonymousAllowed
public class ChatAiService {
    private ChatClient chatClient;

    private VectorStore vectorStore;
    @Value("classpath:/prompt/prompt-template.st")
    private Resource ressource;

    public ChatAiService(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder.build();
        this.vectorStore = vectorStore;
    }

    public String ragChat(String message) {
        List<Document> documents = vectorStore.similaritySearch(message);

        List< String > context =  documents.stream().map(Document::getContent).toList();

        PromptTemplate promptTemplate = new PromptTemplate(ressource);

        Prompt prompt = promptTemplate.create(Map.of("context", context, "question", message));

        return chatClient.prompt(prompt).user(message).call().content();
    }

}

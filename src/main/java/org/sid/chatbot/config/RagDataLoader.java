package org.sid.chatbot.config;

import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.util.List;

@Component
public class RagDataLoader {
    @Value("classpath:/pdfs/SOHAB_Othman_CV.pdf")
    private Resource pdfResource;

    @Value("store-data-v1.json")
    private String storeFile;

    @Bean
    public SimpleVectorStore simpleVectorStore(EmbeddingModel emb) {
        SimpleVectorStore vectorStore = new SimpleVectorStore(emb);
        String fileStorePath = Path.of("src", "main", "resources", "store")
                .toAbsolutePath() + "/" + storeFile;
        File file = new File(fileStorePath);
        if (!file.exists()) {
            PagePdfDocumentReader pagePdfDocumentReader = new PagePdfDocumentReader(pdfResource);
            List<Document> documents = pagePdfDocumentReader.get();

            // Add logging to see original document count
            System.out.println("Original Document Count: " + documents.size());

            // Customize TokenTextSplitter with specific parameters
            TokenTextSplitter textSplitter = new TokenTextSplitter(200,100, 500,1000, true);

            List<Document> chunks = textSplitter.split(documents);

            // Add logging to see chunk count
            System.out.println("Chunk Count: " + chunks.size());

            vectorStore.accept(chunks);
            vectorStore.save(file);
        } else {
            vectorStore.load(file);
        }
        return vectorStore;
    }

}
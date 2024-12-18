import { useState, useRef, useEffect } from "react";
import { ChatAiService } from "Frontend/generated/endpoints";
import Markdown from "react-markdown";

interface Message {
    type: "user" | "bot";
    content: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [botState, setBotState] = useState<"idle" | "typing" | "response">("idle");
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the end of the messages container

    // Scroll to the last message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, botState]);

    async function Send() {
        if (inputRef.current) {
            const question = inputRef.current.value;
            setMessages([...messages, { type: "user", content: question }]);
            setBotState("typing");
            inputRef.current.value = ""; // Clear the input field
            ChatAiService.ragChat(question).then((res) => {
                setMessages((prevMessages) => [...prevMessages, { type: "bot", content: res }]);
                setBotState("response");
            });
        }
    }

    return (
        <div className="h-auto">
            <div x-data="chatBot()">
                <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-[calc(100vh-100px)] bg-white">
                    <div
                        id="messages"
                        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-gray scrollbar-thumb-rounded scrollbar-track-gray-lighter scrollbar-w-2 scrolling-touch"
                    >
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-end ${message.type === "user" ? "justify-end" : ""}`}>
                                <div
                                    className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${
                                        message.type === "user" ? "order-1 items-end" : "order-2 items-start"
                                    }`}
                                >
                                    <div>
                                        <span
                                            className={`px-4 py-3 rounded-xl inline-block ${
                                                message.type === "user"
                                                    ? "rounded-br-none bg-gray-700 text-white"
                                                    : "rounded-bl-none bg-gray-300 text-gray-600"
                                            }`}
                                        >
                                            <Markdown>{message.content}</Markdown>
                                        </span>
                                    </div>
                                </div>
                                {message.type === "user" && (
                                    <img
                                        src="https://media.licdn.com/dms/image/v2/D4E03AQGaTe16sX8dmA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714339655766?e=1740009600&amp;v=beta&amp;t=ESPe6wktT9rMPS_GeihFGBxF_moAJ8b9yvw0NBLMnh8"
                                        alt=""
                                        className="w-10 h-10 rounded-full order-2"
                                    />
                                )}
                            </div>
                        ))}
                        {botState === "typing" && (
                            <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                                    <div>
                                        <img
                                            src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
                                            alt="..."
                                            className="w-16 ml-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef}></div> {/* Scroll target */}
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <input
                                type="text"
                                placeholder="Say something..."
                                autoComplete="off"
                                autoFocus={true}
                                ref={inputRef}
                                className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-gray-700 rounded-full py-2"
                                x-ref="input"
                            />
                            <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-gray-500 hover:bg-gray-600 focus:outline-none"
                                    onClick={Send}
                                >
                                    <svg
                                        fill="#ffffff"
                                        height="100px"
                                        width="100px"
                                        version="1.1"
                                        id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 495.003 495.003"
                                        xmlSpace="preserve"
                                    >
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g id="XMLID_51_">
                                                <path
                                                    id="XMLID_53_"
                                                    d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"
                                                ></path>
                                                <path
                                                    id="XMLID_52_"
                                                    d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

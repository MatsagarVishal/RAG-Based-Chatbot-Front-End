import { useEffect, useRef, useState } from "react";
import { askQuestion } from "../api/ragAPi";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";
import SourceMessage from "./SourceMessage";
import "./ChatBox.css";

export default function ChatBox({ kb_id }) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    const handleAsk = async () => {
        if (!question || loading) return;

        const userMsg = { role: "user", text: question };
        setMessages((prev) => [...prev, userMsg]);
        setQuestion("");
        setLoading(true);

        try {
            const res = await askQuestion(kb_id, userMsg.text);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: res.answer,
                    sources: res.sources || [],
                },
            ])
        } catch (error) {
            console.error("Error asking question:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Something went wrong. Try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="chat-box-container">
            <div className="chat-box-header">
                <h2>💬 Chat with AI</h2>
                <p>Ask questions about the website</p>
            </div>

            <div className="chat-box-messages">
                {messages.length === 0 && (
                    <div className="chat-box-empty-state">
                        👋 Start chatting by asking a question!
                    </div>
                )}
                {messages.map((m, i) => (
                    <SourceMessage key={i} message={m} />
                ))}

                {loading && <Loader />}
                <div ref={bottomRef} />
            </div>

            <div className="chat-box-input-area">
                <input
                    placeholder="Ask something about the website..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={loading}
                    className="chat-box-input"
                    onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                />

                <button
                    onClick={handleAsk}
                    disabled={loading || !question}
                    className="chat-box-send-button"
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
}

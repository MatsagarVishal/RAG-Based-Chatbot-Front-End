import { useState } from "react";
import "./SourceMessage.css";

export default function SourceMessage({ message }) {
    const [open, setOpen] = useState(false);

    const sources = (message.sources || []).slice(0, 3); // limit to top 3
    const isUser = message.role === "user";

    return (
        <div className={`source-message-wrapper ${isUser ? "user" : "assistant"}`}>
            <div className={`source-message-bubble ${isUser ? "user" : "assistant"}`}>
                {/* Answer */}
                <div className="source-message-content">
                    {message.text}
                </div>

                {/* Collapsible Sources */}
                {sources.length > 0 && !isUser && (
                    <div className="source-message-sources">
                        <button
                            onClick={() => setOpen(!open)}
                            className="source-message-toggle"
                        >
                            📚 Sources {open ? "▼" : "▶"}
                        </button>

                        {open && (
                            <ul className="source-message-list">
                                {sources.map((s, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={s}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {s}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

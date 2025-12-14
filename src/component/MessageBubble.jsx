import "./MessageBubble.css";

export default function MessageBubble({ role, text, sources }) {
    const isUser = role === "user";

    return (
        <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
            <div className={`message-bubble-content ${isUser ? "user" : "assistant"}`}>
                <div className="message-bubble-text">{text}</div>

                {!isUser && sources?.length > 0 && (
                    <div className="message-bubble-sources">
                        <b>Sources:</b>
                        <ul>
                            {sources.map((s, i) => (
                                <li key={i}>
                                    <a href={s} target="_blank" rel="noreferrer">
                                        {s}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import "./CrawlLoader.css";

export default function CrawlLoader({ url, isUpdating = false }) {
    const sections = [
        {
            key: "doing",
            title: "What we're doing",
            items: [
                `Crawling pages on ${url || 'your site'}`,
                'Extracting meaningful content and structure',
                'Embedding and indexing for fast retrieval',
            ],
        },
        {
            key: "use",
            title: "How to use the bot",
            items: [
                'Ask about pages, features, or policies',
                'Try: "What does the pricing page say?"',
                'Ask for summaries, links, or exact quotes',
            ],
        },
        {
            key: "why",
            title: "Why it's useful",
            items: [
                "Answers grounded in the website's content",
                'Saves time compared to manual searching',
                'Great for audits, content review, and QA',
            ],
        },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % sections.length);
        }, 3500);
        return () => clearInterval(t);
    }, [sections.length]);

    const current = sections[index];

    return (
        <div className="crawl-loader">
            <div className="crawl-loader-card centered-top">
                <div className="loader-visual top-centered">
                    <div className="ring" />
                    <div className="ring ring-2" />
                    <div className="ring ring-3" />
                </div>

                <div className="loader-content">
                    <h2>{isUpdating ? 'Updating knowledge base…' : 'Building knowledge base…'}</h2>
                    <p className="muted">{isUpdating ? 'Refreshing content from the website.' : 'This may take 3–4 minutes depending on site size.'}</p>

                    <div className="loader-info carousel">
                        <div className="info-block fade-in-out" key={current.key}>
                            <h3>{current.title}</h3>
                            <ul>
                                {current.items.map((it, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="progress-dots">
                        {sections.map((_, i) => (
                            <div
                                key={i}
                                className={`dot ${i === index ? 'active' : ''}`}
                            />
                        ))}
                    </div>

                    <p className="muted small">You can leave this tab open — we'll notify when it's ready.</p>
                </div>
            </div>
        </div>
    );
}

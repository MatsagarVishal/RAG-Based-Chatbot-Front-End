import React, { useEffect, useState } from "react";
import "./CrawlLoader.css";

export default function CrawlLoader({ url, isUpdating = false }) {
    const sections = [
        {
            key: "phase1",
            title: "Phase 1: Ingestion",
            items: [
                `> Initiating crawl on ${url || 'target'}...`,
                '> Parsing DOM structure...',
                '> Extracting semantic data blocks...',
            ],
        },
        {
            key: "phase2",
            title: "Phase 2: Processing",
            items: [
                '> Tokenizing content streams...',
                '> Generating vector embeddings...',
                '> Optimizing for retrieval...',
            ],
        },
        {
            key: "phase3",
            title: "Phase 3: Finalizing",
            items: [
                "> Indexing knowledge nodes...",
                '> Verifying integrity...',
                '> Preparing neural context...',
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
                    <div className="plasma-container">
                        <div className="blob blob-1"></div>
                        <div className="blob blob-2"></div>
                        <div className="blob blob-3"></div>
                    </div>
                    <div className="ring" />
                    <div className="ring ring-2" />
                    <div className="ring ring-3" />
                </div>

                <div className="loader-content">
                    <div className="crawl-loader-header">
                        <h2>{isUpdating ? 'Updating knowledge base…' : 'Building knowledge base…'}</h2>
                        <p className="muted">{isUpdating ? 'Refreshing content from the website.' : 'This may take 3–4 minutes depending on site size.'}</p>
                    </div>

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


                    <p className="muted small">You can leave this tab open — we'll notify when it's ready.</p>
                </div>
            </div>
        </div>
    );
}

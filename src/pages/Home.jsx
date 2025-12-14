import { useState, useEffect } from "react";
import CrawlForm from "../component/CrawlForm";
import ChatBox from "../component/ChatBox";
import CrawlerVisual from "../component/CrawlerVisual";
import { checkHealth } from "../api/ragAPi";
import "./Home.css";

export default function Home() {
    const [kbId, setKbId] = useState(null);
    const [backendReady, setBackendReady] = useState(false);
    const [isCheckingBackend, setIsCheckingBackend] = useState(true);

    useEffect(() => {
        // Wake up the backend on mount
        const wakeBackend = async () => {
            setIsCheckingBackend(true);
            const isReady = await checkHealth();
            setBackendReady(isReady);
            setIsCheckingBackend(false);
        };
        wakeBackend();
    }, []);

    return (
        <div className="home-container">
            {/* Ambient Background Visual */}
            <div className="ambient-visual">
                <CrawlerVisual />
            </div>

            {/* Show ChatBox if active, otherwise show Home Card */}
            {kbId ? (
                <ChatBox kb_id={kbId} />
            ) : (
                <div className="glass-panel main-content centered-card">
                    <div className="home-header">
                        <h1 className="home-title">Sherpa</h1>
                        <p className="home-subtitle">Your website, now with a PhD in small talk.</p>
                    </div>

                    {isCheckingBackend && (
                        <div className="backend-loading">
                            <div className="loading-spinner"></div>
                            <div className="spinner-header">
                                <p>Connecting to Sherpa...</p>
                                <p className="loading-subtext">Initializing secure environment</p>
                            </div>
                        </div>
                    )}

                    {!isCheckingBackend && <CrawlForm onCrawlSuccess={setKbId} />}
                </div>
            )}
        </div>
    );
}

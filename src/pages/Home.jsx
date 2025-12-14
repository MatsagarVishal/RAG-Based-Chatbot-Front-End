import { useState, useEffect } from "react";
import CrawlForm from "../component/CrawlForm";
import ChatBox from "../component/ChatBox";
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
            <div className="home-header">
                <h1 className="home-title">Sherpa</h1>
                <p className="home-subtitle">Your website, now with a PhD in small talk.</p>
            </div>

            {isCheckingBackend && !kbId && (
                <div className="backend-loading">
                    <div className="loading-spinner"></div>
                    <p>Waking up the backend server...</p>
                    <p className="loading-subtext">This may take a few seconds</p>
                </div>
            )}

            {!kbId && !isCheckingBackend && <CrawlForm onCrawlSuccess={setKbId} />}

            {kbId && <ChatBox kb_id={kbId} />}
        </div>
    );
}

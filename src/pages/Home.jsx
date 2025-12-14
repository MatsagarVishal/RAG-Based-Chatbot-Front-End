import { useState, useEffect } from "react";
import CrawlForm from "../component/CrawlForm";
import ChatBox from "../component/ChatBox";
import { checkHealth } from "../api/ragAPi";
import "./Home.css";

export default function Home() {
    const [kbId, setKbId] = useState(null);
    const [backendReady, setBackendReady] = useState(false);

    useEffect(() => {
        // Wake up the backend on mount
        const wakeBackend = async () => {
            const isReady = await checkHealth();
            setBackendReady(isReady);
        };
        wakeBackend();
    }, []);

    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="home-title">Sherpa</h1>
                <p className="home-subtitle">Your website, now with a PhD in small talk.</p>
            </div>

            {!kbId && <CrawlForm onCrawlSuccess={setKbId} />}

            {kbId && <ChatBox kb_id={kbId} />}
        </div>
    );
}

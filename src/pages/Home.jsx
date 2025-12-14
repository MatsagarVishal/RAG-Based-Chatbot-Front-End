import { useState } from "react";
import CrawlForm from "../component/CrawlForm";
import ChatBox from "../component/ChatBox";
import "./Home.css";

export default function Home() {
    const [kbId, setKbId] = useState(null);

    return (
        <div className="home-container">
            {!kbId && <div className="home-header">
                <h1 className="home-title">Whisperer</h1>
                <p className="home-subtitle">Understands what your site says</p>
            </div>}

            {!kbId && <CrawlForm onCrawlSuccess={setKbId} />}

            {kbId && <ChatBox kb_id={kbId} />}
        </div>
    );
}

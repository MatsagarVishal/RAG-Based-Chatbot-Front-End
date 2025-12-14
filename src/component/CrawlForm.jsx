import { useState } from "react";
import { crawlWebsite, updateKnowledgeBase } from "../api/ragAPi";
import "./CrawlForm.css";
import CrawlLoader from "./CrawlLoader";
import KBExistsModal from "./KBExistsModal";

export default function CrawlForm({ onCrawlSuccess }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showExistsModal, setShowExistsModal] = useState(false);
    const [existingKbData, setExistingKbData] = useState(null);
    const [isForceUpdating, setIsForceUpdating] = useState(false);

    const isValidUrl = (value) => {
        if (!value) return false;
        try {
            const u = new URL(value.startsWith('http') ? value : `https://${value}`);
            return u.protocol === 'http:' || u.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const handleCrawl = async () => {
        setError("");

        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }

        const target = url.startsWith("http") ? url : `https://${url}`;

        if (!isValidUrl(target)) {
            setError("Invalid URL format. Please enter a valid website URL.");
            return;
        }

        setLoading(true);

        try {
            console.log("Starting crawl for:", target);
            const data = await crawlWebsite(target);

            if (!data || !data.kb_id) {
                setError("Invalid response from server. Please try again.");
                setLoading(false);
                return;
            }

            // Handle existing knowledge base response
            if (data.status === 'exists') {
                console.log("Knowledge base already exists, showing modal:", data.kb_id);
                setExistingKbData(data);
                setShowExistsModal(true);
                setLoading(false);
                return;
            }

            // New knowledge base created
            console.log("New knowledge base created:", data.kb_id);
            onCrawlSuccess(data.kb_id);
        } catch (err) {
            console.error("Crawl error:", err);

            let errorMsg = "Failed to crawl the website. ";

            if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
                errorMsg += "Please check your internet connection or the URL.";
            } else if (err.response?.status === 404) {
                errorMsg += "Website not found. Please check the URL.";
            } else if (err.response?.status === 403) {
                errorMsg += "Access denied. The website may not allow crawling.";
            } else if (err.response?.status === 500) {
                errorMsg += "Server error. Please try again later.";
            } else if (err.code === 'ECONNREFUSED') {
                errorMsg += "Could not connect to the server. Please try again.";
            } else if (err.message?.includes('timeout')) {
                errorMsg += "Request timed out. Please try again.";
            } else {
                errorMsg += err.message || "Unknown error occurred.";
            }

            setError(errorMsg);
            setLoading(false);
        }
    };

    const handleUseExisting = () => {
        console.log("Using existing knowledge base:", existingKbData.kb_id);
        setShowExistsModal(false);
        setExistingKbData(null);
        onCrawlSuccess(existingKbData.kb_id);
    };

    const handleUpdateKB = async () => {
        console.log("Updating knowledge base for:", url);
        setShowExistsModal(false);
        setIsForceUpdating(true);
        setLoading(true);

        try {
            const target = url.startsWith("http") ? url : `https://${url}`;
            const data = await updateKnowledgeBase(target);

            if (!data || !data.kb_id) {
                setError("Invalid response from server. Please try again.");
                setLoading(false);
                setIsForceUpdating(false);
                return;
            }

            // Check for failure status in response
            if (data.status === 'failed') {
                const failureMsg = data.reason || "Failed to extract meaningful content from the website.";
                setError(`Update failed: ${failureMsg}`);
                setLoading(false);
                setIsForceUpdating(false);
                setExistingKbData(null);
                return;
            }

            console.log("Knowledge base updated successfully:", data.kb_id);
            console.log(`Pages crawled: ${data.pages_crawled}, Chunks created: ${data.chunks_created}`);
            onCrawlSuccess(data.kb_id);
        } catch (err) {
            console.error("Update KB error:", err);
            let errorMsg = "Failed to update knowledge base. ";

            if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
                errorMsg += "Please check your internet connection.";
            } else if (err.response?.status === 404) {
                errorMsg += "Website not found. Please check the URL.";
            } else if (err.response?.status === 403) {
                errorMsg += "Access denied. The website may not allow crawling.";
            } else if (err.response?.status === 500) {
                errorMsg += "Server error. Please try again later.";
            } else {
                errorMsg += err.message || "Unknown error occurred.";
            }

            setError(errorMsg);
            setLoading(false);
            setIsForceUpdating(false);
            setExistingKbData(null);
        }
    };

    return (
        <div className="crawl-form-wrapper">
            {loading && !showExistsModal ? (
                <CrawlLoader url={url} isUpdating={isForceUpdating} />
            ) : (
                <div className="crawl-form-card">
                    <div className="crawl-form-header">
                        <h2>🧠 Feed the Sherpa</h2>
                        <p>Drop a link. I'll do the reading.</p>
                    </div>
                    <div className="crawl-form-inputs">
                        <input
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                                setError("");
                            }}
                            onKeyDown={(e) => e.key === "Enter" && !loading && handleCrawl()}
                            className="crawl-form-input"
                            disabled={loading}
                        />
                        {url && !isValidUrl(url) && (
                            <div className="crawl-form-error">
                                ⚠️ Invalid URL format. Use https://example.com
                            </div>
                        )}
                        {error && (
                            <div className="crawl-form-error">
                                ❌ {error}
                            </div>
                        )}
                        <button
                            onClick={handleCrawl}
                            disabled={loading || !url || !isValidUrl(url)}
                            className="crawl-form-button"
                        >
                            {loading ? "🧗 Climbing..." : "✨ Begin Expedition"}
                        </button>
                    </div>
                </div>
            )}

            {showExistsModal && existingKbData && (
                <KBExistsModal
                    url={url}
                    onUseExisting={handleUseExisting}
                    onUpdateKB={handleUpdateKB}
                    isLoading={isForceUpdating}
                />
            )}
        </div>
    );
}

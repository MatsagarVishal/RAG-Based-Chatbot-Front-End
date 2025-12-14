import "./KBExistsModal.css";

export default function KBExistsModal({ url, onUseExisting, onUpdateKB, isLoading }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>📦 Knowledge Base Already Exists</h2>
                    <p>We found a cached version of this website.</p>
                </div>

                <div className="modal-body">
                    <div className="info-box">
                        <p>
                            <strong>URL:</strong> <code>{url}</code>
                        </p>
                        <p className="cached-msg">
                            ✓ Using previously crawled data (cached)
                        </p>
                    </div>

                    <div className="options">
                        <p className="option-label">What would you like to do?</p>

                        <button
                            className="modal-btn use-existing"
                            onClick={onUseExisting}
                            disabled={isLoading}
                        >
                            <span className="icon">✓</span>
                            <div>
                                <strong>Use Existing</strong>
                                <span className="desc">Chat with cached data (faster)</span>
                            </div>
                        </button>

                        <button
                            className="modal-btn update-kb"
                            onClick={onUpdateKB}
                            disabled={isLoading}
                        >
                            <span className="icon">🔄</span>
                            <div>
                                <strong>Update Knowledge Base</strong>
                                <span className="desc">Re-crawl the website for fresh data</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

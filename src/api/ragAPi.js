import axios from "axios";

const API_BASE = "http://localhost:8000";

export const crawlWebsite = async (url) => {
  try {
    console.log("Crawling website:", url);
    const res = await axios.post(`${API_BASE}/api/crawl`, { url });
    console.log("Crawl response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Crawl error:", error.message);
    throw error;
  }
};

export const updateKnowledgeBase = async (url) => {
  try {
    console.log("Updating knowledge base for:", url);
    const res = await axios.post(`${API_BASE}/api/kb/update`, { url });
    console.log("KB update response:", res.data);
    return res.data;
  } catch (error) {
    console.error("KB update error:", error.message);
    throw error;
  }
};

export const askQuestion = async (kb_id, question) => {
  try {
    console.log("Asking question:", { kb_id, question });
    const res = await axios.post(`${API_BASE}/api/chat`, {
      kb_id,
      question,
    });
    console.log("Chat response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Chat error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
};

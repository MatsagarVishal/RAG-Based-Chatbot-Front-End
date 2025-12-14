# Sherpa - RAG Chatbot Frontend

Your website, now with a PhD in small talk.

## Overview

Sherpa is a modern, React-based frontend for a RAG (Retrieval-Augmented Generation) chatbot. It allows users to crawl websites, build knowledge bases, and interact with an AI assistant that understands the content of those websites.

## Features

- 🧠 **Smart Website Crawling** - Feed any website URL to build a knowledge base
- 💬 **Interactive Chat** - Ask questions about the crawled content
- 🔄 **Backend Wake-up** - Automatic health check to wake up sleeping Render backends
- ✨ **Beautiful UI** - Modern, responsive design with smooth animations
- ✅ **Strict URL Validation** - Ensures only valid URLs are processed
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MatsagarVishal/RAG-Based-Chatbot-Front-End.git
cd RAG-Based-Chatbot-Front-End
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/          # API integration layer
├── component/    # Reusable React components
├── pages/        # Page components
├── assets/       # Static assets
└── index.css     # Global styles
```

## Features in Detail

### URL Validation
The app includes strict URL validation that:
- Requires valid TLDs (e.g., `.com`, `.org`)
- Accepts localhost for development
- Rejects invalid characters (spaces, quotes, etc.)

### Backend Health Check
Automatically pings the backend `/health` endpoint on app load to wake up sleeping Render instances, ensuring a smooth user experience.

### Responsive Design
The UI adapts seamlessly to different screen sizes with:
- Fixed layouts to prevent shifting
- Consistent spacing and alignment
- Mobile-optimized components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

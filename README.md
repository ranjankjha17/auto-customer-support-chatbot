# Auto Customer Support Chatbot 🤖💬

A modern customer support chatbot with AI-powered responses, query storage, and automated alert workflows.

![Chatbot Demo](demo.gif) <!-- Add a demo gif/image later -->

## Features ✨

- **AI-Powered Responses**: Uses OpenAI's GPT models for intelligent, context-aware responses
- **Real-time Streaming**: Messages stream to the client for a natural chat experience
- **Query Storage**: All customer queries are stored for analytics and improvement
- **Urgent Query Detection**: Automatically detects and flags urgent customer requests
- **n8n Automation**: Triggers workflows for alerts, follow-ups, and more
- **Modern UI**: Clean, responsive chat interface built with Next.js

## Tech Stack 🛠️

**Frontend**:
- Next.js 15.3 (App Router)
- TypeScript
- Tailwind CSS

**Backend**:
- Node.js
- Express
- OpenAI API / LangChain
- MongoDB (for query storage)

**Automation**:
- n8n workflow automation

## Getting Started 🚀

### Prerequisites

- Node.js v18+
- MongoDB
- OpenAI API key
- n8n (optional for automation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ranjankjha17/auto-customer-support-chatbot.git
   cd auto-customer-support-chatbot
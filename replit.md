# AI Assistant - Replit Extension

## Overview
This is a Replit Extension that provides an AI chat assistant powered by Google Gemini. It allows users to have conversations with an AI directly within their Replit workspace.

## Purpose
- Provide free AI assistance using Google's Gemini API
- Chat interface integrated into Replit as a custom tool/extension
- No charges required - uses the free tier of Gemini API (1,500 requests/day)

## Current State
- **Status**: Fully functional ✓
- **AI Provider**: Google Gemini (gemini-2.5-flash model)
- **Extension Type**: Replit Tool Extension
- **Workflow**: Running on Extension Dev Server

## Recent Changes (October 27, 2025)
- Added Google Gemini integration for free AI chat
- Created chat service with proper message history handling
- Built React-based chat UI with message history, input field, and loading states
- Configured Replit extension with proper extension.json metadata
- Fixed critical bug: Changed `response.text()` to `response.text` (getter, not method)
- Moved lib/ directory out of src/ to avoid replkit configuration issues
- Set up Extension Dev Server workflow

## Project Architecture

### Directory Structure
```
/
├── lib/
│   └── gemini.ts          # Gemini API client and message handling
├── src/
│   └── tool/
│       ├── index.html     # Extension tool entry point
│       └── main.tsx       # React chat component
├── public/
│   └── replit.svg         # Extension icon
├── extension.json         # Extension manifest
└── .replit               # Replit configuration
```

### Key Components

**1. Gemini API Service (`lib/gemini.ts`)**
- Initializes GoogleGenAI client with GEMINI_API_KEY environment variable
- `sendMessage()` function handles chat conversations with history
- Converts message format between UI (user/assistant) and Gemini API (user/model)
- Uses gemini-2.5-flash model for fast, free responses

**2. Chat UI (`src/tool/main.tsx`)**
- React component with state management for messages, input, and loading
- Auto-scrolls to bottom as new messages arrive
- Shows "Thinking..." indicator while waiting for AI response
- Clean dark theme with blue user messages and gray assistant messages
- Enter key to send, button disabled when loading or empty

**3. Extension Configuration (`extension.json`)**
- Extension name: "AI Assistant"
- Tool name: "AI Chat"
- Handler: `/tool` (maps to src/tool/)

### Dependencies
- `@google/genai`: Google Gemini AI SDK
- `@replit/extensions`: Replit extension framework
- `@replit/extensions-react`: React hooks for Replit extensions
- `react` & `react-dom`: UI framework
- `@replit/replkit`: Build and dev server for extensions

## Environment Variables
- `GEMINI_API_KEY`: Google Gemini API key (required, stored in Replit Secrets)

## How to Use

### For Development
1. The Extension Dev Server workflow is already running
2. Open Extension Devtools in Replit
3. Click "Load Locally" to test the extension
4. The AI Chat tool will appear in your workspace

### For Users
1. Type a message in the input field
2. Press Enter or click Send
3. Wait for the AI to respond
4. Continue the conversation with full message history

## Technical Notes
- **replkit**: Uses replkit dev server on port 8080
- **Extension structure**: All directories under `src/` must be tool handlers (with index.html)
- **Library code**: Stored in `lib/` (outside src/) to avoid replkit errors
- **API Response**: Gemini's `response.text` is a getter property, not a method
- **Free tier**: 60 requests/min, 1,500 requests/day with Gemini 2.5 Flash
- **No credit card required**: Completely free to use

## User Preferences
- Prefers free solutions without any charges
- Uses Google Gemini instead of OpenAI for zero-cost AI access

## Future Improvements (Optional)
- Add conversation export/save functionality
- Implement conversation reset button
- Add support for code syntax highlighting in responses
- Show token usage or request count
- Add settings to switch between Gemini models

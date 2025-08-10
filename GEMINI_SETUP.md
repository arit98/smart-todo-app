# Gemini Integration Setup Guide

## Overview
Your todo app has been configured to use Google's Gemini AI instead of OpenAI. Here's what you need to do to complete the setup.

## 1. Get Google API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click on "Get API key" in the top right
4. Create a new API key or use an existing one
5. Copy the API key

## 2. Set Environment Variables
Create a `.env.local` file in your project root with:

```bash
# Google Gemini API Key
GOOGLE_API_KEY=your_actual_google_api_key_here
NEXT_PUBLIC_GOOGLE_API_KEY=your_actual_google_api_key_here
```

**Important**: Replace `your_actual_google_api_key_here` with your real API key from step 1.

## 3. What's Already Configured
✅ **API Route**: Created `/app/api/chat/route.ts` for Gemini integration
✅ **Dependencies**: Installed `@google/generative-ai` package
✅ **Layout**: Updated to use `NEXT_PUBLIC_GOOGLE_API_KEY`
✅ **TodoApp**: Already uses `useCopilotAction` which will work with Gemini

## 4. How It Works
- **Frontend**: CopilotKit components use the `NEXT_PUBLIC_GOOGLE_API_KEY`
- **Backend**: The `/api/chat` route processes requests using Gemini
- **Model**: Uses `gemini-1.5-flash` for fast and efficient responses
- **Integration**: Your existing `useCopilotAction` in TodoApp will automatically use Gemini

## 5. Test the Integration
1. Start your development server: `npm run dev`
2. Open your todo app
3. Try using the AI features (they should now use Gemini)
4. Check the browser console and terminal for any errors

## 6. Troubleshooting
- **API Key Error**: Make sure your `.env.local` file exists and has the correct API key
- **CORS Issues**: The API route is configured for same-origin requests
- **Model Errors**: If you get model errors, try changing `gemini-1.5-flash` to `gemini-1.5-pro` in the API route

## 7. Available Gemini Models
- `gemini-1.5-flash` (fast, efficient - currently configured)
- `gemini-1.5-pro` (more capable, slightly slower)
- `gemini-1.0-pro` (legacy model)

## 8. Security Notes
- Never commit your `.env.local` file to version control
- The `GOOGLE_API_KEY` is used server-side only
- The `NEXT_PUBLIC_GOOGLE_API_KEY` is exposed to the client (required for CopilotKit)

## 9. Next Steps
After setting up your API key:
1. Test the AI features in your todo app
2. Customize the Gemini model if needed
3. Add more AI-powered features using `useCopilotAction`

Your todo app is now ready to use Gemini AI! 🚀

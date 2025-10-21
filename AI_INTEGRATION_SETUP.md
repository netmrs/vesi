# AI Integration Setup Guide for Vesi

## Overview
Vesi now includes powerful AI integration to provide personalized spiritual guidance, goal suggestions, and insights. The AI acts as your spiritual mentor, offering wisdom and encouragement based on your journal entries, goals, and spiritual journey.

## Features

### 1. AI Spiritual Chat
- **Personal spiritual mentor** that provides guidance and encouragement
- **Context-aware responses** based on your journal entries and goals
- **Scripture recommendations** tailored to your current situation
- **Gentle, faith-centered guidance** that aligns with your spiritual growth

### 2. AI Goal Suggestions
- **Intelligent goal recommendations** based on your input and faith tradition
- **Personalized suggestions** that consider your existing goals
- **Spiritual and practical goals** that promote growth
- **Scripture references** for each suggested goal

### 3. AI Goal Writing Assistant
- **Automated goal creation** with detailed descriptions and action items
- **Faith-based content** that aligns with your spiritual journey
- **Scripture integration** for motivation and guidance
- **Actionable steps** for achieving your goals

### 4. Journal Analysis & Insights
- **Pattern recognition** in your journal entries
- **Spiritual theme analysis** to identify growth areas
- **Encouragement and insights** based on your writing
- **Scripture study suggestions** related to your experiences

## Setup Instructions

### Step 1: Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the API key (starts with `sk-`)

### Step 2: Configure Environment Variables
1. Create a `.env` file in your project root
2. Add your API key:
```env
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

### Step 3: Install Dependencies (if needed)
The AI integration uses the existing dependencies. No additional packages are required.

### Step 4: Test the Integration
1. Start your development server: `npm start`
2. Navigate to the AI Insights page
3. Try the AI Chat feature
4. Test goal suggestions by typing what you want to improve

## Usage Examples

### AI Chat
```
You: "I'm struggling with patience lately"
AI: "I understand that patience can be challenging, especially when life feels overwhelming. Consider this encouragement from James 1:3-4: 'For you know that the testing of your faith produces steadfastness. And let steadfastness have its full effect, that you may be perfect and complete, lacking in nothing.' 

Your struggle with patience is actually an opportunity for spiritual growth. What specific situations are testing your patience? I'd love to help you develop practical strategies for cultivating this beautiful fruit of the Spirit."
```

### Goal Suggestions
```
Input: "I want to be more disciplined"
AI Suggestions:
1. Daily Morning Prayer (15 minutes of focused prayer each morning)
2. Scripture Study Routine (Read one chapter daily with reflection)
3. Physical Discipline (Regular exercise as stewardship of your body)
```

### Journal Analysis
```
AI Insights: "I notice beautiful themes of gratitude and growth in your recent entries. Your heart for service and spiritual development is evident. Consider exploring Philippians 4:6-7 for deeper peace, and perhaps setting a goal around consistent prayer journaling to capture these insights more regularly."
```

## AI Personality & Approach

The AI is designed to be:
- **Compassionate and understanding** - Never judgmental or harsh
- **Faith-centered** - Grounded in biblical wisdom and principles
- **Encouraging** - Focuses on growth and positive transformation
- **Practical** - Offers actionable advice and suggestions
- **Personal** - Tailored to your specific journey and needs

## Fallback Behavior

If the OpenAI API is unavailable or not configured:
- The app will use intelligent mock responses
- All features remain functional
- Users can still benefit from the spiritual guidance framework
- No errors or broken functionality

## Customization Options

You can customize the AI behavior by modifying `src/lib/aiService.js`:

### Change AI Model
```javascript
this.model = 'gpt-3.5-turbo'; // For faster, cheaper responses
```

### Adjust Response Style
Modify the system prompts in the service to change the AI's personality or approach.

### Add Custom Context
Enhance the context passed to the AI to include more user data or preferences.

## Privacy & Security

- API keys are stored locally in environment variables
- No user data is sent to OpenAI beyond what's necessary for responses
- Journal entries and goals are only used to provide context, not stored externally
- All communications are encrypted via HTTPS

## Troubleshooting

### Common Issues

1. **"AI Chat not responding"**
   - Check your API key is correctly set in `.env`
   - Verify your OpenAI account has sufficient credits
   - Check browser console for error messages

2. **"Generic responses"**
   - Ensure you're providing context in your messages
   - Try being more specific about your spiritual needs
   - Check that your journal entries and goals are being passed correctly

3. **"API errors"**
   - Verify your API key is valid and active
   - Check your OpenAI account status and billing
   - Ensure you have access to the GPT-4 model (or change to GPT-3.5-turbo)

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your `.env` file is in the project root
3. Ensure your API key is valid and has sufficient credits
4. Try restarting the development server after adding the API key

## Cost Considerations

- GPT-4 is more expensive but provides higher quality responses
- Consider using GPT-3.5-turbo for development and testing
- Monitor your OpenAI usage dashboard for costs
- The app includes intelligent caching to minimize API calls

## Future Enhancements

Planned improvements include:
- Voice interaction capabilities
- Multi-language support
- Custom AI personality training
- Integration with more AI providers
- Advanced spiritual growth analytics
- Personalized scripture study plans

---

*The AI integration is designed to enhance your spiritual journey while maintaining the core values and mission of Vesi - helping you become who God created you to be.*


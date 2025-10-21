// AI Service for Vesi - Spiritual Mentor Integration
class AIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1';
    this.model = 'gpt-4';
    
    // Fallback to mock responses if no API key
    this.useMock = !this.apiKey;
  }

  async makeRequest(endpoint, data) {
    if (this.useMock) {
      return this.getMockResponse(endpoint, data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          ...data,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback to mock response
      return this.getMockResponse(endpoint, data);
    }
  }

  // Spiritual Chat - Your AI Spiritual Mentor
  async getSpiritualChat(message, context = {}) {
    const systemPrompt = `You are Vesi's AI Wellness Companion, a wise and compassionate guide who helps people become their best selves through holistic wellness.

Your role:
- Provide personalized guidance for physical, mental, and spiritual wellness
- Offer practical tips for self-improvement and personal growth
- Help users reflect on their wellness journey and set meaningful goals
- Suggest evidence-based strategies for fitness, mindfulness, relationships, and personal development
- Be supportive, non-judgmental, and encouraging
- Include spiritual guidance when appropriate, but focus on comprehensive wellness

User context: ${JSON.stringify(context)}

Respond in a warm, conversational tone as a wellness companion. Keep responses concise but meaningful, covering mind, body, and spirit.`;

    const response = await this.makeRequest('/chat/completions', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ]
    });

    return response.choices?.[0]?.message?.content || 'I\'m here to support your spiritual journey. How can I help you grow today?';
  }

  // Goal Suggestions based on user input
  async getGoalSuggestions(userInput, userFaith, existingGoals = []) {
    const systemPrompt = `You are helping create comprehensive wellness and personal growth goals for someone interested in self-improvement.

User said: "${userInput}"
Existing goals: ${existingGoals.map(g => g.title).join(', ')}

Generate 3 specific, actionable goals that:
1. Cover different aspects of wellness (physical, mental, spiritual, social)
2. Are practical and achievable
3. Promote holistic personal growth
4. Don't duplicate existing goals
5. Include spiritual elements when appropriate but focus on overall wellness

Format as JSON array with: title, description, category, suggestedFrequency, wellnessType`;

    const response = await this.makeRequest('/chat/completions', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate goal suggestions based on my input.' }
      ]
    });

    try {
      return JSON.parse(response.choices?.[0]?.message?.content || '[]');
    } catch {
      return this.getMockGoalSuggestions(userInput, userFaith);
    }
  }

  // AI Goal Writing Assistant
  async generateGoalContent(goalType, area, userFaith) {
    const systemPrompt = `You are an AI wellness assistant helping someone write a detailed goal for ${area} improvement.

Wellness focus: ${userFaith}
Goal type: ${goalType}

Generate:
1. A clear, inspiring goal title
2. Detailed description with specific actions
3. Suggested frequency (daily, weekly, etc.)
4. Relevant wellness insights or inspiration
5. 3-5 action items for improvement
6. Include spiritual elements when appropriate

Format as JSON with: title, description, frequency, inspiration, actionItems`;

    const response = await this.makeRequest('/chat/completions', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Help me create a goal for ${goalType} in ${area}.` }
      ]
    });

    try {
      return JSON.parse(response.choices?.[0]?.message?.content || '{}');
    } catch {
      return this.getMockGoalContent(goalType, area, userFaith);
    }
  }

  // Journal Analysis and Insights
  async analyzeJournalEntries(entries, userFaith) {
    const recentEntries = entries.slice(-10).map(entry => entry.content).join('\n\n');
    
    const systemPrompt = `Analyze these journal entries from someone with ${userFaith} faith:

${recentEntries}

Provide insights on:
1. Spiritual themes and patterns
2. Areas of growth and strength
3. Suggested scripture studies
4. Encouragement and next steps

Keep it uplifting and faith-centered.`;

    const response = await this.makeRequest('/chat/completions', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Analyze my journal entries and provide spiritual insights.' }
      ]
    });

    return response.choices?.[0]?.message?.content || 'Your journal shows beautiful spiritual growth. Keep seeking and you will find.';
  }

  // Scripture Recommendations
  async getScriptureRecommendations(context, userFaith) {
    const systemPrompt = `Recommend relevant scriptures for someone with ${userFaith} faith who is dealing with:

${context}

Provide 3-5 specific scripture references with brief explanations of why they're relevant.`;

    const response = await this.makeRequest('/chat/completions', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Recommend scriptures for my current situation.' }
      ]
    });

    return response.choices?.[0]?.message?.content || 'Here are some scriptures that may help guide you through this time.';
  }

  // Mock responses for when API key is not available
  getMockResponse(endpoint, data) {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        if (endpoint.includes('chat/completions')) {
          resolve({
            choices: [{
              message: {
                content: this.getMockSpiritualResponse()
              }
            }]
          });
        }
      }, 500);
    });
  }

  getMockSpiritualResponse() {
    const responses = [
      "I sense you're seeking deeper spiritual connection. Consider spending time in prayer and reflection today.",
      "Your spiritual journey is unique and beautiful. Trust in the process and be patient with yourself.",
      "Sometimes the greatest growth comes through challenges. What scripture brings you comfort during difficult times?",
      "I notice themes of gratitude and hope in your recent entries. These are beautiful spiritual fruits.",
      "Consider setting aside dedicated time each day for scripture study and prayer. Small, consistent steps lead to great spiritual growth."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getMockGoalSuggestions(input, faith) {
    return [
      {
        title: "Daily Prayer Practice",
        description: "Establish a consistent daily prayer routine to deepen your spiritual connection",
        category: "Spiritual Growth",
        suggestedFrequency: "Daily",
        scriptureReference: "1 Thessalonians 5:17 - 'Pray without ceasing'"
      },
      {
        title: "Scripture Study",
        description: "Read and reflect on scripture for 15 minutes each day",
        category: "Spiritual Growth", 
        suggestedFrequency: "Daily",
        scriptureReference: "2 Timothy 3:16-17"
      },
      {
        title: "Acts of Service",
        description: "Perform one intentional act of service or kindness each week",
        category: "Service",
        suggestedFrequency: "Weekly",
        scriptureReference: "Matthew 25:40"
      }
    ];
  }

  getMockGoalContent(type, area, faith) {
    return {
      title: `Improve ${area} through ${type}`,
      description: `Focus on developing ${area} through consistent ${type.toLowerCase()} practice. This goal will help you grow spiritually and personally.`,
      frequency: "Daily",
      scripture: "Philippians 4:13 - 'I can do all things through Christ who strengthens me.'",
      actionItems: [
        `Set aside 10 minutes daily for ${type.toLowerCase()}`,
        `Track your progress and reflect on improvements`,
        `Seek guidance through prayer and scripture`,
        `Share your journey with a trusted friend or mentor`,
        `Celebrate small victories along the way`
      ]
    };
  }
}

export default new AIService();

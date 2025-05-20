import OpenAI from 'openai';
import config from '../config';

const openai = new OpenAI({
  apiKey: config.openai.apiKey
});

export default {
  async generateResponse(prompt: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: "You are a helpful customer support assistant. Provide concise, accurate answers." 
          },
          { role: "user", content: prompt }
        ],
        model: config.openai.model,
      });

      return completion.choices[0]?.message?.content || "I couldn't generate a response.";
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
};
import { aiConfig } from '../config/ai.js';
import { logger } from '../utils/logger.js';

export async function generateAiCompletion(prompt, systemInstruction = '') {
  if (!aiConfig.isConfigured) {
    logger.info('AI provider running in Demo / Heuristic Mode (no external AI API key provided).');
    return null;
  }

  logger.info(`Invoking configured AI provider: ${aiConfig.provider} (model: ${aiConfig.model})`);

  try {
    if (aiConfig.provider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.model}:generateContent?key=${aiConfig.apiKey}`;
      const payload = {
        contents: [
          {
            parts: [{ text: `${systemInstruction}\n\n${prompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000), // 20s timeout
      });

      if (!response.ok) {
        throw new Error(`Gemini API returned status ${response.status}`);
      }

      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } else if (aiConfig.provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: aiConfig.model || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt },
          ],
          temperature: 0.2,
        }),
        signal: AbortSignal.timeout(20000),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API returned status ${response.status}`);
      }

      const data = await response.json();
      return data?.choices?.[0]?.message?.content || null;
    }
  } catch (error) {
    logger.warn('External AI call failed or timed out, gracefully falling back to deterministic engine:', {
      error: error.message,
    });
    return null;
  }

  return null;
}

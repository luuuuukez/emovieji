const GEMINI_API_KEY = 'AIzaSyAqG9W6KHSRQ8OdO6kXeTqyd8d6rmZDFJU';
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';


export const generateEmojis = async (movieTitle, movieDescription = '') => {
  try {
    const prompt = `Convert the following movie descriptions into emoji sequences that represent only key elements.
                    Example(YOUR RESPONSE should be only emoji):
                    - Movie: Titanic -> 🚢❤️💔
                    - Movie: Jurassic Park -> 🦖🏝️😱
                    - Movie: The Lion King -> 🦁👑🌅
                    Movie: ${movieTitle}
                    Description: ${movieDescription}`;

    console.log('Sending request with prompt:', prompt);

    const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          topK: 20,
          maxOutputTokens: 10,
        },
      }),
    });

    if (!response.ok) {
      console.error('API request failed with status:', response.status);
      throw new Error('Failed to generate emojis');
    }

    const data = await response.json();
    console.log('API response data:', data);

    const emojiResult = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (emojiResult) {
      return emojiResult;
    }

    throw new Error('No emoji sequence generated');
  } catch (error) {
    console.error('Error in generateEmojis:', error.message);
    throw new Error(error.message || 'Failed to generate emojis');
  }
};
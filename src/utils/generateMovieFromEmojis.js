const GEMINI_API_KEY = 'AIzaSyAqG9W6KHSRQ8OdO6kXeTqyd8d6rmZDFJU';
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const generateMovieFromEmojis = async (emojiSequence) => {
    const prompt = `Given the following emoji sequence, suggest the most likely movie title. Only output the movie title, without any additional words or punctuation.
  - Emoji sequence: ${emojiSequence}`;

    try {
        const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
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
            throw new Error('Failed to generate movie title');
        }

        const data = await response.json();
        console.log('API response data:', data);

        const movieTitle = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        return movieTitle || 'Unknown movie';
    } catch (error) {
        console.error('Error in generateMovieFromEmojis:', error.message);
        throw new Error(error.message || 'Failed to generate movie title');
    }
};

import { searchMovie } from './api';
import { generateMovieFromEmojis } from './generateMovieFromEmojis';

export const findMovieByEmojis = async (emojiSequence) => {
    try {

        const movieTitle = await generateMovieFromEmojis(emojiSequence);
        if (movieTitle) {
            const movie = await searchMovie(movieTitle);

            if (movie) {
                return movie.Title;
            }
        }

        return 'No movie found for this emoji sequence';
    } catch (error) {
        console.error('Error in findMovieByEmojis:', error.message);
        return 'Error occurred while finding movie';
    }
};
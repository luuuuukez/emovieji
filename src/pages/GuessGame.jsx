import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { GamepadIcon } from 'lucide-react';
import { emojiMovieMappings } from '../utils/emojiMovieMappings';

export default function GuessGame() {
  const [currentEmojis, setCurrentEmojis] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNewGame();
  }, []);

  const loadNewGame = async () => {
    setLoading(true);
    setError('');
    setFeedback('');

    try {
      const randomMovie = getRandomMovie();
      const { movie, emojis } = randomMovie;

      const incorrectOptions = getIncorrectOptions(movie);
      setOptions([movie, ...incorrectOptions].sort(() => 0.5 - Math.random()));
      setCurrentEmojis(emojis);
      setCorrectAnswer(movie);
    } catch (err) {
      setError('Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  const getRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * emojiMovieMappings.length);
    return emojiMovieMappings[randomIndex];
  };

  const getIncorrectOptions = (correctTitle) => {
    return emojiMovieMappings
        .filter(({ movie }) => movie !== correctTitle)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(({ movie }) => movie);
  };

  const handleGuess = (guess) => {
    if (guess === correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! 🎉');
    } else {
      setFeedback('Try again! 🤔');
    }
    setTimeout(loadNewGame, 1500);
  };

  return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-md shadow-xl">
          <CardHeader className="flex gap-3">
            <GamepadIcon className="w-8 h-8 text-purple-600" />
            <div className="flex flex-col">
              <p className="text-xl font-bold">Guess the Movie</p>
              <p className="text-small text-default-500">Can you guess the movie from these emojis?</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-6">
              <div className="text-4xl text-center p-6 bg-purple-50 rounded-lg">
                {loading ? 'Loading...' : error ? <p className="text-red-600">{error}</p> : currentEmojis}
              </div>
              {options.map((option, index) => (
                  <Button key={index} className="w-2/3 mx-auto" color="secondary" onClick={() => handleGuess(option)}>
                    {option}
                  </Button>
              ))}
              {feedback && (
                  <div className={`mt-2 text-center font-medium ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-500'}`}>
                    {feedback}
                  </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
  );
}
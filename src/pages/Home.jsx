import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Button } from '@nextui-org/react';
import { Search, Sparkles } from 'lucide-react';
import { searchMovie } from '../utils/api';
import { generateEmojis } from '../utils/geminiApi';


export default function Home() {
  const [movieTitle, setMovieTitle] = useState('');
  const [emojis, setEmojis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!movieTitle.trim()) {
      setError('Please enter a movie title');
      return;
    }
    
    setLoading(true);
    setError('');
    setEmojis('');
    
    try {
      const movieData = await searchMovie(movieTitle);
      const emojiSequence = await generateEmojis(movieData.Title, movieData.Plot);
      setEmojis(emojiSequence);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleConvert();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex gap-4">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <div className="flex flex-col">
            <p className="text-xl font-bold">Movie 👉 Emojis</p>
            <p className="text-small text-default-500">Convert your favorite movies into emoji sequences!</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-6">
            <Input
              label="Movie Title"
              placeholder="Enter a movie title..."
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              startContent={<Search className="w-4 h-4 text-default-400" />}
              isDisabled={loading}

            />
            <Button
              color="secondary"
              onClick={handleConvert}
              isLoading={loading}
              isDisabled={!movieTitle.trim()}
            >
              Generate Emojis
            </Button>
            {error && (
              <div className="mt-2 p-3 bg-red-50 text-red-600 rounded-lg text-center">
                {error}
              </div>
            )}
            {emojis && !error && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <p className="text-2xl text-center">{emojis}</p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
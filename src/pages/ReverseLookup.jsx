
import { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Button } from '@nextui-org/react';
import { Search, ArrowLeftRight } from 'lucide-react';
import { findMovieByEmojis } from '../utils/findMovieByEmojis';

export default function ReverseLookup() {
  const [emojiSequence, setEmojiSequence] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [error, setError] = useState('');

  const handleReverseLookup = async () => {
    setError('');
    setMovieTitle('');

    try {
      const movie = await findMovieByEmojis(emojiSequence);
      if (movie === 'No movie found for this emoji sequence') {
        setError(movie);
      } else {
        setMovieTitle(movie);
      }
    } catch (err) {
      setError('An error occurred while finding the movie.');
      console.error(err);
    }
  };

  return (
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-md shadow-xl">
          <CardHeader className="flex gap-4">
            <ArrowLeftRight className="w-8 h-8 text-purple-600" />
            <div className="flex flex-col">
              <p className="text-xl font-bold">Emoji 👉 Movie</p>
              <p className="text-small text-default-500">Find movies from emoji sequences!</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-6">
              <Input
                  label="Emoji Sequence"
                  placeholder="Paste emojis here..."
                  value={emojiSequence}
                  onChange={(e) => setEmojiSequence(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-default-400" />}
              />
              <Button color="secondary" onClick={handleReverseLookup}>
                Find Movie
              </Button>
              {movieTitle && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <p className="text-lg text-center font-medium">{movieTitle}</p>
                  </div>
              )}
              {error && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-600">
                    <p className="text-lg text-center font-medium">{error}</p>
                  </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
  );
}
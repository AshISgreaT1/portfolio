import { useState, useEffect } from 'react';

export default function TypingAnimation({ words, speed = 100, delayBetweenWords = 1500 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && displayedText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          const nextChars = isDeleting
            ? prev.slice(0, -1)
            : currentWord.slice(0, prev.length + 1);
          return nextChars;
        });
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, wordIndex, isDeleting, words, speed, delayBetweenWords]);

  return (
    <span>
      {displayedText}
      <span className="ml-1 inline-block h-8 w-1 bg-cyanGlow/80 animate-pulse" />
    </span>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import './deck.css';
import Card from '../../components/card';
import { getCards, getCategories } from '../../services/deckService';

export default function DeckView() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get('subject');
  const cardRef = useRef(null);

  // Handles card navigation and flip direction signals
  function handleNext(direction) {
    if (direction === 'flip') {
      cardRef.current?.flip();
      return;
    }
    console.log('direction:', direction);
  }

  // Keyboard navigation - listens globally on window
  // Cleaned up on unmount to avoid memory leaks
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') handleNext('done');
      if (e.key === 'ArrowRight') handleNext('active');
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') handleNext('flip');
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetches cards and categories from Supabase on mount
  useEffect(() => {
    async function fetchData() {
      const [cards, categories] = await Promise.all([
        getCards(),
        getCategories()
      ]);
      setCards(cards);
      setCategories(categories);
    }
    fetchData();
  }, []);

  const categoryCards = cards.filter(c => c.category_id === selectedCategoryId);
  const currentCard = categoryCards[0];
  const currentCategory = categories.find(c => c.id === currentCard?.category_id);

  if (!currentCard) return <p>No card found</p>;

  return (
    <section className="deck-view">
      <div className="deck-done">Done 10</div>
      <div className="deck-active">Active 10</div>
      <div className="card-container">
        <Card
          ref={cardRef}
          question={currentCard.question}
          answer={currentCard.answer}
          icon={currentCategory?.icon}
          color={currentCategory?.color_light}
        />
      </div>
    </section>
  );
}
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
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handles card navigation and flip direction signals
  // TODO: replace setCurrentIndex with Zustand moveCard in sub-issue 2
  function handleNext(direction) {
  if (direction === 'flip') {
    cardRef.current?.flip();
    return;
  }
  setCurrentIndex(i => i + 1);
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

  // Swipe detection - listens for touch events on the deck view
useEffect(() => {
  let touchStartX = 0;
  let touchStartY = 0;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Ignore if movement was too small
    if (absDeltaX < 30 && absDeltaY < 30) return;

   // Accept swipes from horizontal up to ~80 degrees
   // stops only in the last 10 degrees before straight up
   // 0.18 ≈ tan(10°) - the minimum horizontal-to-vertical ratio
    if (absDeltaX > absDeltaY * 0.18) {
      if (deltaX < 0) handleNext('done');
      if (deltaX > 0) handleNext('active');
    }
  }

  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchend', handleTouchEnd);
  return () => {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
  };
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
  const currentCard = categoryCards[currentIndex];
  const currentCategory = categories.find(c => c.id === currentCard?.category_id);

  // No cards loaded - bad connection or empty category
if (!categoryCards.length) return <p>No cards available</p>;

// TODO: replace with completion screen in sub-issue 5
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
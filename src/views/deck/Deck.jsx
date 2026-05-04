import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import './deck.css';
import Card from '../../components/card';
import { getCards, getCategories } from '../../services/deckService';
import useDeckStore from '../../stores/useDeckStore';

export default function DeckView() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get('subject');
  const cardRef = useRef(null);

  const { setCards: setStoreCards, moveCard, getActive, getDone, resetDeck } = useDeckStore();

  // Ref to always have latest cards array available in event handlers
  // Prevents stale closure issues with keyboard and swipe listeners
  const cardsRef = useRef(cards);
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  // Ref to always have latest selectedCategoryId available in event handlers
  const categoryIdRef = useRef(selectedCategoryId);
  useEffect(() => {
    categoryIdRef.current = selectedCategoryId;
  }, [selectedCategoryId]);

  // Handles card navigation and flip direction signals
  // Reads fresh from Zustand store to avoid stale closure issues
  function handleNext(direction) {
    if (direction === 'flip') {
      cardRef.current?.flip();
      return;
    }
    const freshActiveIds = getActive(categoryIdRef.current);
    const currentCard = freshActiveIds
      .map(id => cardsRef.current.find(c => c.id === id))
      .filter(Boolean)[0];
    if (!currentCard) return;
    moveCard(currentCard.id, direction, categoryIdRef.current);
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
  // Initializes Zustand store with fetched cards for current category
  useEffect(() => {
    async function fetchData() {
      const [fetchedCards, fetchedCategories] = await Promise.all([
        getCards(),
        getCategories()
      ]);
      setCards(fetchedCards);
      setCategories(fetchedCategories);
      setStoreCards(
        fetchedCards.filter(c => c.category_id === selectedCategoryId),
        selectedCategoryId
      );
    }
    fetchData();
  }, [selectedCategoryId]);

  // Get current category's cards in active queue order
  const activeIds = getActive(selectedCategoryId);
  const doneIds = getDone(selectedCategoryId);
  const categoryCards = activeIds
    .map(id => cards.find(c => c.id === id))
    .filter(Boolean);

  const currentCard = categoryCards[0];
  const currentCategory = categories.find(c => c.id === currentCard?.category_id);

  // No cards loaded - bad connection or empty category
  if (!cards.length) return <p>No cards available</p>;

  // TODO: replace with completion screen in sub-issue 5
  if (!currentCard) return (
    <div>
      <p>All cards completed!</p>
      <button onClick={() => resetDeck(selectedCategoryId)}>Reset deck</button>
    </div>
  );

  return (
    <section className="deck-view">
      {/* TODO: replace with deck visuals and counters in sub-issue 3 */}
      {/* TODO: add reset button to trigger resetDeck (see useDeckStore) */}
      <div className="deck-done">Done {doneIds.length}</div>
      {/* TODO: replace with deck visuals and counters in sub-issue 3 */}
      <div className="deck-active">Active {activeIds.length}</div>
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
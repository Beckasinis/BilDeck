import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import './deck.css';
import Card from './card/Card';
import CompletionScreen from './completion/CompletionScreen';
import { getCards, getCategories } from '../../services/deckService';
import useDeckStore from '../../stores/useDeckStore';

export default function DeckView() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get('subject');
  const cardRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastReceived, setLastReceived] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const { setCards: setStoreCards, moveCard, getActive, getDone, resetDeck } = useDeckStore();

  const cardsRef = useRef(cards);
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const categoryIdRef = useRef(selectedCategoryId);
  useEffect(() => {
    categoryIdRef.current = selectedCategoryId;
  }, [selectedCategoryId]);

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
    setLastReceived(direction);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setLastReceived(null);
    }, 350);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') handleNext('done');
      if (e.key === 'ArrowRight') handleNext('active');
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') handleNext('flip');
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      if (absDeltaX < 30 && absDeltaY < 30) return;
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

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [fetchedCards, fetchedCategories] = await Promise.all([
          getCards(),
          getCategories()
        ]);
        
        setCards(fetchedCards);
        setCategories(fetchedCategories);

        const categorySpecificCards = fetchedCards.filter(c => c.category_id === selectedCategoryId);
        setStoreCards(categorySpecificCards, selectedCategoryId);

        const currentActive = getActive(selectedCategoryId);
        if (categorySpecificCards.length > 0 && currentActive.length === 0) {
          resetDeck(selectedCategoryId);
        }

      } catch (err) {
        setFetchError('Kunde inte hämta korten. Försök igen senare.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [selectedCategoryId]);

  const activeIds = getActive(selectedCategoryId);
  const doneIds = getDone(selectedCategoryId);
  const categoryCards = activeIds
    .map(id => cards.find(c => c.id === id))
    .filter(Boolean);

  const currentCard = categoryCards[0];
  const currentCategory = categories.find(c => c.id === (currentCard?.category_id || selectedCategoryId));

  if (fetchError) return <p className="error-message">{fetchError}</p>;
  if (isLoading) return <div className="deck-view"><p>Laddar kort...</p></div>;

  if (cards.length > 0 && !cards.some(c => c.category_id === selectedCategoryId)) {
    return <p>Inga kort tillgängliga i den här kategorin.</p>;
  }

  if (!currentCard) return (
    <CompletionScreen
      categories={categories}
      onReset={() => resetDeck(selectedCategoryId)}
      currentCategoryId={selectedCategoryId}
    />
  );

  return (
    <section className="deck-view">
      <div className="deck-done" onClick={() => handleNext('done')}>
        <img
          src="/img/deck-left.png"
          alt="Klar"
          className={`deck-img ${doneIds.length > 0 ? 'active' : 'inactive'} ${lastReceived === 'done' ? 'receiving' : ''}`}
        />
        <div className="deck-info">
          <span>Klar: {doneIds.length}</span>
          {doneIds.length > 0 && (
            <button className="reset-button" onClick={(e) => { e.stopPropagation(); resetDeck(selectedCategoryId); }}>
              🔄 Starta Om
            </button>
          )}
        </div>
      </div>

      <div className="deck-active" onClick={() => handleNext('active')}>
        <div className="deck-info">
          <span>Aktiv: {activeIds.length}</span>
        </div>
        <img
          src="/img/deck-right.png"
          alt="Aktiv"
          className={`deck-img active ${lastReceived === 'active' ? 'receiving' : ''}`}
        />
      </div>

      <div className="card-container">
        {!isTransitioning && (
          <Card
            ref={cardRef}
            question={currentCard.question}
            answer={currentCard.answer}
            info={currentCard.info}
            icon={currentCategory?.icon}
            colorLight={currentCategory?.color_light}
            colorDark={currentCategory?.color_dark}
            displayType={currentCategory?.display_type}
            className="card-fade-in"
          />
        )}
      </div>
    </section>
  );
}
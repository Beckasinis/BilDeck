import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import './deck.css';
import Card from '../../components/card';
import { getCards, getCategories } from '../../services/deckService';

export default function DeckView() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get('subject');

 useEffect(() => {
  async function fetchData() {
    const [cards, categories] = await Promise.all([
      getCards(),
      getCategories()
    ]);
    console.log('cards:', cards);
    console.log('categories:', categories);
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
          question={currentCard.question}
          answer={currentCard.answer}
          icon={currentCategory?.icon}
          color={currentCategory?.color_light}
        />
      </div>
    </section>
  );
}

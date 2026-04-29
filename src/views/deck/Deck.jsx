import { useState, useEffect } from 'react';
import './deck.css';
import Card from '../../components/card';

export default function DeckView() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  //Simulates API call
  useEffect(() => {
  fetch('/testData.json')
    .then(res => res.json())
    .then(data => {
      setCards(data.cards);
      setCategories(data.categories);
    });
}, []);

/*
  When connecting Supabase replace .then with:
  const { data, error } = await supabase
    .from('cards')
    .select('*, categories(*)');
  */

  const currentCard = cards[0];
  const currentCategory = categories.find(c => c.id === currentCard?.categoryId);

  if (!currentCard) return null;

  return (
    <section className="deck-view">
      <div className="deck-done">Done 10</div>
      <div className="deck-active">Active 10</div>
      <div className="card-container">
        <Card
          question={currentCard.question}
          answer={currentCard.answer}
          icon={currentCategory?.icon}
        />
      </div>
    </section>
  );
}

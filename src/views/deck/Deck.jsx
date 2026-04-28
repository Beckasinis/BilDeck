import './deck.css';
import Card from '../../components/card';

export default function DeckView() {
  return (
    <section className="deck-view">
      <div className="deck-done">Done 10</div>
      <div className="deck-active">Active 10</div>
      <div className="card-container">
        <Card 
          label="FRÅGA" 
          icon="?" 
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eaque impedit repudiandae voluptates dolorum tenetur aut labore adipisci quisquam nostrum? Fugiat nihil mollitia quod pariaturis odio optio?" 
        />
      </div>
    </section>
  );
}

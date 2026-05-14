import { useNavigate } from 'react-router';
import './completion.css';
import CategoryIcon from '../../../components/icons/CategoryIcon';
import { toSlug } from '../../../utils/slug';

export default function CompletionScreen({ categories, onReset, currentCategoryId }) {
  const navigate = useNavigate();

  const handleCategorySelect = (cat) => {
    navigate(`/deck/${toSlug(cat.name)}`, { state: { categoryId: cat.id } });
  };

  return (
    <div className="completion-screen">
      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`confetti-piece confetti-${i % 5}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.8 + Math.random() * 0.6}s`,
            }}
          />
        ))}
      </div>

      <h2 className="completion-title">Bra jobbat!</h2>
      <p className="completion-subtitle">Du har gått igenom alla kort!</p>

      <div className="completion-actions">
        <button className="completion-button primary" onClick={onReset}>
          🔄 Starta Om Leken
        </button>

        <div className="completion-categories">
          <p>Välj en annan kategori:</p>
          {categories
            .filter((cat) => cat.id !== currentCategoryId)
            .map((cat) => (
              <button
                key={cat.id}
                className="completion-category-link"
                onClick={() => handleCategorySelect(cat)}
              >
                <CategoryIcon icon={cat.icon} />
                {cat.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

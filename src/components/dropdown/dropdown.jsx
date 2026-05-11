import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useCategoryStore from '../../stores/useCategoryStore';
import './dropdown.css';
import CategoryIcon from '../Icons/CategoryIcon';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { categories, fetchIfNeeded } = useCategoryStore();

  useEffect(() => {
    fetchIfNeeded();
  }, []);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleCategorySelect = (categoryId) => {
    navigate(`/deck?subject=${categoryId}`);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (isOpen && !e.currentTarget.contains(e.target)) setIsOpen(false);
  };

  return (
    <div className="dropdown" onBlur={handleClickOutside} tabIndex={0}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        Flashcards
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className="dropdown-item"
                onClick={() => handleCategorySelect(category.id)}
              >
                <CategoryIcon icon={category.icon} />
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
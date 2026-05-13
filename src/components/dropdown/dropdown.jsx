import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import useCategoryStore from '../../stores/useCategoryStore';
import './dropdown.css';
import CategoryIcon from '../Icons/CategoryIcon';
import Button from '../button';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { categories, fetchIfNeeded } = useCategoryStore();
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchIfNeeded();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleCategorySelect = (categoryId) => {
    navigate(`/deck?subject=${categoryId}`);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <Button variant="secondary" onClick={toggleDropdown}>
        Flashcards
      </Button>

      {isOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-close">
            <button className="dropdown-close__btn" onClick={() => setIsOpen(false)}>✕</button>
          </li>
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

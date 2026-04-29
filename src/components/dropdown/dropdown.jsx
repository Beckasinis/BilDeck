import { useState } from 'react';
import { useNavigate } from 'react-router';
import './dropdown.css';

/**
 * Dropdown Component
 * Displays a dropdown menu with flashcard categories and handles navigation
 */
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Category data
  const categories = [
    { id: 1, name: 'Subject 1' },
    { id: 2, name: 'Subject 2' },
    { id: 3, name: 'Subject 3' },
  ];

  /**
   * Toggles the dropdown open/closed state
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handles category selection and navigation
   * @param {number} categoryId - The ID of the selected category
   */
  const handleCategorySelect = (categoryId) => {
    navigate(`/deck?subject=${categoryId}`);
    setIsOpen(false);
  };

  /**
   * Closes dropdown when clicking outside
   * @param {Event} e - The click event
   */
  const handleClickOutside = (e) => {
    if (isOpen && !e.currentTarget.contains(e.target)) {
      setIsOpen(false);
    }
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
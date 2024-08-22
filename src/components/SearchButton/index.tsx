import React, { useRef, useState } from 'react';
import styles from './SearchButton.module.css';
import { MagniFyingGlassIcon } from '@/utils/icons';

const SearchComponent: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMouseLeave = () => {
    if (inputRef.current && inputRef.current.value === '') {
      inputRef.current.blur();
    }
  };

  // Aqui implementei uma função para manter o max-width do input quando o usuário decidir utilizá-lo. Pra evitar que ele não visualize o que digitou posteriormente.
  const handleInputClick = () => {
    setIsExpanded(true);
  };

  return (
    <div
      className={`${styles.searchContainer} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        ref={inputRef}
        type="text"
        className={styles.searchInput}
        placeholder="Buscar"
        onClick={handleInputClick}
      />
      <MagniFyingGlassIcon className={styles.searchIcon} />
    </div>
  );
};

export default SearchComponent;

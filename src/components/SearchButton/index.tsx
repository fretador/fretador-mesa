import React, { useRef, useState } from 'react';
import styles from './SearchButton.module.css';
import { MagniFyingGlassIcon } from '@/utils/icons';

interface SearchComponentProps {
  onSearch: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log("Buscando motoristas", searchValue);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
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
        onChange={handleInputChange}
        value={searchValue}
        onKeyDown={handleSearchSubmit}
      />
      <MagniFyingGlassIcon className={styles.searchIcon} />
    </div>
  );
};

export default SearchComponent;

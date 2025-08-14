import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={language === 'fr' ? 'Rechercher un produit...' : 'Search for a product...'}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;
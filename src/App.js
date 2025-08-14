import React, { createContext, useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';

// TODO: Exercice 2.1 - Créer le LanguageContext
export const ThemeContext = createContext();
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('theme', false);
  const [searchTerm, setSearchTerm] = useState('');
  // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  const [language, setLanguage] = useLocalStorage('language', 'fr');

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">{language === 'fr' ? 'Catalogue de Produits' : 'Products Catalog'}</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-select w-auto"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </header>
          <main>
            <ProductSearch onSearch={setSearchTerm} />
            <ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
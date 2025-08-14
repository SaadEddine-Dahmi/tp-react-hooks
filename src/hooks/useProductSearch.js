// useProductSearch.js
import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Exercice 4.2 - Modification de l'URL (mais l'API ne supporte pas la pagination)
        const response = await fetch('https://api.daaif.net/products?delay=1000');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        
        // Pagination côté client
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setProducts(data.products.slice(startIndex, endIndex));
        
        setTotalPages(Math.ceil(data.products.length / itemsPerPage));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // Déclencher au changement de page

  // Exercice 4.1 - Ajouter la fonction de rechargement
  const reload = () => {
    setCurrentPage(1);
  };

  // Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return { 
    products, 
    loading, 
    error,
    // Exercice 4.1 - Retourner la fonction de rechargement
    reload,
    // Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    nextPage,
    previousPage
  };
};

export default useProductSearch;
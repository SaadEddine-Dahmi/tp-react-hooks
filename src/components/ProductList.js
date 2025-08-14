// ProductList.js
import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {  
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const { 
    products, 
    loading, 
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage
  } = useProductSearch();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{language === 'fr' ? 'Chargement...' : 'Loading...'}</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      {language === 'fr' ? `Erreur: ${error}` : `Error: ${error}`}
    </div>
  );

  return (
    <div>
      {/* TODO: Exercice 4.1 - Ajouter le bouton de rechargement */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col">
              <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
                {product.thumbnail && (
                  <img 
                    src={product.thumbnail} 
                    className="card-img-top" 
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <strong>{language === 'fr' ? 'Prix: ' : 'Price: '}</strong>
                    {product.price}€
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">{language === 'fr' ? 'Aucun produit trouvé.' : 'No products found.'}</p>
        )}
      </div>

      {/* TODO: Exercice 4.2 - Ajouter les contrôles de pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={previousPage}>
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage} sur {totalPages}
            </span>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
     
    </div>
  );
};

export default ProductList;

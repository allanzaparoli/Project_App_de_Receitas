import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../css/favoriteRecipes.css';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [heartClicked, setHeartClicked] = useState(true);
  const [filter, setFilter] = useState('all');
  const [, setFavoritesStorage] = useLocalStorage('favoriteRecipes');

  useEffect(() => {
    const getFavorites = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
      setFavorites(favoriteRecipes);
      console.log(favoriteRecipes);
    };
    getFavorites();
  }, []);

  const handleShareClick = (id) => {
    setLinkCopied(true);
    if (favorites[0].type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
  };

  const handleFavorites = (id) => {
    setHeartClicked(false);
    const filterId = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(filterId);
    setFavoritesStorage(filterId);
  };

  const handleFilterButton = ({ target: { value } }) => {
    setFilter(value);
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    if (filter === 'all') {
      setFavorites(favoriteRecipes);
    } else {
      const filtro = favoriteRecipes.filter((favorite) => favorite.type === filter);
      setFavorites(filtro);
    }
  }, [filter]);

  return (
    <div className="divFavorites">
      <Header title="Favorite Recipes" profile />
      <div className="container-buttons-favorite">
        <button
          className="buttonsFavorite"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilterButton }
          name="all"
          value="all"
        >
          All
        </button>
        <button
          className="buttonsFavorite"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilterButton }
          name="food"
          value="food"
        >
          Food
        </button>
        <button
          className="buttonsFavorite"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterButton }
          name="drink"
          value="drink"
        >
          Drink
        </button>
      </div>
      { favorites && favorites.map((favorite, index) => (
        <div className="favorite-card" key={ index }>
          <div className="favoriteLinkImage">
            <Link
              to={ favorite.type === 'food' ? (
                `/foods/${favorite.id}`) : (`/drinks/${favorite.id}`) }
            >
              <img
                className="favoriteImg"
                src={ favorite.image }
                alt="strMealThumb"
                data-testid={ `${index}-horizontal-image` }

              />
            </Link>
          </div>
          <div className="favoriteNameCard">
            <Link
              className="link-name-favorite"
              to={ favorite.type === 'food' ? (
                `/foods/${favorite.id}`) : (`/drinks/${favorite.id}`) }
            >
              <h3 data-testid={ `${index}-horizontal-name` }>
                { favorite.name }
              </h3>
            </Link>
            { favorite.type === 'food' ? (
              <h4
                className="text-favorite"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${favorite.nationality} - ${favorite.category}` }
              </h4>
            ) : (
              <h4
                className="text-favorite"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${favorite.alcoholicOrNot}`}
              </h4>) }
            { linkCopied && <p>Link copied!</p> }
            <div className="container-btn-favorite">
              <button
                className="buttons-like-share"
                type="button"
                onClick={ () => handleShareClick(favorite.id) }
              >
                <img
                  src={ shareIcon }
                  alt="shareIcon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ () => handleFavorites(favorite.id) }
                className="buttons-like-share"
              >
                <img
                  src={ heartClicked ? blackHeartIcon : whiteHeartIcon }
                  alt="blackHeartIcon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;

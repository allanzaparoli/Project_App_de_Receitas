import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { handleChangeSearch, filterSearch, handleTypeClick,
    handleSearchClickDrinks, handleSearchClickFoods } = useContext(AppContext);

  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          value={ filterSearch }
          name="search"
          id="search"
          data-testid="search-input"
          onChange={ handleChangeSearch }
        />
      </label>
      <div className="search-bar">
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            id="ingredient"
            name="search-name"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ handleTypeClick }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            name="search-name"
            value="name"
            data-testid="name-search-radio"
            onClick={ handleTypeClick }
          />
        </label>
        <label htmlFor="first-letter">
          First letter
          <input
            type="radio"
            id="first-letter"
            name="search-name"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onClick={ handleTypeClick }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="btn-src-bar"
        onClick={ pathname === '/foods'
          ? handleSearchClickFoods : handleSearchClickDrinks }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;

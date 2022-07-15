import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            id="ingredient"
            name="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            name="name"
            value="name"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          First letter
          <input
            type="radio"
            id="first-letter"
            name="first-letter"
            value="first-letter"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;

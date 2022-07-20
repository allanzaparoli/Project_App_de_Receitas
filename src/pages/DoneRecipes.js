import React from 'react';
// import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const callLocalStorage = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    console.log(getLocalStorage);
    /* if (getLocalStorage !== null) { */
    const retunStorage = getLocalStorage
      .map(({ image, name, category, doneDate, tags }, index) => (
        <div key={ index + 1 }>
          <img src={ image } alt="name" data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
          <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
          { tags.map((tag, i) => (
            <span
              testid={ `${i}-${tag}-horizontal-tag` }
              key={ i + 1 }
            >
              { tag }
              {' '}
            </span>))}
        </div>
      ));
    return retunStorage;
  };

  return (
    <div>
      <Header title="Done Recipes" profile />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={}
        name="All"
        value="All"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        // onClick={}
        name="Food"
        value="Food"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={}
        name="Drinks"
        value="Drinks"
      >
        Drinks
      </button>
      { callLocalStorage() }
    </div>
  );
}

export default DoneRecipes;

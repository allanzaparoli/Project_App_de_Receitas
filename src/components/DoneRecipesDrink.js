import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesDrinks() {
  const [share, setShare] = useState(false);
  const number = 1000;

  const callLocalStorage = () => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
    return doneRecipesStorage.filter((recipe) => recipe.type === 'drink');
  };

  const handleClickShare = (id) => {
    const url = `http://localhost:3000/foods/${id}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    setShare(true);
  };

  setTimeout(() => {
    if (share) {
      setShare(false);
    }
  }, number);

  return (
    <div>
      <h2>Bebidas Separadas</h2>
      { share && <span>Link copied!</span> }
      { callLocalStorage().map((recipe, index) => (
        <div className="container-dones" key={ index + 1 }>
          <div className="container-dones-img">
            <img
              className="img-recipes-done"
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </div>
          <div className="container-dones-info">
            <div className="container-dones-info-share">
              <p
                data-testId={ `${index}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot }
              </p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleClickShare(recipe.id) }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
            </div>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Done in: ${recipe.doneDate}` }
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipesDrinks;

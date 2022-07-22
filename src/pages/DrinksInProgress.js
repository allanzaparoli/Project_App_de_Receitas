import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetailDrink } from '../fetchAPI/searchDrinks';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksInProgress() {
  const { id } = useParams();
  const [drinksInProgress, setdrinksInProgress] = useState([]);

  useEffect(() => {
    const getDrinksInProgress = async () => {
      const drink = await fetchRecipeDetailDrink(id);
      setdrinksInProgress(drink);
    };
    getDrinksInProgress();
  }, []);
  console.log(drinksInProgress);

  const getIngredients = (recipe) => {
    const arrayIngredients = Object.entries(recipe)
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    return arrayIngredients;
  };

  return (
    <div>
      <h1>Drinks in progress!</h1>
      {drinksInProgress.length && drinksInProgress
        .map((recipe, index) => (
          <div key={ index + 1 }>
            <img
              src={ recipe.strDrinkThumb }
              alt="recipe-in-progress"
              data-testid="recipe-photo"
            />
            <div>
              <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
              <span data-testid="recipe-category">{ recipe.strCategory }</span>
              <button type="button" data-testid="share-btn">
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {' '}
              <button type="button" data-testid="favorite-btn">
                <img src={ blackHeartIcon } alt="favorito" />
              </button>
            </div>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            { getIngredients(recipe).map((ingredient, i) => (
              !(ingredient[1] === ''
              || ingredient[1] === null || ingredient[1] === undefined)
              && (
                <p
                  key={ i + 1 }
                  data-testid={ `${i}-ingredient-step` }
                >
                  { ingredient[1] }
                  { console.log(ingredient[1])}
                </p>)
            ))}
            <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
          </div>
        ))}
    </div>
  );
}

export default DrinksInProgress;

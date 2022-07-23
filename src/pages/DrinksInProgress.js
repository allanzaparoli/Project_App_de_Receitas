import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetailDrink } from '../fetchAPI/searchDrinks';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

function DrinksInProgress() {
  const { id } = useParams();
  const [drinksInProgress, setdrinksInProgress] = useState([]);
  const [, setInProgressStorage] = useLocalStorage('inProgressRecipes');
  const [inProgress, setInProgress] = useState(true);
  const [, setFinishRecipe] = useLocalStorage('doneRecipes');

  useEffect(() => {
    const getDrinksInProgress = async () => {
      const drink = await fetchRecipeDetailDrink(id);
      setdrinksInProgress(drink);
    };
    getDrinksInProgress();
  }, []);

  const getIngredients = (recipe) => {
    const arrayIngredients = Object.entries(recipe)
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    return arrayIngredients;
  };

  const handleCheckbox = ({ target: { value, checked } }) => {
    const currentInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? [];
    let progressList;
    if (inProgress) {
      if (!checked) {
        progressList = currentInProgress.cocktails[id].filter((item) => item !== value);
      } else {
        progressList = [...currentInProgress.cocktails[id], value];
      }
      setInProgressStorage({
        ...currentInProgress,
        meals: {
          ...currentInProgress.meals,
          [id]: [...progressList],
        },
      });
    }
  };

  const handleClickFinished = () => {
    const finished = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
    setFinishRecipe([
      ...finished,
      {
        id: drinksInProgress[0].idDrink,
        type: 'drink',
        nationality: drinksInProgress[0].strArea,
        category: drinksInProgress[0].strCategory,
        alcoholicOrNot: drinksInProgress[0].strAlcoholic,
        name: drinksInProgress[0].strDrink,
        image: drinksInProgress[0].strDrinkThumb,
        doneDate: new Date(),
        tags: '',
      },
    ]);
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
                  <input
                    type="checkbox"
                    value={ ingredient[1] }
                    name="ingredients"
                    onChange={ handleCheckbox }
                  />
                  { ingredient[1] }
                </p>)
            ))}
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleClickFinished }
            >
              Finish Recipe
            </button>
          </div>
        ))}
    </div>
  );
}

export default DrinksInProgress;

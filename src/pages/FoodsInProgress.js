import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetail } from '../fetchAPI/searchFoods';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

function FoodsInProgress() {
  const { id } = useParams();
  const [foodsInProgress, setFoodsInProgress] = useState([]);
  const [inProgressStorage, setInProgressStorage] = useLocalStorage('inProgressRecipes');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const getFoodInProgress = async () => {
      const food = await fetchRecipeDetail(id);
      setFoodsInProgress(food);
    };
    getFoodInProgress();
  }, []);

  useEffect(() => {
    console.log(inProgressStorage.meals);

    // console.log(id);
  }, []);

  const getIngredients = (recipe) => {
    const arrayIngredients = Object.entries(recipe)
      .filter((ingredient) => ingredient[0].includes('strIngredient'));
    return arrayIngredients;
  };

  const handleCheckbox = ({ target: { value, checked } }) => {
    const currentInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? [];
    let progressList;
    if (!isFinished) {
      if (!checked) {
        progressList = currentInProgress.meals[id].filter((item) => item !== value);
      } else {
        progressList = [...currentInProgress.meals[id], value];
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

  return (
    <div>
      <h1>Foods in progress!</h1>
      {foodsInProgress.length && foodsInProgress
        .map((recipe, index) => (
          <div key={ index + 1 }>
            <img
              src={ recipe.strMealThumb }
              alt="recipe-in-progress"
              data-testid="recipe-photo"
            />
            <div className="recipe-in-progress-name">
              <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
              <span data-testid="recipe-category">{ recipe.strCategory }</span>
              {' '}
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
                    onChange={ handleCheckbox }
                    // checked=""
                  />
                  { ingredient[1] }
                </p>)
            )) }
            <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
          </div>
        )) }

    </div>
  );
}

export default FoodsInProgress;

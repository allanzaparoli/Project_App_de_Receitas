import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRecipeDetail } from '../fetchAPI/searchFoods';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/foodsInProgress.css';

function FoodsInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [foodsInProgress, setFoodsInProgress] = useState([]);
  const [, setInProgressStorage] = useLocalStorage('inProgressRecipes');
  const [inProgress] = useState(true);
  const [, setFinishRecipe] = useLocalStorage('doneRecipes');

  useEffect(() => {
    const getFoodInProgress = async () => {
      const food = await fetchRecipeDetail(id);
      setFoodsInProgress(food);
    };
    getFoodInProgress();
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

  const handleClickFinished = () => {
    const finished = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];

    setFinishRecipe([
      ...finished,
      {
        id: foodsInProgress[0].idMeal,
        type: 'food',
        nationality: foodsInProgress[0].strArea,
        category: foodsInProgress[0].strCategory,
        alcoholicOrNot: foodsInProgress[0].strAlcoholic ?? '',
        name: foodsInProgress[0].strMeal,
        image: foodsInProgress[0].strMealThumb,
        doneDate: new Date(),
        tags: foodsInProgress[0].strTags.split(','),
      },
    ]);
    history.push('/done-recipes');
  };

  return (
    <div>
      <h1>Foods in progress!</h1>
      {foodsInProgress.length && foodsInProgress
        .map((recipe, index) => (
          <div key={ index + 1 }>
            <img
              className="img-foods-in-progress"
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
                    name="ingredients"
                    // className={ (ev.target.checked) ? 'check' : '' }
                    onChange={ handleCheckbox }
                  />
                  { ingredient[1] }
                </p>)
            )) }
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleClickFinished }
            >
              Finish Recipe
            </button>
          </div>
        )) }

    </div>
  );
}

export default FoodsInProgress;

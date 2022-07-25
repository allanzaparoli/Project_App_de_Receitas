import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRecipeDetail } from '../fetchAPI/searchFoods';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from '../components/Header';
import '../css/foodsInProgress.css';

function FoodsInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [foodsInProgress, setFoodsInProgress] = useState([]);
  const [, setInProgressStorage] = useLocalStorage('inProgressRecipes');
  const [inProgress] = useState(true);
  const [, setFinishRecipe] = useLocalStorage('doneRecipes');
  const [share, setShare] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const number = 1000;

  useEffect(() => {
    const getFoodInProgress = async () => {
      if (id) {
        const food = await fetchRecipeDetail(id);
        setFoodsInProgress(food);
      }
    };
    getFoodInProgress();
  }, []);

  const getIngredients = (recipe) => {
    if (foodsInProgress) {
      const arrayIngredients = Object.entries(recipe)
        .filter((ingredient) => ingredient[0].includes('strIngredient'));
      return arrayIngredients;
    }
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

  const handleClickShare = () => {
    const url = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(url);
    setShare(true);
  };

  setTimeout(() => {
    if (share) {
      setShare(false);
    }
  }, number);

  const handleFavorites = () => {
    setHeartClicked((estadoAnt) => !estadoAnt);
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    if (!heartClicked) {
      setFavoritesStorage([
        ...currentFavorites,
        {
          id: foodDetail[0].idMeal,
          type: 'food',
          nationality: foodDetail[0].strArea,
          category: foodDetail[0].strCategory,
          alcoholicOrNot: foodDetail[0].strAlcoholic ?? '',
          name: foodDetail[0].strMeal,
          image: foodDetail[0].strMealThumb,
        }]);
    } else {
      const filterId = currentFavorites.filter((favorite) => favorite.id !== id);
      setFavoritesStorage(filterId);
    }
  };

  return (
    <div className="container-inProgress">
      <Header title="Foods in Progress" profile />
      { share && <p>Link copied!</p> }
      {foodsInProgress && foodsInProgress
        .map((recipe, index) => (
          <div className="container-interno" key={ index + 1 }>
            <img
              className="img-foods-in-progress"
              src={ recipe.strMealThumb }
              alt="recipe-in-progress"
              data-testid="recipe-photo"
            />
            <div className="recipe-in-progress-name">
              <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
              <div className="recipe-in-progress-btn">
                <button
                  className="btn-progress"
                  type="button"
                  data-testid="share-btn"
                  onClick={ handleClickShare }
                >
                  <img src={ shareIcon } alt="shareIcon" />
                </button>
                {' '}
                <button
                  className="btn-progress"
                  type="button"
                  data-testid="favorite-btn"
                  onClick={ handleFavorites }
                >
                  { heartClicked ? (
                    <img
                      src={ blackHeartIcon }
                      alt="blackHeartIcon"
                      data-testid="favorite-btn"
                    />
                  ) : (
                    <img
                      src={ whiteHeartIcon }
                      alt="whiteHeartIco"
                      data-testid="favorite-btn"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="progress-categories">
              <span data-testid="recipe-category">{ recipe.strCategory }</span>
            </div>
            <p
              className="instructions"
              data-testid="instructions"
            >
              { recipe.strInstructions }
            </p>
            <div className="container-checkbox">
              { foodsInProgress && getIngredients(recipe).map((ingredient, i) => (
                !(ingredient[1] === ''
              || ingredient[1] === null || ingredient[1] === undefined)
              && (
                <p
                  key={ i + 1 }
                  data-testid={ `${i}-ingredient-step` }
                  className="checkbox"
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
            </div>
            <button
              className="btn-finish"
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

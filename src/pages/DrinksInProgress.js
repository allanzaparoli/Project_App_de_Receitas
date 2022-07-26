import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRecipeDetailDrink } from '../fetchAPI/searchDrinks';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/drinksInProgress.css';

function DrinksInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [drinksInProgress, setdrinksInProgress] = useState([]);
  const [, setInProgressStorage] = useLocalStorage('inProgressRecipes');
  const [inProgress] = useState(true);
  const [, setFinishRecipe] = useLocalStorage('doneRecipes');
  const [share, setShare] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const number = 1000;

  useEffect(() => {
    const getDrinksInProgress = async () => {
      if (id) {
        const drink = await fetchRecipeDetailDrink(id);
        setdrinksInProgress(drink);
      }
    };
    getDrinksInProgress();
  }, []);

  const getIngredients = (recipe) => {
    if (drinksInProgress) {
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
        progressList = currentInProgress.cocktails[id].filter((item) => item !== value);
      } else {
        progressList = [...currentInProgress.cocktails[id], value];
      }
      setInProgressStorage({
        ...currentInProgress,
        cocktails: {
          ...currentInProgress.cocktails,
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
        tags: [],
      },
    ]);
    history.push('/done-recipes');
  };

  const handleClickShare = () => {
    const url = `http://localhost:3000/drinks/${id}`;
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
          id: drinkDetail[0].idDrink,
          type: 'drink',
          nationality: drinkDetail[0].strArea ?? '',
          category: drinkDetail[0].strCategory ?? '',
          alcoholicOrNot: drinkDetail[0].strAlcoholic ?? '',
          name: drinkDetail[0].strDrink,
          image: drinkDetail[0].strDrinkThumb,
        }]);
    } else {
      const filterId = currentFavorites.filter((favorite) => favorite.id !== id2);
      setFavoritesStorage(filterId);
    }
  };

  return (
    <div>
      <h1>Drinks in progress!</h1>
      { share && <p>Link copied!</p> }
      {drinksInProgress.length && drinksInProgress
        .map((recipe, index) => (
          <div key={ index + 1 }>
            <img
              className="img-drinks-in-progress"
              src={ recipe.strDrinkThumb }
              alt="recipe-in-progress"
              data-testid="recipe-photo"
            />
            <div>
              <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
              <span data-testid="recipe-category">{ recipe.strCategory }</span>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleClickShare }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {' '}
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ handleFavorites }
              >
                { heartClicked
                  ? (
                    <img
                      data-testid="favorite-btn"
                      src={ blackHeartIcon }
                      alt="blackHeartIcon"
                    />
                  )
                  : (
                    <img
                      src={ whiteHeartIcon }
                      alt="whiteHeartIco"
                      data-testid="favorite-btn"
                    />
                  ) }
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

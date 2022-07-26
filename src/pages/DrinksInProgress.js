import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRecipeDetailDrink } from '../fetchAPI/searchDrinks';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/inProgress.css';

function DrinksInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [drinksInProgress, setdrinksInProgress] = useState([]);
  // const [, setInProgressStorage] = useLocalStorage('inProgressRecipes');
  // const [inProgress] = useState(true);
  const [, setFinishRecipe] = useLocalStorage('doneRecipes');
  const [share, setShare] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  const storageVerify = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!storageVerify || !storageVerify.meals || !storageVerify.meals[id]) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        cocktails: {
          [id]: [],
        },
      },
    ));
  }

  const getStorageProgress = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return storage.cocktails[id];
  };

  const [isChecked, setIsChecked] = useState(getStorageProgress());
  const number = 1000;

  // if (!localStorage.inProgressRecipes) {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(
  //     {
  //       cocktails: {
  //         [id]: [],
  //       },
  //     },
  //   ));
  // }

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
    // if (inProgress) {
    if (!checked) {
      progressList = isChecked.filter((item) => item !== value);
      // progressList = currentInProgress.cocktails[id].filter((item) => item !== value);
    } else {
      progressList = [...isChecked, value];
      // progressList = [...currentInProgress.cocktails[id], value];
    }
    setInProgressStorage({
      ...currentInProgress,
      cocktails: {
        ...currentInProgress.cocktails,
        [id]: [...progressList],
      },
    });
    setIsChecked(progressList);
    // }
  };

  const setTags = (stringTags) => {
    if (stringTags !== null && stringTags !== undefined && stringTags !== '') {
      return stringTags.split(',');
    }
    return [];
  };

  if (!localStorage.donRecipes) localStorage.setItem('doneRecipes', JSON.stringify([]));
  const handleClickFinished = () => {
    const finished = JSON.parse(localStorage.getItem('doneRecipes'));

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
        tags: setTags(),
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
    <div className="container-inProgress">
      { share && <p>Link copied!</p> }
      {drinksInProgress && drinksInProgress
        .map((recipe, index) => (
          <div className="container-interno" key={ index + 1 }>
            <img
              className="img-drinks-in-progress"
              src={ recipe.strDrinkThumb }
              alt="recipe-in-progress"
              data-testid="recipe-photo"
            />
            <div className="recipe-in-progress-name">
              <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
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
                { heartClicked
                  ? (
                    <img
                      src={ blackHeartIcon }
                      alt="blackHeartIcon"
                      data-testid="favorite-btn"
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
              { drinksInProgress && getIngredients(recipe).map((ingredient, i) => (
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
                    onChange={ handleCheckbox }
                    checked={ isChecked.includes(ingredient[1]) }
                  />
                  { ingredient[1] }
                </p>)
              ))}
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
        ))}
    </div>
  );
}

export default DrinksInProgress;

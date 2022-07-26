import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchRecipeDetailDrink } from '../fetchAPI/searchDrinks';
import { fetch12Meals } from '../fetchAPI/searchFoods';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/drinkRecipe.css';

function DrinkRecipe() {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [foodRecomendation, setFoodRecomendation] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [, setFavoritesStorage] = useLocalStorage('favoriteRecipes');
  const [linkCopied, setLinkCopied] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  // const [start, setStart] = useState(false);
  // const [inProgressStorage, setInProgressStorage] = useLocalStorage('inProgressRecipes');
  const [finishedRecipe] = useLocalStorage('doneRecipes');
  const number = 500;
  const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const getDrinkDetail = async () => {
      const numMax = 6;
      if (id) {
        const recomendations = await fetch12Meals();
        const details = await fetchRecipeDetailDrink(id);
        setDrinkDetail(details);
        setFoodRecomendation(recomendations.slice(0, numMax));
      }
    };
    getDrinkDetail();
  }, [id]);

  useEffect(() => {
    const getFavoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    const verifyStorage = getFavoritesStorage.find((favorite) => favorite.id === id);
    if (verifyStorage) {
      setHeartClicked(true);
    }
  }, []);

  // useEffect(() => {
  //   const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {};
  //   console.log(recipeInProgress);
  //   if (!recipeInProgress.cocktails) {
  //     setStart(true);
  //   }
  // }, [start]);

  const filterIngredientsKeys = () => {
    if (drinkDetail[0]) {
      return Object.keys(drinkDetail[0]).filter((detail) => detail
        .includes('strIngredient'));
    }
  };

  const filterMeasuresKeys = () => {
    if (drinkDetail[0]) {
      return Object.keys(drinkDetail[0]).filter((detail) => detail
        .includes('strMeasure'));
    }
  };

  const bothFilters = () => {
    const measures = filterMeasuresKeys();
    return filterIngredientsKeys()?.map((ingredient, index) => (
      [drinkDetail[0][ingredient], drinkDetail[0][measures[index]]]
    )).filter((item) => item[0] !== null);
  };

  const handleStartRecipeButton = () => {
    // const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? [];
    // setInProgressStorage({
    //   ...recipeInProgress,
    //   cocktails: {
    //     ...recipeInProgress.cocktails,
    //     [id]: [],
    //   },
    // });
    if (id) {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const handleShareClick = () => {
    setLinkCopied(true);
    clipboardCopy(window.location.href);
  };

  setTimeout(() => {
    if (linkCopied) {
      setLinkCopied(false);
    }
  }, number);

  const handleFavorites = (id2) => {
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
      <div className="share-heart-buttons">
        { linkCopied && <p>Link copied!</p> }
        <button type="button" data-testid="share-btn" onClick={ handleShareClick }>
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button
          type="button"
          onClick={ () => handleFavorites(id) }
        >
          { heartClicked ? (
            <img src={ blackHeartIcon } alt="blackHeartIcon" data-testid="favorite-btn" />
          ) : (
            <img
              src={ whiteHeartIcon }
              alt="whiteHeartIco"
              data-testid="favorite-btn"
            />) }
        </button>
      </div>
      { drinkDetail && drinkDetail.map((recipe, index) => (
        <div key={ index } className="recipe-details">
          <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
          <img
            src={ recipe.strDrinkThumb }
            alt="strDrinkThumb"
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-category">{ recipe.strAlcoholic }</h3>
          <ul>
            { bothFilters().map((key, index2) => (
              <li
                key={ Math.random() }
                data-testid={ `${index2}-ingredient-name-and-measure` }
              >
                {key[0]}
                -
                <span>{key[1]}</span>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          { !finishedRecipe?.some((item) => item.id === id)
            ? (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-button"
                onClick={ handleStartRecipeButton }
              >
                { progress && progress.cocktails && progress.cocktails[id] !== undefined
                  ? 'Continue Recipe' : 'Start Recipe' }
              </button>
            ) : ''}
        </div>
      ))}
      <div className="recomendations">
        { foodRecomendation && foodRecomendation.map((drink, index) => (
          <div
            key={ index }
            className="recomendations2"
            data-testid={ `${index}-recomendation-card` }
          >
            <h2 data-testid={ `${index}-recomendation-title` }>{ drink.strMeal }</h2>
            <img
              src={ drink.strMealThumb }
              alt="strMealThumb"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DrinkRecipe;

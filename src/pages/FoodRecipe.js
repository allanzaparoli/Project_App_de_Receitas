import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchRecipeDetail } from '../fetchAPI/searchFoods';
import { fetch12Drinks } from '../fetchAPI/searchDrinks';
import '../css/recipeDetails.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/foodRecipe.css';

function FoodRecipe() {
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkRecomendation, setDrinkRecomendation] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [, setFavoritesStorage] = useLocalStorage('favoriteRecipes');
  const [linkCopied, setLinkCopied] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const [finishedRecipe] = useLocalStorage('doneRecipes');
  const number = 500;
  const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const getFoodDetail = async () => {
      const numMax = 6;
      if (id) {
        const details = await fetchRecipeDetail(id);
        const recomendations = await fetch12Drinks();
        setFoodDetail(details);
        setDrinkRecomendation(recomendations.slice(0, numMax));
      }
    };
    getFoodDetail();
  }, [id]);

  useEffect(() => {
    const getFavoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    const verifyStorage = getFavoritesStorage.find((favorite) => favorite.id === id);
    if (verifyStorage) {
      setHeartClicked(true);
    }
  }, []);

  const filterIngredientsKeys = () => {
    if (foodDetail[0]) {
      return Object.keys(foodDetail[0]).filter((detail) => detail
        .includes('strIngredient'));
    }
  };

  const filterMeasuresKeys = () => {
    if (foodDetail[0]) {
      return Object.keys(foodDetail[0]).filter((detail) => detail
        .includes('strMeasure'));
    }
  };

  const bothFilters = () => {
    const measures = filterMeasuresKeys();
    return filterIngredientsKeys()?.map((ingredient, index) => (
      [foodDetail[0][ingredient], foodDetail[0][measures[index]]]
    )).filter((item) => item[0] !== '');
  };

  const handleStartRecipeButton = () => {
    if (id) {
      history.push(`/foods/${id}/in-progress`);
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
          id: foodDetail[0].idMeal,
          type: 'food',
          nationality: foodDetail[0].strArea,
          category: foodDetail[0].strCategory,
          alcoholicOrNot: foodDetail[0].strAlcoholic ?? '',
          name: foodDetail[0].strMeal,
          image: foodDetail[0].strMealThumb,
        }]);
    } else {
      const filterId = currentFavorites.filter((favorite) => favorite.id !== id2);
      setFavoritesStorage(filterId);
    }
  };

  return (
    <div className="container-details">

      { foodDetail && foodDetail.map((recipe, index) => (
        <div key={ index } className="recipe-details">
          <div className="container-img-details">
            <img
              className="img-details"
              src={ recipe.strMealThumb }
              alt="strMealThumb"
              data-testid="recipe-photo"
            />
          </div>
          <div className="details-categories">
            <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
          </div>
          <div className="container-interno-details">
            <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
            <div className="share-heart-buttons">

              { linkCopied && <p>Link copied!</p> }
              <button
                className="btn-details"
                type="button"
                data-testid="share-btn"
                onClick={ handleShareClick }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              <button
                className="btn-details"
                type="button"
                onClick={ () => handleFavorites(id) }
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
                  />) }
              </button>
            </div>
          </div>
          <div className="container-li-details">
            <ul>
              { bothFilters().map((key, index2) => (
                <li
                  className="li-details"
                  key={ Math.random() }
                  data-testid={ `${index2}-ingredient-name-and-measure` }
                >
                  {key[0]}
                  -
                  <span>{key[1]}</span>
                </li>
              ))}
            </ul>
          </div>
          <p
            className="instructions-details"
            data-testid="instructions"
          >
            { recipe.strInstructions }

          </p>
          <iframe
            title="food-video"
            width="300"
            height="200"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            data-testid="video"
          />
          { !finishedRecipe?.some((item) => item.id === id)
            ? (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-button"
                onClick={ handleStartRecipeButton }
              >
                { progress && progress.meals && progress.meals[id] !== undefined
                  ? 'Continue Recipe' : 'Start Recipe' }
              </button>
            ) : '' }
        </div>
      ))}
      <div className="recomendations">
        { drinkRecomendation && drinkRecomendation.map((drink, index) => (
          <div
            key={ index }
            className="recomendations2"
            data-testid={ `${index}-recomendation-card` }
          >
            <h2 data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</h2>
            <img
              src={ drink.strDrinkThumb }
              alt="strDrinkThumb"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodRecipe;

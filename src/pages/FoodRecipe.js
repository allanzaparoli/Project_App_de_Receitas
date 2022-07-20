import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchRecipeDetail } from '../fetchAPI/searchFoods';
import { fetch12Drinks } from '../fetchAPI/searchDrinks';
import '../css/recipeDetails.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/foodRecipe.css';

function FoodRecipe() {
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkRecomendation, setDrinkRecomendation] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [, setFavoritesStorage] = useLocalStorage('favoriteRecipes');
  const [linkCopied, setLinkCopied] = useState(false);

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

  const handleFavorites = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
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
  };

  return (
    <div>
      { linkCopied && <p>Link copied!</p> }
      <button type="button" data-testid="share-btn" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button type="button" data-testid="favorite-btn" onClick={ handleFavorites }>
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
      { foodDetail && foodDetail.map((recipe, index) => (
        <div key={ index } className="recipe-details">
          <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
          <img
            src={ recipe.strMealThumb }
            alt="strMealThumb"
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
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
          <iframe
            title="food-video"
            width="300"
            height="200"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            data-testid="video"
          />
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-button"
            onClick={ handleStartRecipeButton }
          >
            Start Recipe
          </button>
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

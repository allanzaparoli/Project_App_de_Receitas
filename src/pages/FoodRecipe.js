import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  return (
    <div>
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
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-button"
      >
        Start Recipe
      </button>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
    </div>
  );
}

export default FoodRecipe;

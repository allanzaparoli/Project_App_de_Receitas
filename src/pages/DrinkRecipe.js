import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetailDrink } from '../fetchAPI/searchDrinks';
import { fetch12Meals } from '../fetchAPI/searchFoods';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/drinkRecipe.css';

function DrinkRecipe() {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [foodRecomendation, setFoodRecomendation] = useState([]);
  const { id } = useParams();

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

  return (
    <div>
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
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-button"
      >
        Start Recipe
      </button>
      <div className="share-heart-buttons">
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
        </button>
      </div>
    </div>
  );
}

export default DrinkRecipe;

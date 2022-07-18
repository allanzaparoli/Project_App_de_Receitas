import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import AppContext from '../context/AppContext';
import { fetch12Meals, fetch5CategoriesMeals } from '../fetchAPI/searchFoods';
import '../css/foods.css';

function Foods() {
  const { recipesFilter, allRecipes } = useContext(AppContext);
  const history = useHistory();
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    fetch12Meals().then((recipes) => allRecipes(recipes));
  });

  useEffect(() => {
    if (recipesFilter && recipesFilter.length === 1) {
      const id = recipesFilter[0].idMeal;
      history.push(`/foods/${id}`);
    }

    if (!recipesFilter) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      allRecipes([]);
    }
  }, [recipesFilter, history, allRecipes]);

  const recipeLimit = (array) => {
    const numMax = 12;

    if (array && array.length > numMax) {
      return array.slice(0, numMax);
    }
    return array;
  };

  const fetchCategories = async () => {
    const categories = await fetch5CategoriesMeals();
    setFoodCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Header title="Foods" profile search />
      <Recipes>
        { foodCategories.map((category, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
        { !!recipesFilter && recipeLimit(recipesFilter).map((recipe, index) => (
          <div key={ index } className="recipes" data-testid={ `${index}-recipe-card` }>
            <h2 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h2>
            <img
              src={ recipe.strMealThumb }
              alt="strMealThumb"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </Recipes>
      <Footer />
    </div>
  );
}

export default Foods;

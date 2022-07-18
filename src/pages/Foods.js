import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import AppContext from '../context/AppContext';
import { fetch12Meals, fetch5CategoriesMeals,
  fetchByCategoryMeal } from '../fetchAPI/searchFoods';
import '../css/foods.css';

function Foods() {
  const { recipesFilter, setRecipesFilter } = useContext(AppContext);
  const history = useHistory();
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodOption, setFoodOption] = useState('');
  const [optionToggle, setOptionToggle] = useState(false);

  const fetchCategories = async () => {
    const categories = await fetch5CategoriesMeals();
    setFoodCategories(categories);
  };

  const getAllRecipes = async () => {
    const allRecipesList = await fetch12Meals();
    setRecipesFilter(allRecipesList);
  };

  useEffect(() => {
    fetchCategories();
    getAllRecipes();
  }, []);

  useEffect(() => {
    const waitFetch = async () => {
      if (foodOption) {
        const categoryList = await fetchByCategoryMeal(foodOption);
        setRecipesFilter(categoryList);
      }
    };
    waitFetch();
  }, [foodOption]);

  const handleCategoryClick = ({ target: { value } }) => {
    setFoodOption(value);
    setOptionToggle(!optionToggle);
    if (optionToggle === true) {
      setFoodOption('');
      getAllRecipes();
    }
  };

  const handleAllClick = () => {
    getAllRecipes();
  };

  useEffect(() => {
    const time = 500;
    if (recipesFilter && recipesFilter.length === 1) {
      const id = recipesFilter[0].idMeal;
      setTimeout(() => {
        history.push(`/foods/${id}`);
      }, time);
      return;
    }
    if (!recipesFilter) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      getAllRecipes();
    }
  }, [recipesFilter, history]);

  const recipeLimit = (array) => {
    const numMax = 12;
    if (array && array.length > numMax) {
      return array.slice(0, numMax);
    }
    return array;
  };

  const handleRecipeDetail = () => {
    const id = recipesFilter[0].idMeal;
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      <Header title="Foods" profile search />
      <Recipes className="recipes">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllClick }
          name="All"
          value="All"
        >
          All
        </button>
        { foodCategories.map((category, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            value={ category.strCategory }
            onClick={ handleCategoryClick }
          >
            {category.strCategory}
          </button>
        ))}
        { recipeLimit(recipesFilter).map((recipe, index) => (
          <button
            onClick={ handleRecipeDetail }
            type="button"
            key={ index }
            className="recipes-card"
            data-testid={ `${index}-recipe-card` }
          >
            <h2 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h2>
            <img
              src={ recipe.strMealThumb }
              alt="strMealThumb"
              data-testid={ `${index}-card-img` }
            />
          </button>
        ))}
      </Recipes>
      <Footer />
    </div>
  );
}

export default Foods;

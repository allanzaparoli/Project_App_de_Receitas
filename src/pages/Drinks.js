import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import AppContext from '../context/AppContext';
import '../css/drinks.css';
import { fetch12Drinks, fetch5CategoriesDrinks,
  fetchByCategoryDrink } from '../fetchAPI/searchDrinks';

function Drinks() {
  const { recipesFilter, setRecipesFilter } = useContext(AppContext);
  const history = useHistory();
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkOption, setDrinkOption] = useState('');

  const fetchCategories = async () => {
    const categories = await fetch5CategoriesDrinks();
    setDrinkCategories(categories);
  };

  const getAllRecipes = async () => {
    const allRecipesList = await fetch12Drinks();
    setRecipesFilter(allRecipesList);
  };

  useEffect(() => {
    fetchCategories();
    getAllRecipes();
  }, []);

  useEffect(() => {
    const waitFetch = async () => {
      if (drinkOption) {
        const categoryList = await fetchByCategoryDrink(drinkOption);
        setRecipesFilter(categoryList);
      }
    };
    waitFetch();
  }, [drinkOption]);

  const handleCategoryClick = ({ target: { value } }) => {
    setDrinkOption(value);
  };

  const handleAllClick = () => {
    getAllRecipes();
  };

  useEffect(() => {
    if (recipesFilter && recipesFilter.length === 1) {
      const id = recipesFilter[0].idDrink;
      history.push(`/drinks/${id}`);
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

  return (
    <div>
      <Header title="Drinks" profile search />
      <Recipes>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllClick }
          name="All"
          value="All"
        >
          All
        </button>
        { drinkCategories.map((category, index) => (
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
          <div
            key={ index }
            className="recipes-card"
            data-testid={ `${index}-recipe-card` }
          >
            <h2 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h2>
            <img
              src={ recipe.strDrinkThumb }
              alt="strDrinkThumb"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </Recipes>
      <Footer />
    </div>
  );
}

export default Drinks;

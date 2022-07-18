import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import AppContext from '../context/AppContext';
import { fetch12Drinks, fetch5CategoriesDrinks } from '../fetchAPI/searchDrinks';

function Drinks() {
  const { recipesFilter, allRecipes } = useContext(AppContext);
  const history = useHistory();
  const [drinkCategories, setDrinkCategories] = useState([]);

  useEffect(() => {
    fetch12Drinks().then((recipes) => allRecipes(recipes));
  });

  useEffect(() => {
    if (recipesFilter && recipesFilter.length === 1) {
      const id = recipesFilter[0].idDrink;
      history.push(`/drinks/${id}`);
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
    const categories = await fetch5CategoriesDrinks();
    setDrinkCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Header title="Drinks" profile search />
      <Recipes>
        { drinkCategories.map((category, index) => (
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
            <h2 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h2>
            <img
              src={ recipe.strDrinkThumb }
              alt="strDrinkThumb"
              data-testid={ `${index}-card-img` }
            />
            <p>{ recipe.idDrink }</p>
          </div>
        ))}
      </Recipes>
      <Footer />
    </div>
  );
}

export default Drinks;

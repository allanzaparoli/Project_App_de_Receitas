import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/doneRecipes.css';
import DoneRecipesFood from '../components/DoneRecipesFood';
import DoneRecipesDrinks from '../components/DoneRecipesDrink';

function DoneRecipes() {
  const [filterFood, setFilterFood] = useState(false);
  const [filterDrink, setFilterDrink] = useState(false);

  const handleFilterAll = () => {
    // setFilterAll(true);
    setFilterFood(false);
    setFilterDrink(false);
  };

  const handleFilterFood = () => {
    // setFilterAll(false);
    setFilterDrink(false);
    setFilterFood(true);
  };

  const handleFilterDrink = () => {
    // setFilterAll(false);
    setFilterFood(false);
    setFilterDrink(true);
  };

  return (
    <div>
      <Header title="Done Recipes" profile />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterAll }
        name="All"
        value="All"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleFilterFood }
        name="Food"
        value="Food"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterDrink }
        name="Drinks"
        value="Drinks"
      >
        Drinks
      </button>
      { (!filterFood && !filterDrink) && (
        <div>
          <DoneRecipesFood />
          <DoneRecipesDrinks />
        </div>
      )}
      { (filterFood) && <DoneRecipesFood /> }
      { (filterDrink) && <DoneRecipesDrinks /> }
    </div>
  );
}

export default DoneRecipes;

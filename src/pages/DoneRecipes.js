import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/doneRecipes.css';
import CardDone from '../components/CardDone';
// import DoneRecipesDrinks from '../components/DoneRecipesDrink';

function DoneRecipes() {
  const [filterFood, setFilterFood] = useState(false);
  const [filterDrink, setFilterDrink] = useState(false);

  const handleFilterAll = () => {
    setFilterFood(false);
    setFilterDrink(false);
  };

  const handleFilterFood = () => {
    setFilterDrink(false);
    setFilterFood(true);
  };

  const handleFilterDrink = () => {
    setFilterFood(false);
    setFilterDrink(true);
  };

  return (
    <div>
      <Header title="Done Recipes" profile />
      <div className="container-buttons-done">
        <button
          className="buttons-done"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilterAll }
          name="All"
          value="All"
        >
          All
        </button>
        <button
          className="buttons-done"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilterFood }
          name="Food"
          value="Food"
        >
          Food
        </button>
        <button
          className="buttons-done"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterDrink }
          name="Drinks"
          value="Drinks"
        >
          Drinks
        </button>
      </div>
      { (!filterFood && !filterDrink) && (
        <div>
          <CardDone />
        </div>
      )}
      {/* { (filterFood) && <DoneRecipesFood /> }
      { (filterDrink) && <DoneRecipesDrinks /> } */}
    </div>
  );
}

export default DoneRecipes;

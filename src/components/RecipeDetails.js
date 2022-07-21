import React from 'react';
import { useLocation } from 'react-router-dom';
import FoodRecipe from '../pages/FoodRecipe';
import DrinkRecipe from '../pages/DrinkRecipe';

export default function RecipeDetails() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div>
      { pathname === '/foods' ? <FoodRecipe /> : <DrinkRecipe />}
    </div>
  );
}
console.log(useLocation);
/*
equisito pede um componente chamado RecipeInProgress
12h04
E já tem a foodInProgress e drinkInProgress
*/

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

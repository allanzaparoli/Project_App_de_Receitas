import React from 'react';
import { useLocation } from 'react-router-dom';
import FoodsInProgress from '../pages/FoodsInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';

function RecipeInProgress() {
  const location = useLocation();
  const { pathname } = location;
  const { id } = pathname;

  return (
    <div>
      { pathname === `/foods/${id}` ? <FoodsInProgress /> : <DrinksInProgress />}
    </div>
  );
}

export default RecipeInProgress;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinksInProgress from './pages/DrinksInProgress';
import FoodsInProgress from './pages/FoodsInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods/:id" component={ FoodRecipe } />
          <Route exact path="/drinks/:id" component={ DrinkRecipe } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
          <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </AppProvider>
    </div>
  );
}

export default App;

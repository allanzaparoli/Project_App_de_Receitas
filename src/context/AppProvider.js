import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from './AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchByIngredient, fetchByLetter, fetchByName } from '../fetchAPI/searchFoods';
import { fetchByIngredientDrink, fetchByLetterDrink, fetchByNameDrink }
from '../fetchAPI/searchDrinks';

function AppProvider({ children }) {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [userStorage, setUserStorage] = useLocalStorage('user');
  const [mealsToken, setMealsToken] = useLocalStorage('mealsToken');
  const [cocktailsToken, setCocktailsToken] = useLocalStorage('cocktailsToken');

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [filterSearch, setFilterSearch] = useState('');
  const [radioType, setRadioType] = useState(null);
  const [recipesFilter, setRecipesFilter] = useState([]);
  const primeiraLetra = 'first-letter';

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin((estadoAnt) => ({
      ...estadoAnt,
      [name]: value }));

    const { email, password } = login;
    const numMin = 6;
    if (email.length >= numMin && password.length >= numMin && email.includes('@')
    && email.includes('.com')) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleLoginClick = () => {
    setUserStorage({
      email: login.email,
    });
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/foods');
  };

  const handleChangeSearch = ({ target: { value } }) => {
    if (radioType === primeiraLetra && filterSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setFilterSearch(value);
  };

  const handleTypeClick = ({ target: { value } }) => {
    setRadioType(value);
  };

  const handleSearchClickFoods = async () => {
    if (radioType === 'ingredient') {
      const ingredientFilter = await fetchByIngredient(filterSearch);
      setRecipesFilter(ingredientFilter);
    }

    if (radioType === 'name') {
      const nameFilter = await fetchByName(filterSearch);
      setRecipesFilter(nameFilter);
    }

    if (radioType === primeiraLetra) {
      const letterFilter = await fetchByLetter(filterSearch);
      setRecipesFilter(letterFilter);
    }
  };

  const handleSearchClickDrinks = async () => {
    if (radioType === 'ingredient') {
      const ingredientFilter = await fetchByIngredientDrink(filterSearch);
      setRecipesFilter(ingredientFilter);
    }

    if (radioType === 'name') {
      const nameFilter = await fetchByNameDrink(filterSearch);
      setRecipesFilter(nameFilter);
    }

    if (radioType === primeiraLetra) {
      const letterFilter = await fetchByLetterDrink(filterSearch);
      setRecipesFilter(letterFilter);
    }
  };

  const context = {
    handleChange,
    buttonDisabled,
    login,
    handleLoginClick,
    userStorage,
    mealsToken,
    cocktailsToken,
    handleChangeSearch,
    filterSearch,
    handleTypeClick,
    radioType,
    handleSearchClickFoods,
    recipesFilter,
    setRecipesFilter,
    handleSearchClickDrinks,
    setUserStorage,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;

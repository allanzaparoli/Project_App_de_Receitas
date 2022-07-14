import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useLocalStorage from '../hooks/useLocalStorage';

function AppProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [userStorage, setUserStorage] = useLocalStorage('user');
  const [mealsToken, setMealsToken] = useLocalStorage('mealsToken');
  const [cocktailsToken, setCocktailsToken] = useLocalStorage('cocktailsToken');

  const [buttonDisabled, setButtonDisabled] = useState(true);

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
  };

  const context = {
    handleChange,
    buttonDisabled,
    login,
    handleLoginClick,
    userStorage,
    mealsToken,
    cocktailsToken,
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

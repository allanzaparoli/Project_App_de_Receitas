import React, { useContext } from 'react';
import { GiCook } from 'react-icons/gi';
import AppContext from '../context/AppContext';
import '../css/login.css';

function Login() {
  const { handleChange, login,
    buttonDisabled, handleLoginClick } = useContext(AppContext);
  const { email, password } = login;

  return (
    <div className="login-background">
      <form className="login">
        <GiCook className="chef-icon" />
        <h1>Recipe App</h1>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ handleChange }
            value={ password }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ buttonDisabled }
          onClick={ handleLoginClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;

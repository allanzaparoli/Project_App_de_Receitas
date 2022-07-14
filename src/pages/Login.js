import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { handleChange, login, buttonDisabled } = useContext(AppContext);
  const { email, password } = login;

  return (
    <div>
      <h1>Login</h1>
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
        Senha:
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
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

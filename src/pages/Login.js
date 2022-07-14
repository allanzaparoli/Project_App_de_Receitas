import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="email">
        Email:
        <input
          name="email"
          type="text"
          id="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          name="password"
          type="text"
          id="password"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

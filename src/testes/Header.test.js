import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Header', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Testa se os componente são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const profile = screen.getByTestId('profile-top-btn');
    const src = screen.getByTestId('search-top-btn');
    expect(src).toBeInTheDocument();
    userEvent.click(profile);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/profile');
  });
});

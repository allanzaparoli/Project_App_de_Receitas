import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const email = 'email-input';
const senha = 'password-input';
const button = 'login-submit-btn';
const bel = 'bel.terenzi@gmail.com';
const profile = 'profile-top-btn';

describe('Testa página de Profile', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Testa se os componente e a rota de Done Recipes', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);

    const profileButton = screen.getByTestId(profile);

    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/profile');

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();

    const doneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipes);

    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
  it('Testa a rota favorites', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const perfil = screen.getByTestId(profile);
    userEvent.click(perfil);

    const favorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favorite);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Testa a rota login', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const perfil = screen.getByTestId(profile);
    userEvent.click(perfil);

    const favorite = screen.getByTestId('profile-logout-btn');
    userEvent.click(favorite);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');
  });
});

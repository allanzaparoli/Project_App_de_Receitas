import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa página de Profile', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Testa se os componente e a rota de Done Recipes', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);

    const profileButton = screen.getByTestId('profile-top-btn');

    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();

    const doneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipes);

    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
});

import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Testa os componentes são renderizados na tela e as rotas', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);

    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);

    const searchInput = screen.queryByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
    expect(screen.queryByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();

    userEvent.click(searchButton);

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods');

    userEvent.type(searchInput, 'garlic');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));

    expect(getByText(/baingan/i)).toBeInTheDocument();
  });
});

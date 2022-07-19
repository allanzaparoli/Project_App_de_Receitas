import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  beforeEach(() => {
    cleanup();
  });
  it('Testa page drinks', () => {
    const number = 1000;
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const drinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinks);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/drinks');
    const button = screen.getByTestId('search-top-btn');
    userEvent.click(button);
    userEvent.type(screen.getByTestId('search-input'), {
      target: { value: 'banana' },
    });
    const ingredientes = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientes);
    const src = screen.getByTestId('exec-search-btn');
    userEvent.click(src);
    setTimeout(() => {
      const image = screen.getByTestId('card-name');
      expect(image[0]).toBeInTheDocument();
    }, number);
  });
  it('Testa rota de foods', () => {
    const number = 1000;
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/foods');
    const button = screen.getByTestId('search-top-btn');
    userEvent.click(button);
    userEvent.type(screen.getByTestId('search-input'), {
      target: { value: 'banana' },
    });
    const ingredientes = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientes);
    const src = screen.getByTestId('exec-search-btn');
    userEvent.click(src);
    setTimeout(() => {
      const image = screen.getByTestId('card-name');
      expect(image[0]).toBeInTheDocument();
    }, number);
  });
});

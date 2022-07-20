import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente AppProvider', () => {
  beforeEach(() => {
    cleanup();
  });
  it('Testa se a mensagem aparece na tela', () => {
    renderWithRouter(<App />);
    const number = 1000;
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const pesquisa = screen.getByTestId('search-top-btn');
    userEvent.click(pesquisa);
    const radio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radio);
    userEvent.type(screen.getByTestId('search-input'), {
      target: { value: 'a' },
    });
    setTimeout(() => {
      const mensage = screen.getByText(
        /Your search must have only 1 (one) character/i,
      );
      expect(mensage).toBeInTheDocument();
    }, number);
  });
  it('Testa se os ingredientes são renderizados na tela', () => {
    const number = 1000;
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
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

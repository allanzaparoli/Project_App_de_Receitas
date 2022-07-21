import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Footer', () => {
  afterEach(() => {
    cleanup();
  });

  it('Testa se os componentes são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/foods');

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('food-bottom-btn');

    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);
    expect(history.location.pathname).toBe('/drinks');
  });

  it('Testa rota de foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const mealIcon = screen.getByTestId('food-bottom-btn');
    userEvent.click(mealIcon);
    expect(history.location.pathname).toBe('/foods');
  });
  it('Teste se a aplicação é redirecionada para a página de Foods', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    userEvent.type(email, 'jmillene12@gmail.com');
    userEvent.type(senha, '1234567');
    const button = screen.getByRole('button', {
      name: /enter/i,
    });
    userEvent.click(button);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/foods');
    // expect(button).toBeInTheDocument();
  });
});

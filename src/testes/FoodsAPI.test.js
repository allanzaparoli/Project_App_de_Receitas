import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';

describe('Testando a API searchFoods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    renderWithRouter(<App />);
  });
  it('Testa se a API está sendo chamada', async () => {
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Testar se as receitas estão aparecendo na tela', async () => {
    const receita = await screen.findByText('Corba');
    expect(receita).toBeInTheDocument();
  });
});

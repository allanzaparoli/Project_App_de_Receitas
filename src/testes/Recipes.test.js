import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa página de Login', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Testa se os componente são renderizados na tela', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);

    waitFor(() => expect(screen.getByTestId(/category-filter/i)).toBeInTheDocument());
    waitFor(() => expect(screen.getByTestId(/recipe-card/i)).toBeInTheDocument());
  });
});

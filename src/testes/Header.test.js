import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';

describe('Testa o componente Header', () => {
  it('Testa se os componente são renderizados na tela', () => {
    const { history } = renderWithRouter(<Foods />);

    const title = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const button = screen.getByText(/perfil/i);

    userEvent.click(button);
    const { pathname } = history.location;

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(pathname).toBe('/profile');
  });
});

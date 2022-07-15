import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';

describe('Testa o componente Header', () => {
  it('Testa se os componente são renderizados na tela', () => {
    const { history } = renderWithRouter(<Foods />);

    const title = screen.getByTestId('page-title');
    const profileIcon = screen.getByAltText('profile');
    const searchIcon = screen.getByAltText('search');
    const button = screen.getByTestId('profile-top-btn');

    userEvent.click(button);
    const { pathname } = history.location;

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(pathname).toBe('/profile');
  });
});

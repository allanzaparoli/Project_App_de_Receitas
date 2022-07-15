import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';

describe('Testa o componente Footer', () => {
  it('Testa se os componentes são renderizados na tela', () => {
    const { history } = renderWithRouter(<Foods />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('food-bottom-btn');

    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    userEvent.click(mealIcon);
    expect(pathname).toBe('/foods');
  });
});

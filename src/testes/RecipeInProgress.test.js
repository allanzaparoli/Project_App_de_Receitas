import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa página de Recipe In Progress', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Testa a rota de foods in progress', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    expect(history.location.pathname).toBe('/foods');

    const preRecipe = await screen.findByText('Corba');
    expect(preRecipe).toBeInTheDocument();

    const buttonRecipe = await screen.getByTestId('0-recipe-card');
    expect(buttonRecipe).toBeInTheDocument();
    userEvent.click(buttonRecipe);

    expect(history.location.pathname).toBe('/foods/52977');
    const startRecipeButton = await screen.findByText('Start Recipe');
    waitFor(() => expect(startRecipeButton).toBeInTheDocument());

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/foods/52977/in-progress');
    expect(screen.getByText('Foods in progress!')).toBeInTheDocument();

    expect(await screen.findByText('Finish Recipe')).toBeInTheDocument();
  });

  it('Testa a rota de drinks in progress', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    expect(history.location.pathname).toBe('/drinks');

    const drinkRecipe = await screen.findByText('GG');
    expect(drinkRecipe).toBeInTheDocument();

    const buttonRecipeDrink = await screen.getByTestId('0-recipe-card');
    expect(buttonRecipeDrink).toBeInTheDocument();
    userEvent.click(buttonRecipeDrink);

    expect(history.location.pathname).toBe('/drinks/15997');
    const startRecipeButton = await screen.findByText('Start Recipe');
    waitFor(() => expect(startRecipeButton).toBeInTheDocument());

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    expect(screen.getByText('Drinks in progress!')).toBeInTheDocument();

    expect(await screen.findByText('Finish Recipe')).toBeInTheDocument();
  });
});

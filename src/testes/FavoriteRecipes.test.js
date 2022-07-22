import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const email = 'email-input';
const senha = 'password-input';
const button = 'login-submit-btn';
const bel = 'bel.terenzi@gmail.com';
const profile = 'profile-top-btn';
const profileFav = 'profile-favorite-btn';
const filterAll = 'filter-by-all-btn';
const filterFood = 'filter-by-food-btn';
const filterDrink = 'filter-by-drink-btn';
const optical = 'Optional alcohol';
const drinkOrdi = 'Ordinary Drink';
const url = 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg';

describe('Testa o componente Favorite Recipes', () => {
  beforeEach(() => {
    cleanup();
  });
  it('Testa clipboard', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'food',
    }]));
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const perfil = screen.getByTestId(profile);
    userEvent.click(perfil);
    const favorite = screen.getByTestId(profileFav);
    userEvent.click(favorite);
    const all = screen.getByTestId(filterAll);
    expect(all).toBeInTheDocument();
    const food = screen.getByTestId(filterFood);
    expect(food).toBeInTheDocument();
    const drink = screen.getByTestId(filterDrink);
    expect(drink).toBeInTheDocument();

    await waitFor(() => {
      const src = screen.getByTestId('0-horizontal-image');
      expect(src).toBeInTheDocument();
    });
    const clipboard = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(clipboard);
    expect(window.navigator.clipboard.writeText).toBeCalledWith('http://localhost:3000/foods/52977');
  });
  it('Testa clipboard', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ alcoholicOrNot:
        optical,
    category: drinkOrdi,
    id: '15997',
    image: url,
    name: 'GG',
    nationality: '',
    type: 'drink',
    }]));
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const perfil = screen.getByTestId(profile);
    userEvent.click(perfil);
    const favorite = screen.getByTestId(profileFav);
    userEvent.click(favorite);
    const all = screen.getByTestId(filterAll);
    expect(all).toBeInTheDocument();
    const food = screen.getByTestId(filterFood);
    expect(food).toBeInTheDocument();
    const drink = screen.getByTestId(filterDrink);
    expect(drink).toBeInTheDocument();

    await waitFor(() => {
      const src = screen.getByTestId('0-horizontal-image');
      expect(src).toBeInTheDocument();
    });
    const clipboard = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(clipboard);
    expect(window.navigator.clipboard.writeText).toBeCalledWith('http://localhost:3000/drinks/15997');
  });
  it('Testar botão de favoritos', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ alcoholicOrNot:
        optical,
    category: drinkOrdi,
    id: '15997',
    image: url,
    name: 'GG',
    nationality: '',
    type: 'drink',
    }]));
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const perfil = screen.getByTestId(profile);
    userEvent.click(perfil);
    const favorite = screen.getByTestId(profileFav);
    userEvent.click(favorite);
    const all = screen.getByTestId(filterAll);
    expect(all).toBeInTheDocument();
    const food = screen.getByTestId(filterFood);
    expect(food).toBeInTheDocument();
    const drink = screen.getByTestId(filterDrink);
    expect(drink).toBeInTheDocument();

    await waitFor(() => {
      const btnFav = screen.getByTestId('0-horizontal-favorite-btn');
      userEvent.click(btnFav);
    });
  });
  it('Testar o filtro All', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ alcoholicOrNot:
        optical,
    category: drinkOrdi,
    id: '15997',
    image: url,
    name: 'GG',
    nationality: '',
    type: 'drink',
    },
    {
      alcoholicOrNot: '',
      category: 'Vegetarian',
      id: '52785',
      image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
      name: 'Dal fry',
      nationality: 'Indian',
      type: 'food',
    },
    ]));
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const perfil = screen.getByTestId(profile);
    userEvent.click(perfil);
    const favorite = screen.getByTestId(profileFav);
    userEvent.click(favorite);
    const all = screen.getByTestId(filterAll);
    expect(all).toBeInTheDocument();
    const food = screen.getByTestId(filterFood);
    expect(food).toBeInTheDocument();
    const drink = screen.getByTestId(filterDrink);
    expect(drink).toBeInTheDocument();
    userEvent.click(all);
    userEvent.click(food);
  });
});
// Ref clipboard https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
// Resolvido também na mentoria

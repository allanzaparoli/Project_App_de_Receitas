import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const email = 'email-input';
const senha = 'password-input';
const button = 'login-submit-btn';
const bel = 'bel.terenzi@gmail.com';
const sr = 'exec-search-btn';
const input = 'search-input';
const top = 'search-top-btn';
const card = '0-card-img';
const responseIngredientBanana = {
  meals: [
    {
      strMeal: 'Banana Pancakes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
      idMeal: '52855',
    },
    {
      strMeal: 'Callaloo Jamaican Style',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ussyxw1515364536.jpg',
      idMeal: '52939',
    },
    {
      strMeal: 'Chocolate Avocado Mousse',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uttuxy1511382180.jpg',
      idMeal: '52853',
    },
  ],
};
  /* const responseDrinks = {
  meals: [

    {
      strDrink: 'Banana Cantaloupe Smoothie',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/uqxqsy1468876703.jpg',
      idDrink: '12708',
    },
    {
      strDrink: 'Banana Daiquiri',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg',
      idDrink: '11064',
    },
    {
      strDrink: 'Banana Strawberry Shake',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vqquwx1472720634.jpg',
      idDrink: '12656',
    },
    {
      strDrink: 'Banana Strawberry Shake Daiquiri',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/uvypss1472720581.jpg',
      idDrink: '12658',
    },
    {
      strDrink: 'Fruit Shake',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/q0fg2m1484430704.jpg',
      idDrink: '12674',
    },
    {
      strDrink: 'Sweet Bananas',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/sxpcj71487603345.jpg',
      idDrink: '12724',
    },
  ],

};
*/
describe('Testa o componente AppProvider', () => {
  beforeEach(() => {
    cleanup();
  });
  it('Testa se a mensagem aparece na tela', async () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(console.log);
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const pesquisa = screen.getByTestId(top);
    userEvent.click(pesquisa);
    const radio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radio);
    userEvent.type(screen.getByTestId(input), 'aa');
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
  });
  it('Testa se os ingredientes são renderizados na tela', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue(
        ({ json: jest.fn().mockResolvedValue(responseIngredientBanana) }),
      );
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const btn = screen.getByTestId(top);
    userEvent.click(btn);
    userEvent.type(screen.getByTestId(input), 'banana');
    const ingredientes = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientes);
    const src = screen.getByTestId(sr);
    userEvent.click(src);
    await waitFor(() => {
      const image = screen.getByTestId(card);
      expect(image).toBeInTheDocument();
    });
  });
  it('Testar o name', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue(
        ({ json: jest.fn().mockResolvedValue(responseIngredientBanana) }),
      );
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const btn = screen.getByTestId(top);
    userEvent.click(btn);
    userEvent.type(screen.getByTestId(input), 'corba');
    const ingredientes = screen.getByTestId('name-search-radio');
    userEvent.click(ingredientes);
    const src = screen.getByTestId(sr);
    userEvent.click(src);
    await waitFor(() => {
      const image = screen.getByTestId(card);
      expect(image).toBeInTheDocument();
    });
  });
  it('Testar o radio latter', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue(
        ({ json: jest.fn().mockResolvedValue(responseIngredientBanana) }),
      );
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(senha);
    const buttonLogin = screen.getByTestId(button);

    userEvent.type(inputEmail, bel);
    userEvent.type(inputSenha, '1234567');
    userEvent.click(buttonLogin);
    const btn = screen.getByTestId(top);
    userEvent.click(btn);
    userEvent.type(screen.getByTestId(input), 'b');
    const ingredientes = screen.getByTestId('first-letter-search-radio');
    userEvent.click(ingredientes);
    const src = screen.getByTestId(sr);
    userEvent.click(src);
    await waitFor(() => {
      const image = screen.getByTestId(card);
      expect(image).toBeInTheDocument();
    });
  });
});

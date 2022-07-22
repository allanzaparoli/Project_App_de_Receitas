/* ##Modelo##
describe('', () => {
  it('', () => {});
});
*/

import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import drinks from '../../cypress/mocks/meals';

describe('Testado os Drinks', () => {
  // const history = createMemoryHistory;
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(drinks),
  //   });
  // });

  it('Testa as funções de Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'bel.terenzi@gmail.com');
    userEvent.type(inputSenha, '1234567');
    // test
    userEvent.click(buttonLogin);

    const buttonDrink = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrink).toBeInTheDocument();
    userEvent.click(buttonDrink);
    expect(history.location.pathname).toBe('/drinks');
    const bebida = await screen.findByText('GG');
    expect(bebida).toBeInTheDocument();
    const optionDrinks = screen.getByTestId('Shake-category-filter');
    expect(optionDrinks).toBeInTheDocument();
    userEvent.click(optionDrinks);
    const florida = await screen.findByText('151 Florida Bushwacker');
    expect(florida).toBeInTheDocument();
  });
});

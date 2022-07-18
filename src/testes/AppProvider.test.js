import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente AppProvider', () => {
  it('Testa se a mensagem aparece na tela', () => {
    renderWithRouter(<App />);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'aa' },
    });
    const mensage = screen.getByText(/Your search must have only 1 (one) character/i);
    expect(mensage).toBeInTheDocument();
  });
});

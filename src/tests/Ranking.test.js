import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
describe('testando a página de ranking', () => {
    test('testando ranking', async () => {
        const ranking = JSON.stringify([{
            name: 'Gabriel',
            score: 250,
            image: '',
        },
        {
            name: 'Pedro',
            score: 600,
            image: '',
        }
        ])
        localStorage.setItem('ranking', ranking);
        const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
        expect(history.location.pathname).toBe('/ranking');
        const player1 = screen.getByTestId('player-name-0');
        const player2 = screen.getByTestId('player-name-1')
        expect(player1).toBeInTheDocument();
        expect(player2).toBeInTheDocument();
        const buttonPlayAgain = screen.getByRole('button', { name: /voltar para login/i })
        expect(buttonPlayAgain).toBeInTheDocument();
        userEvent.click(buttonPlayAgain);
        await waitFor(() => {
            expect(history.location.pathname).toBe('/')
        })
    })
})

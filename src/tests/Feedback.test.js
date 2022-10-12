import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('testando a página de feedback', () => {
    test('testando título da página de feedback', () => {
        renderWithRouterAndRedux(<App />, {}, '/feedback');

        // const feedbackTitle = screen.getByRole('heading', { name: /feedback/i });
        const feedbackText = screen.getByTestId('feedback-text');
        const feedbackScore = screen.getByTestId('feedback-total-score');
        const feedbackAssertions = screen.getByTestId('feedback-total-question');
        const buttonRanking = screen.getByTestId('btn-ranking');
        const buttonPlayAgain = screen.getByTestId('btn-play-again');
        // const text = screen.getByText(/could be better.../i);
        const text = screen.getByTestId('feedback-text');

        // expect(feedbackTitle).toBeInTheDocument();
        expect(feedbackText).toBeInTheDocument();
        expect(feedbackScore).toBeInTheDocument();
        expect(feedbackAssertions).toBeInTheDocument();
        expect(buttonRanking).toBeInTheDocument();
        expect(buttonPlayAgain).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
    test('Verifica se o jogador acertou mais de 3 questões', async() => {
       renderWithRouterAndRedux(<App />, {}, '/game');

        await waitFor(() => { expect(screen.getByTestId('answer-options')).toBeInTheDocument() }, {
            timeout: 4500,
        });
            const respostaCerta = screen.getByTestId('correct-answer');
            expect(respostaCerta).toBeInTheDocument();

            userEvent.click(respostaCerta);

            const botaoNext = screen.getByTestId('btn-next');
            expect(botaoNext).toBeInTheDocument();

            userEvent.click(botaoNext);

            userEvent.click(respostaCerta);
            userEvent.click(botaoNext);

            userEvent.click(respostaCerta);
            userEvent.click(botaoNext);

            userEvent.click(respostaCerta);
            userEvent.click(botaoNext);

            userEvent.click(respostaCerta);
            userEvent.click(botaoNext);

            const text = screen.getByText(/Well Done!/i);
            expect(text).toBeInTheDocument();        
    });

    test('testando se quando clicado botao play again leva para login', async () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

        const buttonPlayAgain = screen.getByTestId('btn-play-again');
        expect(buttonPlayAgain).toBeInTheDocument();

        userEvent.click(buttonPlayAgain);
        expect(history.location.pathname).toBe('/')
    })
    test('testando se quando clicado é levado para a página de ranking', async () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

        const buttonRanking = screen.getByRole('button', { name: /ranking/i });
        expect(buttonRanking).toBeInTheDocument();

        userEvent.click(buttonRanking);
        expect(history.location.pathname).toBe('/ranking');
    })
})
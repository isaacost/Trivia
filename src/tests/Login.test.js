import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
describe('testes da página de Login', () => {
    it('verifica renderização os campos de email e nome', () => {
        renderWithRouterAndRedux(<App />)
        const emailInput = screen.getByTestId('input-gravatar-email');
        expect(emailInput).toBeInTheDocument();
        const nameInput = screen.getByTestId('input-player-name');
        expect(nameInput).toBeInTheDocument();
    })
    it('verifica se botões são renderizados na tela', () => {
        renderWithRouterAndRedux(<App />)
        const buttonPlay = screen.getByRole('button', { name: /play/i });
        expect(buttonPlay).toBeInTheDocument();
        const buttonSettings = screen.getByRole('button', { name: /configurações/i });
        expect(buttonSettings).toBeInTheDocument();
    })
    it('verifica se botão Play é habilidado após campos inputs serem preenchidos', () => {
        renderWithRouterAndRedux(<App />)
        const buttonPlay = screen.getByRole('button', { name: /play/i });
        expect(buttonPlay).toBeDisabled();
        const emailInput = screen.getByTestId('input-gravatar-email');
        const nameInput = screen.getByTestId('input-player-name');
        userEvent.type(emailInput, 'teste@test.com');
        userEvent.type(nameInput, 'Athanes');
        expect(emailInput).toHaveValue('teste@test.com');
        expect(nameInput).toHaveValue('Athanes');
        expect(buttonPlay).toBeEnabled();
    })
    it('verifica se ao clicar nos botões as rotas estão corretas', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const buttonPlay = screen.getByTestId('btn-play');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const nameInput = screen.getByTestId('input-player-name');

        userEvent.type(emailInput, 'teste@test.com');
        userEvent.type(nameInput, 'Athanes');
        userEvent.click(buttonPlay);

        await waitFor(() => { expect(history.location.pathname).toBe('/game') }, {
            timeout: 3000,
            onTimeout: () => { expect(history.location.pathname).toBe('/') },
        });
    })
    it('verifica se a rota muda ao clicar no botão settings', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const buttons = screen.getAllByRole('button');

        userEvent.click(buttons[1]);

        const { pathname } = history.location;
        expect(pathname).toBe('/settings');
    })
});
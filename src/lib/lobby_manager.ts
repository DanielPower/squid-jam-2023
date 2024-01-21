import { nanoid } from 'nanoid';
import { createGame, type TicTacToePlayerView, type TicTacToeState } from './games/TicTacToe';
import type { Game } from './game';

export const lobbies = new Map<string, Game<TicTacToeState, TicTacToePlayerView>>();

export const createLobby = () => {
	const lobbyId = nanoid();
	const game = createGame();
	lobbies.set(lobbyId, game);
	return lobbyId;
};

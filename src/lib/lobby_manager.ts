import { nanoid } from 'nanoid';
import { createGame } from './games/TicTacToe';
import type { Game } from './game';

export const lobbies = new Map<string, Game<any, any>>();

export const createLobby = () => {
	const lobbyId = nanoid();
	const game = createGame();
	lobbies.set(lobbyId, game);
	return lobbyId;
};

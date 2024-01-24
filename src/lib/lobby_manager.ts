import { nanoid } from 'nanoid';
import { ticTacToe } from './games/TicTacToe';
import type { ValueOf } from '../utility_types';

export const games = { ticTacToe };
export const lobbies = new Map<string, ReturnType<ValueOf<typeof games>>>();

export const createLobby = (game: keyof typeof games) => {
	const lobbyId = nanoid();
	const lobby = games[game]();
	lobbies.set(lobbyId, lobby);
	console.log(`Lobby created: ${lobbyId}`);
	return lobbyId;
};

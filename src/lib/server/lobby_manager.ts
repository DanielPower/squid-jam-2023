import { nanoid } from 'nanoid';
import { tictactoe } from '../games/tictactoe';
import { squidChess } from '../games/squid_chess';

export const games = { tictactoe, squidChess };
export const lobbies = new Map<string, { gameMode: string; game: any }>();

export const createLobby = (gameMode: string) => {
	const lobbyId = nanoid();
	console.log(gameMode);
	if (!(gameMode in games)) {
		throw new Error(`Unknown game mode: ${gameMode}`);
	}
	const game = games[gameMode as keyof typeof games]();
	lobbies.set(lobbyId, { gameMode, game });
	console.log(`Lobby created: ${lobbyId}`);
	return lobbyId;
};

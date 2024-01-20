import { TicTacToe } from '$lib/games/TicTacToe';
import { createRequire } from 'module';
import type { Server as ServerType } from 'boardgame.io/server';

const require = createRequire(import.meta.url);
const { Server, Origins } = require('boardgame.io/server');

export const server: typeof ServerType = Server({
	games: [TicTacToe],
	origins: [Origins.LOCALHOST]
});

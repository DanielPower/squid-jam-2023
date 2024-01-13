import { Client } from 'boardgame.io/client';
import type { Game } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';
import { writable } from 'svelte/store';

const LINES = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

export interface TicTacToeState {
	cells: (string | null)[];
	winner: string | null;
}

export const TicTacToe: Game<TicTacToeState> = {
	setup: () => ({
		cells: Array(9).fill(null),
		winner: null
	}),
	moves: {
		clickCell: ({ G, playerID }, id: number) => {
			if (G.cells[id] !== null) {
				return INVALID_MOVE;
			}
			G.cells[id] = playerID;
		}
	},
	turn: {
		minMoves: 1,
		maxMoves: 1
	},
	endIf: ({ G, ctx }) => {
		for (const line of LINES) {
			if (line.every((cell) => G.cells[cell] === ctx.currentPlayer)) {
				return { winner: ctx.currentPlayer };
			}
		}
		if (G.cells.every((cell) => cell !== null)) {
			return { draw: true };
		}
	}
};

export const gameClient = Client({ game: TicTacToe });
export const gameState = writable(gameClient.getState()!);
gameClient.subscribe((newState) => gameState.set(newState!));
gameClient.start();

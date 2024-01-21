import type { Game } from '$lib/game';

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

export type TicTacToeState = {
	cells: (number | null)[];
	winner: string | null;
	currentPlayer: number;
};

export type TicTacToePlayerView = TicTacToeState;

const checkWin = (state: TicTacToeState) => {
	for (const line of LINES) {
		if (line.every((cell) => state.cells[cell] === state.currentPlayer)) {
			return { winner: state.currentPlayer };
		}
	}
	if (state.cells.every((cell) => cell !== null)) {
		return { draw: true };
	}
};

export const createGame = (): Game<TicTacToeState, TicTacToePlayerView> => {
	type Listener = (view: TicTacToePlayerView) => void;
	const listeners = new Set<[number, Listener]>();
	let state: TicTacToeState = {
		currentPlayer: 0,
		cells: Array(9).fill(null),
		winner: null
	};
	const getPlayerView = (playerId: number) => state;
	const getPlayerActions = (playerId: number) => {
		if (playerId !== state.currentPlayer) {
			return {
				takeCell: (id: number) => {
					if (state.cells[id] !== null) {
						return;
					}
					state.cells[id] = playerId;
				}
			};
		}
		return {};
	};
	const subscribe = (playerId: number, listener: () => void) => {
		listeners.add([playerId, listener]);
	};
	const getState = () => state;
	const setState = (newState: TicTacToeState) => {
		state = newState;
		for (const [playerId, listener] of listeners) {
			listener(getPlayerView(playerId));
		}
	};

	return {
		getState,
		setState,
		subscribe,
		getPlayerActions,
		getPlayerView
	};
};

import type { Game } from '$lib/game';
import { nanoid } from 'nanoid';
import { create } from 'mutative';

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
	cells: Array<string | null>;
	winner: string | null;
	users: Array<string>;
	turnIndex: number;
	messages: Array<{
		user: string;
		message: string;
	}>;
};

export type TicTacToePlayerView = TicTacToeState;

const currentPlayer = (state: TicTacToeState) => state.users[state.turnIndex];

const checkWin = (state: TicTacToeState) => {
	for (const line of LINES) {
		if (line.every((cell) => state.cells[cell] === currentPlayer(state))) {
			return { winner: currentPlayer(state) };
		}
	}
	if (state.cells.every((cell) => cell !== null)) {
		return { draw: true };
	}
};

export const createGame = (): Game<TicTacToeState, TicTacToePlayerView> => {
	type Listener = (view: TicTacToePlayerView) => void;
	const listeners = new Set<[string, Listener]>();
	let state: TicTacToeState = {
		turnIndex: 0,
		cells: Array(9).fill(null),
		users: [],
		winner: null,
		messages: [{ user: 'server', message: 'Waiting for players' }]
	};
	const getUserView = (userId: string) => state; // All information is public in TicTacToe
	const getUserActions = (userId: string) => {
		if (userId !== currentPlayer(state)) {
			return {
				takeCell: (id: number) => (newState: TicTacToeState) => {
					if (state.cells[id] !== null) {
						return;
					}
					newState.cells[id] = userId;
					newState.turnIndex = (state.turnIndex + 1) % 2;
				}
			};
		}
		return {};
	};
	const subscribe = (userId: string, listener: () => void) => {
		listeners.add([userId, listener]);
	};
	const getState = () => state;
	const setState = (newState: TicTacToeState) => {
		state = newState;
		for (const [userId, listener] of listeners) {
			listener(getUserView(userId));
		}
	};
	const updateState = (reducer: (state: TicTacToeState) => void) => {
		setState(create(state, reducer));
	};
	const addUser = () => {
		const userId = nanoid();
		const message =
			state.users.length < 2
				? `User ${userId} has joined as player ${state.users.length + 1}.`
				: `User ${userId} has joined as a spectator.`;
		updateState((newState) => {
			newState.messages.push({ user: 'server', message });
			newState.users.push(userId);
		});
		return userId;
	};

	return {
		getState,
		setState,
		subscribe,
		getUserActions,
		getUserView,
		addUser
	};
};

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
	[2, 4, 6],
];

export type TicTacToeState = {
	cells: Array<string | null>;
	winner: string | null;
	gameover: boolean;
	users: Array<string>;
	turnIndex: number;
	messages: Array<{
		userId: string;
		message: string;
	}>;
};

export type TicTacToePlayerView = TicTacToeState;

// Queries
const currentUser = (state: TicTacToeState) => state.users[state.turnIndex];

// Action utilities
const checkWin = (draft: TicTacToeState) => {
	for (const line of LINES) {
		if (line.every((cell) => draft.cells[cell] === currentUser(draft))) {
			draft.gameover = true;
			draft.winner = currentUser(draft);
			return { winner: currentUser(draft) };
		}
	}
	if (draft.cells.every((cell) => cell !== null)) {
		draft.gameover = true;
	}
};

const passTurn = (draft: TicTacToeState) => {
	draft.turnIndex = (draft.turnIndex + 1) % 2;
};

export const createGame = (): Game<TicTacToeState, TicTacToePlayerView> => {
	type Listener = (view: TicTacToePlayerView) => void;
	const listeners = new Set<[string, Listener]>();
	let state: TicTacToeState = {
		turnIndex: 0,
		cells: Array(9).fill(null),
		users: [],
		winner: null,
		gameover: false,
		messages: [{ userId: 'server', message: 'Waiting for players' }],
	};
	const getUserView = () => state; // All information is public in TicTacToe
	const getUserActions = (userId: string) => {
		if (userId !== currentUser(state) || state.gameover) {
			return {};
		}
		return {
			takeCell:
				({ cellId }: { cellId: number }) =>
				(draft: TicTacToeState) => {
					if (state.cells[cellId] !== null) {
						return state;
					}
					draft.cells[cellId] = userId;
					checkWin(draft);
					passTurn(draft);
				},
			sendMessage: (message: string) => (draft: TicTacToeState) => {
				draft.messages.push({ userId, message });
			},
		};
	};
	const subscribe = (userId: string, listener: () => void) => {
		listeners.add([userId, listener]);
	};
	const getState = () => state;
	const setState = (newState: TicTacToeState) => {
		state = newState;
		for (const [, listener] of listeners) {
			listener(getUserView());
		}
	};
	const updateState = (reducer: (state: TicTacToeState) => void) => {
		setState(create(state, reducer, { strict: true }));
	};
	const addUser = () => {
		const userId = nanoid();
		const message =
			state.users.length < 2
				? `User ${userId} has joined as player ${state.users.length + 1}.`
				: `User ${userId} has joined as a spectator.`;
		updateState((draft) => {
			draft.messages.push({ userId: 'server', message });
			draft.users.push(userId);
		});
		return userId;
	};

	return {
		getState,
		setState,
		updateState,
		subscribe,
		getUserActions,
		getUserView,
		addUser,
	};
};

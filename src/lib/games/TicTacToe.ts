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

const PLAYER_SYMBOL = ['O', 'X'];

export type TicTacToeState = {
	cells: Array<string | null>;
	winner: string | null;
	gameover: boolean;
	users: Array<string>;
	players: Array<string>;
	turnIndex: number;
	messages: Array<{
		userId: string;
		message: string;
	}>;
};

export type TicTacToePlayerView = TicTacToeState;

// Queries
const currentUser = (state: TicTacToeState) => state.players[state.turnIndex];

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
	type Listener = readonly [string, (view: TicTacToePlayerView) => void];
	const listeners = new Set<Listener>();
	let state: TicTacToeState = {
		turnIndex: 0,
		cells: Array(9).fill(null),
		users: [],
		players: [],
		winner: null,
		gameover: false,
		messages: [{ userId: 'server', message: 'Waiting for players' }],
	};
	const getUserView = () => state; // All information is public in TicTacToe
	const getUserActions = (userId: string) => {
		return {
			...(userId === currentUser(state) && {
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
			}),
			...(state.players.length < 2 &&
				!state.players.includes(userId) && {
					becomePlayer: () => (draft: TicTacToeState) => {
						draft.messages.push({
							userId: 'server',
							message: `${userId} is now playing as ${PLAYER_SYMBOL[draft.players.length]}`,
						});
						draft.players.push(userId);
					},
				}),
			sendMessage: (message: string) => (draft: TicTacToeState) => {
				draft.messages.push({ userId, message });
			},
		};
	};
	const subscribe = (userId: string, callback: (state: TicTacToeState) => void) => {
		const listener = [userId, callback] as const;
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
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
		updateState((draft) => {
			draft.messages.push({ userId: 'server', message: `User ${userId} has joined.` });
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

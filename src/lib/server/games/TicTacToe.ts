import { createGame } from '$lib/server/game';
import type { Draft } from 'mutative';

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

export type TicTacToeActions = {
	takeCell: (args: { cellId: number }) => (state: Draft<TicTacToeState>) => void;
	becomePlayer: () => (state: Draft<TicTacToeState>) => void;
	sendMessage: (args: { message: string }) => (state: Draft<TicTacToeState>) => void;
};

const initialState: TicTacToeState = {
	turnIndex: 0,
	cells: Array(9).fill(null),
	users: [],
	players: [],
	winner: null,
	gameover: false,
	messages: [{ userId: 'server', message: 'Waiting for players' }],
};

const getUserView = (userId: string, state: TicTacToeState) => state; // All information is public in TicTacToe
const getUserActions = (userId: string, state: TicTacToeState): TicTacToeActions => {
	const currentPlayer = state.players[state.turnIndex];
	return {
		takeCell:
			({ cellId }: { cellId: number }) =>
			(draft: TicTacToeState) => {
				if (draft.gameover || currentPlayer !== userId || state.cells[cellId] !== null) {
					return;
				}
				if (draft.cells.every((cell) => cell !== null)) {
					draft.gameover = true;
					return;
				}
				draft.cells[cellId] = userId;
				for (const line of LINES) {
					if (line.every((cell) => draft.cells[cell] === currentPlayer)) {
						draft.gameover = true;
						draft.winner = currentPlayer;
						return;
					}
				}
				draft.turnIndex = (draft.turnIndex + 1) % 2;
			},
		becomePlayer: () => (draft: TicTacToeState) => {
			draft.messages.push({
				userId: 'server',
				message: `${userId} is now playing as ${PLAYER_SYMBOL[draft.players.length]}`,
			});
			draft.players.push(userId);
		},
		sendMessage:
			({ message }: { message: string }) =>
			(draft: TicTacToeState) => {
				draft.messages.push({ userId, message });
			},
	};
};
const onUserJoin = (userId: string) => (draft: TicTacToeState) => {
	draft.messages.push({ userId: 'server', message: `${userId} has joined.` });
	draft.users.push(userId);
};

export const ticTacToe = () => createGame(initialState, getUserView, getUserActions, onUserJoin);

import { createGame } from '$lib/server/game';

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

export type SquidChessState = {
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

const initialState: SquidChessState = {
	turnIndex: 0,
	cells: Array(9).fill(null),
	users: [],
	players: [],
	winner: null,
	gameover: false,
	messages: [{ userId: 'server', message: 'Waiting for players' }],
};

const getUserView = (userId: string, state: SquidChessState) => ({
	userId,
	...state,
});

export type SquidChessUserView = ReturnType<typeof getUserView>;

const getUserActions = (userId: string, state: SquidChessState) => {
	const currentPlayer = state.players[state.turnIndex];
	return {
		takeCell:
			({ cellId }: { cellId: number }) =>
			(draft: SquidChessState) => {
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
		becomePlayer: () => (draft: SquidChessState) => {
			draft.messages.push({
				userId: 'server',
				message: `${userId} is now playing as ${PLAYER_SYMBOL[draft.players.length]}`,
			});
			draft.players.push(userId);
		},
		sendMessage:
			({ message }: { message: string }) =>
			(draft: SquidChessState) => {
				draft.messages.push({ userId, message });
			},
	};
};

export type SquidChessActions = ReturnType<typeof getUserActions>;

const onUserJoin = (userId: string) => (draft: SquidChessState) => {
	draft.messages.push({ userId: 'server', message: `${userId} has joined.` });
	draft.users.push(userId);
};

export const squidChess = () => createGame(initialState, getUserView, getUserActions, onUserJoin);

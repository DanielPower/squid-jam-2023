import { createGame } from '$lib/server/game';
import { makeGridUtils } from '$lib/util/grid';

const { toIndex } = makeGridUtils(7);

export type Pawn = {
	owner: 'white' | 'black';
	type: 'pawn';
};

export type King = {
	owner: 'white' | 'black';
	type: 'king';
};

export type Queen = {
	owner: 'white' | 'black';
	type: 'queen';
};

export type Rook = {
	owner: 'white' | 'black';
	type: 'rook';
};

export type Bishop = {
	owner: 'white' | 'black';
	type: 'bishop';
};

export type Knight = {
	owner: 'white' | 'black';
	type: 'knight';
};

export type Squid = {
	owner: 'white' | 'black';
	type: 'squid';
};

export type Wall = {
	type: 'wall';
};

export type Empty = {
	type: 'empty';
};

export type TPiece = Pawn | King | Queen | Rook | Bishop | Knight | Squid | Wall | Empty;

export type Card = {
	type: 'move' | 'attack' | 'defend' | 'special';
};

const makeInitialBoard = () => {
	const board: TPiece[] = Array(49).fill({ type: 'empty' });
	board[toIndex(3, 0)] = { type: 'king', owner: 'white' };
	board[toIndex(2, 1)] = { type: 'pawn', owner: 'white' };
	board[toIndex(3, 1)] = { type: 'pawn', owner: 'white' };
	board[toIndex(4, 1)] = { type: 'pawn', owner: 'white' };
	board[toIndex(2, 5)] = { type: 'pawn', owner: 'black' };
	board[toIndex(3, 5)] = { type: 'pawn', owner: 'black' };
	board[toIndex(4, 5)] = { type: 'pawn', owner: 'black' };
	board[toIndex(3, 6)] = { type: 'king', owner: 'black' };
	return board;
};

export type SquidChessState = {
	players: {
		black: {
			hand: Card[];
			userId: string | null;
		};
		white: {
			hand: Card[];
			userId: string | null;
		};
	};
	currentPlayer: 'white' | 'black';
	board: Array<TPiece>;
	winner: string | null;
	gameover: boolean;
	users: Array<string>;
	messages: Array<{
		userId: string;
		message: string;
	}>;
};

const initialState: SquidChessState = {
	players: {
		black: {
			hand: [],
			userId: null,
		},
		white: {
			hand: [{ type: 'move' }, { type: 'move' }],
			userId: null,
		},
	},
	currentPlayer: 'white',
	board: makeInitialBoard(),
	users: [],
	winner: null,
	gameover: false,
	messages: [{ userId: 'server', message: 'Waiting for players' }],
};

const getUserView = (userId: string, state: SquidChessState) => ({
	userId,
	...state,
});

export type SquidChessUserView = ReturnType<typeof getUserView>;

const getUserActions = (userId: string) => {
	return {
		becomePlayer:
			({ color }: { color: 'black' | 'white' }) =>
			(draft: SquidChessState) => {
				if (draft.players[color].userId !== null) return;
				draft.messages.push({
					userId: 'server',
					message: `${userId} is now playing as ${color}`,
				});
				draft.players[color].userId = userId;
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

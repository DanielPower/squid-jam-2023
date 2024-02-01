import { createGame } from '$lib/game';
import { makeGridUtils } from '$lib/util/grid';

const { toIndex } = makeGridUtils(7);

export type UnitCard = {
	type: 'unit';
	unit: (owner: 'black' | 'white') => Pawn | King | Queen | Rook | Bishop | Knight | Squid;
	legalMoves: (board: Array<TPiece>, x: number, y: number) => Array<[number, number]>;
};

export type SpellCard = {
	type: 'spell';
	spell: 'swap' | 'teleport' | 'wall';
};

export type HiddenCard = {
	type: 'hidden';
};

export type Card = { title: string } & (UnitCard | SpellCard | HiddenCard);

export const cards: { [key: string]: Card } = {
	pawn: {
		title: 'Pawn',
		type: 'unit',
		unit: (owner) => ({
			type: 'pawn',
			owner,
		}),
		legalMoves: (board, x, y) => {
			const self = board[toIndex(x, y)] as Pawn;
			const moves: Array<[number, number]> = [];
			let direction = 1;
			if (self.owner === 'black') {
				direction = -1;
			}
			const ahead = board[toIndex(x, y + direction)];
			const aheadLeft = board[toIndex(x - 1, y + direction)];
			const aheadRight = board[toIndex(x + 1, y + direction)];
			if (ahead.type === 'empty') {
				moves.push([x, y + direction]);
			}
			if ('owner' in aheadLeft && aheadLeft.owner === 'black') {
				moves.push([x - 1, y - 1]);
			}
			if ('owner' in aheadRight && aheadRight.owner === 'black') {
				moves.push([x + 1, y - 1]);
			}
			return moves;
		},
	},
};

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
	board[toIndex(1, 3)] = { type: 'wall' };
	board[toIndex(3, 3)] = { type: 'wall' };
	board[toIndex(5, 3)] = { type: 'wall' };
	return board;
};

export type SquidChessState = {
	players: {
		black: {
			hand: Card[];
			userId: string | null;
			hoveredCard: number | null;
			selectedCard: number | null;
		};
		white: {
			hand: Card[];
			userId: string | null;
			hoveredCard: number | null;
			selectedCard: number | null;
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
			hand: [cards.pawn],
			userId: null,
			hoveredCard: null,
			selectedCard: null,
		},
		white: {
			hand: [cards.pawn, cards.pawn, cards.pawn],
			userId: null,
			hoveredCard: null,
			selectedCard: null,
		},
	},
	currentPlayer: 'white',
	board: makeInitialBoard(),
	users: [],
	winner: null,
	gameover: false,
	messages: [{ userId: 'server', message: 'Waiting for players' }],
};

export type SquidChessUserView = SquidChessState & {
	userId: string;
};

const getUserView = (userId: string, state: SquidChessState) => ({
	...state,
	userId: userId,
	players: {
		white: {
			...state.players.white,
			hand: state.players.white.hand.map((card) =>
				userId === state.players.white.userId ? card : { type: 'hidden' },
			),
		},
		black: {
			...state.players.black,
			hand: state.players.black.hand.map((card) =>
				userId === state.players.black.userId ? card : { type: 'hidden' },
			),
		},
	},
});

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
		hoverCard:
			({ cardId }: { cardId: number }) =>
			(draft: SquidChessState) => {
				const color = qUserColor(userId)(draft);
				if (!color) return;
				draft.players[color].hoveredCard = cardId;
			},
		sendMessage:
			({ message }: { message: string }) =>
			(draft: SquidChessState) => {
				draft.messages.push({ userId, message });
			},
	};
};

// Queries
export const qUserColor = (userId: string) => (state: SquidChessState) => {
	if (state.players.white.userId === userId) return 'white';
	if (state.players.black.userId === userId) return 'black';
	return null;
};

export const myColor = (state: SquidChessUserView) => qUserColor(state.userId)(state);

export type SquidChessActions = ReturnType<typeof getUserActions>;

const onUserJoin = (userId: string) => (draft: SquidChessState) => {
	draft.messages.push({ userId: 'server', message: `${userId} has joined.` });
	draft.users.push(userId);
};

export const squidChess = () => createGame(initialState, getUserView, getUserActions, onUserJoin);

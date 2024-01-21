export type Game<T, J> = {
	getState: () => T;
	setState: (state: T) => void;
	subscribe: (playerId: number, listener: () => void) => void;
	getPlayerActions: (playerId: number) => any;
	getPlayerView: (playerId: number) => J;
};

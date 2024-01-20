export type Game<T, J> = {
	actions: any;
	getState: () => T;
	setState: (state: T) => void;
	subscribe: (playerId: number, listener: () => void) => void;
	getPlayerView: (playerId: number) => J;
};

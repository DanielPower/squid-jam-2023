export type Game<T, J> = {
	getState: () => T;
	setState: (state: T) => void;
	updateState: (updater: (state: T) => T) => void;
	subscribe: (userId: string, listener: () => void) => void;
	getUserActions: (userId: string) => any;
	getUserView: (userId: string) => J;
	addUser: () => string;
};

import { create, type Draft } from 'mutative';

export const createGame = <
	State extends object,
	PlayerView extends object,
	Actions extends Record<string, (args: any) => (state: Draft<State>) => void>,
>(
	initialState: State,
	getUserView: (userId: string, state: State) => PlayerView,
	getUserActions: (userId: string, state: State) => Actions,
	onUserJoin: (userId: string) => (draft: Draft<State>) => void,
) => {
	let state = initialState;
	const listeners = new Set<readonly [string, (view: PlayerView) => void]>();
	const getState = () => state;
	const updateState = (updater: (draft: Draft<State>) => void) => {
		state = create(state, updater, { strict: true });
		for (const [userId, listener] of listeners) {
			listener(getUserView(userId, state));
		}
	};
	const subscribe = (userId: string, callback: (state: PlayerView) => void) => {
		const listener = [userId, callback] as const;
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	};
	const addUser = (userId: string) => {
		updateState(onUserJoin(userId));
	};
	return {
		getState,
		updateState,
		subscribe,
		addUser,
		getUserActions: (userId: string) => getUserActions(userId, state),
		getUserView: (userId: string) => getUserView(userId, state),
	};
};

import { writable } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, data }) => {
	return {
		...(await parent()),
		...data,
		gameState: writable(data.initialPlayerView)
	};
};

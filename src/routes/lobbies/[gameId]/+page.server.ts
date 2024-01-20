import type { PageServerLoad } from './$types';
import { lobbies } from '$lib/lobby_manager';

export const load: PageServerLoad = ({ params }) => {
	return {
		playerID: '0',
		gameID: params.gameId,
		initialPlayerView: lobbies.get(params.gameId).getPlayerView(0)
	};
};

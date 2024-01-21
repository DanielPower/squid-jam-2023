import type { PageServerLoad } from './$types';
import { lobbies } from '$lib/lobby_manager';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ params }) => {
	const lobby = lobbies.get(params.gameId);
	if (!lobby) {
		redirect(301, '/');
	}
	return {
		playerID: '0',
		gameID: params.gameId,
		initialPlayerView: lobby.getPlayerView(0)
	};
};

import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lobbies } from '$lib/server/lobby_manager';

export const GET: RequestHandler = ({ params, locals }) => {
	const userId = locals.session.data.userIds[params.gameId];
	if (!userId) {
		return error(404);
	}
	const lobby = lobbies.get(params.gameId);
	if (!lobby) {
		return error(404);
	}
	return json(lobby.game.getUserView(userId));
};

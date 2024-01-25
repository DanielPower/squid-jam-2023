import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lobbies } from '$lib/server/lobby_manager';

export const GET: RequestHandler = ({ params, locals }) => {
	const userId = locals.session.data.userIds[params.gameId];
	if (!userId) {
		return error(404);
	}
	const game = lobbies.get(params.gameId);
	if (!game) {
		return error(404);
	}
	return json(game.getUserView(userId));
};

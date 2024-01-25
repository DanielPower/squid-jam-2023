import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lobbies } from '$lib/server/lobby_manager';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const userId = locals.session.data.userIds[params.gameId];
	if (!userId) {
		return error(404);
	}
	const game = lobbies.get(params.gameId);
	if (!game) {
		return error(404);
	}
	const { action, ...args } = await request.json();
	console.log(args);
	const actions = game.getUserActions(userId);
	if (!(action in actions)) {
		return json('Action not available', { status: 400 });
	}
	const updater = actions[action as keyof typeof actions]!(args);
	game.updateState(updater);
	return json('Success');
};

import type { PageServerLoad } from './$types';
import { lobbies } from '$lib/lobby_manager';
import { redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const load: PageServerLoad = async ({ params, locals }) => {
	const lobby = lobbies.get(params.gameId);
	if (!lobby) {
		redirect(301, '/');
	}
	let userId = locals.session.data?.userIds?.[params.gameId];
	if (!userId) {
		userId = nanoid();
		lobby.addUser(userId);
		await locals.session.update(({ userIds }) => ({
			userIds: {
				...userIds,
				[params.gameId]: userId,
			},
		}));
	}
	return {
		userId,
		gameId: params.gameId,
		initialPlayerView: lobby.getUserView(userId),
	};
};

import { createLobby } from '$lib/server/lobby_manager';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	new: async ({ request }) => {
		const data = await request.formData();
		const gameMode = data.get('gameMode') as string;
		const lobbyId = createLobby(gameMode);
		console.log('redirect?', lobbyId);
		redirect(302, `/lobbies/${lobbyId}`);
	},
};

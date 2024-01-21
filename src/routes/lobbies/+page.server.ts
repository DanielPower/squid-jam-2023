import { createLobby } from '$lib/lobby_manager';
import { redirect } from '@sveltejs/kit';

export const actions = {
	new: async () => {
		const lobbyId = createLobby();
		redirect(302, `/lobbies/${lobbyId}`);
	}
};
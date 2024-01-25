import { createLobby } from '$lib/server/lobby_manager';
import { redirect } from '@sveltejs/kit';

export const actions = {
	new: async () => {
		const lobbyId = createLobby('ticTacToe');
		redirect(302, `/lobbies/${lobbyId}`);
	},
};

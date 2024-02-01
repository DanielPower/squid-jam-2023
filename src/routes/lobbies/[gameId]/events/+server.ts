import { lobbies } from '$lib/server/lobby_manager';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { TicTacToeUserView } from '$lib/games/tictactoe';

// BAD This is awful and probably causes resource leaks because I'm not timing out connections.
export const GET: RequestHandler = ({ params, locals }) => {
	const lobby = lobbies.get(params.gameId);
	if (!lobby) {
		error(404, 'Game not found');
	}
	const userId = locals.session.data.userIds[params.gameId];
	if (!userId) {
		error(403, 'Invalid user');
	}
	let unsubscribe: () => void;
	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		start: (controller) => {
			unsubscribe = lobby.game.subscribe(userId, (state: TicTacToeUserView) => {
				controller.enqueue(encoder.encode(JSON.stringify(state)));
			});
		},
		cancel: () => {
			unsubscribe();
		},
	});
	return new Response(stream, {
		headers: {
			'content-type': 'text/event-stream',
		},
	});
};

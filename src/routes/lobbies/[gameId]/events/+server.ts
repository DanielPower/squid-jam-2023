import { lobbies } from '$lib/server/lobby_manager';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { TicTacToeState } from '$lib/server/games/TicTacToe';

// BAD This is awful and probably causes resource leaks because I'm not timing out connections.
export const GET: RequestHandler = ({ params, locals }) => {
	const game = lobbies.get(params.gameId);
	if (!game) {
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
			unsubscribe = game.subscribe(userId, (state: TicTacToeState) => {
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

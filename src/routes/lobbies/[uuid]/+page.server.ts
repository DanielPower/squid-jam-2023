import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		playerID: '0',
		gameID: params.uuid,
		initialState: { ctx: { gameover: {} } }
	};
};

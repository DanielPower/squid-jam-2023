import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession({
	secret: 'SOME_COMPLEX_SECRET_32_CHARSLONG',
	rolling: 50,
});

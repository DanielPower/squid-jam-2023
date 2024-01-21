// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session } from 'svelte-kit-cookie-session';

type SessionData = {
	userIds: { [lobbyId: string]: string };
};

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session<SessionData>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

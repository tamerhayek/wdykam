// See https://svelte.dev/docs/kit/types#app.d.ts

import type { TypedPocketBase } from '$lib/types/pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			participant: {
				id: string;
				name: string;
				avatar: string;
			} | null;
			pb: TypedPocketBase;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

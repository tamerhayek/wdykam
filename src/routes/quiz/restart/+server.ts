import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	cookies.delete('participant_id', {
		path: '/',
		secure: false
	});

	locals.participant = null;

	redirect(302, '/quiz');
};

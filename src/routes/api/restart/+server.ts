import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	cookies.delete('participant_id', {
		path: '/',
		secure: false
	});

	locals.participant = null;

	return json({ success: true });
};

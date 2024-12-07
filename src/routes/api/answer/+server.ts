import { DB_ERROR, GENERIC_ERROR, MISSING_PARAMS, NOT_FOUND, UNAUTHORIZED } from '$lib/constants';
import { Collections } from '$lib/types/pocketbase';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ locals, request }) => {
	if (!locals.participant)
		return error(401, {
			message: UNAUTHORIZED
		});

	const data = await request.json();

	const { answer, related_question } = data;

	if (!answer || !related_question)
		return error(400, {
			message: MISSING_PARAMS
		});

	try {
		const record = await locals.pb
			.collection(Collections.Answers)
			.create({ participant: locals.participant.id, answer, related_question });

		return json({ success: true, id: record.id });
	} catch (e) {
		console.error(e);
		if (e instanceof ClientResponseError) {
			if (e.status === 404) error(404, { message: NOT_FOUND });
			if (e.status === 400) error(400, { message: GENERIC_ERROR });
			error(500, { message: DB_ERROR });
		}
		error(500, { message: GENERIC_ERROR });
	}
};

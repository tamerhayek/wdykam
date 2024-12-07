import { ALREADY_EXISTS, DB_ERROR, GENERIC_ERROR, MISSING_PARAMS, NOT_FOUND } from '$lib/constants';
import { Collections } from '$lib/types/pocketbase';
import { error, json } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ locals, request, cookies }) => {
	const data = await request.formData();

	const name = data.get('name');
	const avatar = data.get('avatar');

	if (!name || !avatar)
		return error(400, {
			message: MISSING_PARAMS
		});

	try {
		const record = await locals.pb.collection(Collections.Participants).create({ name, avatar });

		locals.participant = {
			id: record.id,
			name: record.name,
			avatar: record.avatar
		};

		cookies.set('participant_id', record.id, {
			path: '/',
			secure: false
		});

		return json({ success: true, id: record.id });
	} catch (e) {
		console.error(e);
		if (e instanceof ClientResponseError) {
			if (e.status === 404) error(404, { message: NOT_FOUND });
			if (e.status === 400) error(401, { message: ALREADY_EXISTS });
			error(500, { message: DB_ERROR });
		}
		error(500, { message: GENERIC_ERROR });
	}
};

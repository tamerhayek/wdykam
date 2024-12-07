import { env } from '$env/dynamic/private';
import { Collections, type TypedPocketBase } from '$lib/types/pocketbase';
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import PocketBase from 'pocketbase';

const pocketbaseHandle: Handle = async ({ event, resolve }) => {
	event.locals.participant = null;
	event.locals.pb = new PocketBase(env.PB_INSTANCE_URL) as TypedPocketBase;

	const participantId = event.cookies.get('participant_id');
	if (participantId) {
		try {
			const currentParticipant = await event.locals.pb
				.collection(Collections.Participants)
				.getOne(participantId);

			event.locals.participant = {
				id: currentParticipant.id,
				name: currentParticipant.name,
				avatar: currentParticipant.avatar
			};
		} catch (e) {
			console.error(e);
			event.locals.participant = null;
			event.cookies.delete('participant_id', {
				path: '/',
				secure: false
			});
		}
	}

	return await resolve(event);
};

export const handle = sequence(pocketbaseHandle);

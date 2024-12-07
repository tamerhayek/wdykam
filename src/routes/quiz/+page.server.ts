import { Collections } from '$lib/types/pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, depends }) => {
	depends(Collections.Participants);
	depends(Collections.Questions);
	depends(Collections.Answers);

	const questions = await locals.pb.collection(Collections.Questions).getFullList({
		sort: 'index'
	});

	const answers = await locals.pb.collection(Collections.Answers).getFullList({
		sort: '-created'
	});

	return {
		participant: locals.participant,
		questions,
		answers
	};
}) satisfies PageServerLoad;

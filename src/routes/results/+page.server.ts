import { Collections, type AnswersResponse } from '$lib/types/pocketbase';
import type { TexpandAnswers } from '$lib/types/pocketbase/Texpand';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
		const questions = await locals.pb.collection(Collections.Questions).getFullList({
			sort: 'index'
		});

		const answers = await locals.pb
			.collection(Collections.Answers)
			.getFullList<AnswersResponse<TexpandAnswers>>({
				sort: 'related_question',
				expand: 'participant,related_question'
			});

		return {
			questions,
			answers
		};
	} catch (e) {
		console.error(e);
		return {
			questions: [],
			answers: []
		};
	}
}) satisfies PageServerLoad;

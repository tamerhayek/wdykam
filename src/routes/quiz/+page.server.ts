import { Collections, type AnswersResponse } from '$lib/types/pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, depends }) => {
	depends(Collections.Participants);
	depends(Collections.Questions);
	depends(Collections.Answers);

	let answers: AnswersResponse[] = [];
	if (locals.participant)
		answers = await locals.pb.collection(Collections.Answers).getFullList({
			filter: `participant = "${locals.participant.id}"`
		});

	const answeredQuestions = answers.map((answer) => answer.related_question);

	const filter = answeredQuestions.map((id) => `id != "${id}"`).join(' && ');

	const questions = await locals.pb.collection(Collections.Questions).getFullList({
		sort: 'index',
		filter
	});

	return {
		participant: locals.participant,
		questions
	};
}) satisfies PageServerLoad;

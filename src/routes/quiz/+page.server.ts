import { Collections, type AnswersResponse, type ReviewsResponse } from '$lib/types/pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, depends }) => {
	depends(Collections.Participants);
	depends(Collections.Questions);
	depends(Collections.Answers);
	depends(Collections.Reviews);

	let answers: AnswersResponse[] = [];
	let review: ReviewsResponse | null = null;
	if (locals.participant) {
		answers = await locals.pb.collection(Collections.Answers).getFullList({
			filter: `participant = "${locals.participant.id}"`
		});
		const reviews = await locals.pb.collection(Collections.Reviews).getFullList({
			filter: `participant = "${locals.participant?.id}"`
		});

		review = reviews.length > 0 ? reviews[0] : null;
	}

	const answeredQuestions = answers.map((answer) => answer.related_question);

	const filter = answeredQuestions.map((id) => `id != "${id}"`).join(' && ');

	const questions = await locals.pb.collection(Collections.Questions).getFullList({
		sort: 'index',
		filter
	});

	return {
		participant: locals.participant,
		questions,
		review
	};
}) satisfies PageServerLoad;

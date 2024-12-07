import { Collections, type AnswersResponse } from '$lib/types/pocketbase';
import type { TexpandAnswers } from '$lib/types/pocketbase/Texpand';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, depends }) => {
	depends(Collections.Answers);

	try {
		const questions = await locals.pb.collection(Collections.Questions).getList(1, 1, {
			fields: 'id'
		});
		const answers = await locals.pb
			.collection(Collections.Answers)
			.getFullList<AnswersResponse<TexpandAnswers>>({
				expand: 'participant,related_question'
			});

		const participants = [...new Set(answers.map((answer) => answer.participant))];

		return {
			results: participants.map((participant) => {
				const participantData = answers.find((answer) => answer.participant === participant)!
					.expand!.participant;
				return {
					id: participantData.id,
					name: participantData.name,
					avatar: participantData.avatar,
					correct_answers: answers.reduce((acc, answer) => {
						if (answer.participant === participant && answer.is_correct) {
							return acc + 1;
						}
						return acc;
					}, 0)
				};
			}),
			totalQuestions: questions.totalItems
		};
	} catch (e) {
		console.error(e);
		return {
			results: [],
			totalQuestions: 0
		};
	}
}) satisfies PageServerLoad;

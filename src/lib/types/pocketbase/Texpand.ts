import type { ParticipantsResponse, QuestionsResponse } from '$lib/types/pocketbase';

export type TexpandAnswers = {
	participant: ParticipantsResponse;
	related_question: QuestionsResponse;
};

export type TexpandReviews = {
	participant: ParticipantsResponse;
};

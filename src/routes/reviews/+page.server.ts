import { Collections, type ReviewsResponse } from '$lib/types/pocketbase';
import type { TexpandReviews } from '$lib/types/pocketbase/Texpand';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
		const reviews = await locals.pb
			.collection(Collections.Reviews)
			.getFullList<ReviewsResponse<TexpandReviews>>({
				expand: 'participant'
			});

		return {
			reviews
		};
	} catch (e) {
		console.error(e);
		return {
			reviews: []
		};
	}
}) satisfies PageServerLoad;

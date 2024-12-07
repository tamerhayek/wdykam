<script lang="ts">
	import { getPocketbaseFileUrl } from '$lib/index';
	import { AnswersAnswerOptions, Collections } from '$lib/types/pocketbase';
	import type { PageData } from './$types';
	import ChooseNameAndAvatar from './ChooseNameAndAvatar.svelte';
	import QuestionAndAnswer from './QuestionAndAnswer.svelte';
	import Review from './Review.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { participant, questions, review } = $derived(data);
</script>

<div class="flex min-h-screen w-full flex-col gap-5 p-3">
	<div class="flex w-full flex-col gap-3 rounded-xl border-2 border-white bg-indigo-950 px-4 py-3">
		<h1 class="w-full text-2xl font-bold">Quante ne sai su di me?</h1>

		{#if participant}
			<div class="flex items-center gap-2">
				<div class="size-10 overflow-hidden rounded-full border-2 border-indigo-500">
					<img
						class="aspect-square max-w-10 object-cover object-center"
						src={getPocketbaseFileUrl(Collections.Participants, participant.id, participant.avatar)}
						alt="Avatar"
					/>
				</div>
				<h2 class="text-lg font-semibold">
					{participant.name}
				</h2>
			</div>
		{/if}
	</div>

	{#if !participant}
		<ChooseNameAndAvatar />
	{:else if questions.length > 0}
		<QuestionAndAnswer
			question={{
				id: questions[0].id,
				text: questions[0].question
			}}
			answers={[
				{
					text: questions[0].answer_one,
					image: questions[0].image_one,
					option: AnswersAnswerOptions.one
				},
				{
					text: questions[0].answer_two,
					image: questions[0].image_two,
					option: AnswersAnswerOptions.two
				},
				{
					text: questions[0].answer_three,
					image: questions[0].image_three,
					option: AnswersAnswerOptions.three
				},
				{
					text: questions[0].answer_four,
					image: questions[0].image_four,
					option: AnswersAnswerOptions.four
				}
			]}
		/>
	{:else if !review}
		<Review />
	{:else}
		<h1 class="text-2xl font-semibold">Hai risposto tutte le domande!</h1>
	{/if}
</div>

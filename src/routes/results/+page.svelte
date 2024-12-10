<script lang="ts">
	import {
		AnswersAnswerOptions,
		type ParticipantsResponse,
		QuestionsCorrectAnswerOptions
	} from '$lib/types/pocketbase';
	import type { PageData } from './$types';
	import QuestionAndResults from './QuestionAndResults.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { questions, answers } = $derived(data);

	let selectedAnswer = $state(0);
</script>

<div class="flex min-h-screen flex-col gap-10 p-5">
	<div class="flex w-full items-center justify-between gap-5">
		<h1>Risultati</h1>
		<div class="flex items-center gap-5">
			<a href="/" class="btn btn-primary w-fit">Home</a>
			<a href="/reviews" class="btn btn-primary w-fit">Recensioni</a>
		</div>
	</div>

	{#if questions.length > 0}
		<div class="flex w-full gap-5">
			<QuestionAndResults
				question={{
					id: questions[selectedAnswer].id,
					text: questions[selectedAnswer].question,
					answers: [
						{
							text: questions[selectedAnswer].answer_one,
							image: questions[selectedAnswer].image_one,
							participants: answers
								.filter(
									(answer) =>
										answer.related_question === questions[selectedAnswer].id &&
										answer.answer === AnswersAnswerOptions.one
								)
								.map((answer) => answer.expand!.participant) as ParticipantsResponse[],
							isCorrect:
								questions[selectedAnswer].correct_answer === QuestionsCorrectAnswerOptions.one
						},
						{
							text: questions[selectedAnswer].answer_two,
							image: questions[selectedAnswer].image_two,
							participants: answers
								.filter(
									(answer) =>
										answer.related_question === questions[selectedAnswer].id &&
										answer.answer === AnswersAnswerOptions.two
								)
								.map((answer) => answer.expand!.participant) as ParticipantsResponse[],
							isCorrect:
								questions[selectedAnswer].correct_answer === QuestionsCorrectAnswerOptions.two
						},
						{
							text: questions[selectedAnswer].answer_three,
							image: questions[selectedAnswer].image_three,
							participants: answers
								.filter(
									(answer) =>
										answer.related_question === questions[selectedAnswer].id &&
										answer.answer === AnswersAnswerOptions.three
								)
								.map((answer) => answer.expand!.participant) as ParticipantsResponse[],
							isCorrect:
								questions[selectedAnswer].correct_answer === QuestionsCorrectAnswerOptions.three
						},
						{
							text: questions[selectedAnswer].answer_four,
							image: questions[selectedAnswer].image_four,
							participants: answers
								.filter(
									(answer) =>
										answer.related_question === questions[selectedAnswer].id &&
										answer.answer === AnswersAnswerOptions.four
								)
								.map((answer) => answer.expand!.participant) as ParticipantsResponse[],
							isCorrect:
								questions[selectedAnswer].correct_answer === QuestionsCorrectAnswerOptions.four
						}
					]
				}}
			/>
		</div>

		<div class="flex w-full items-center justify-center gap-5">
			{#if selectedAnswer > 0}
				<button
					class="btn btn-primary w-fit"
					onclick={() => {
						selectedAnswer = selectedAnswer === 0 ? questions.length - 1 : selectedAnswer - 1;
					}}
				>
					Precedente
				</button>
			{/if}
			{#if selectedAnswer < questions.length - 1}
				<button
					class="btn btn-primary w-fit"
					onclick={() => {
						selectedAnswer = selectedAnswer === questions.length - 1 ? 0 : selectedAnswer + 1;
					}}
				>
					Successiva
				</button>
			{/if}
		</div>
	{:else}
		<p>Nessuna domanda disponibile!</p>
	{/if}
</div>

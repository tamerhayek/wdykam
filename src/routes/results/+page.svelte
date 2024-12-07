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

<main class="flex min-h-screen flex-col items-center gap-5 p-10">
	<h1>Risultati</h1>

	<div class="flex w-full items-center justify-center gap-5">
		<a href="/" class="w-fit rounded-xl bg-indigo-900 px-4 py-3 hover:bg-indigo-950">Home</a>
		<a href="/reviews" class="w-fit rounded-xl bg-indigo-900 px-4 py-3 hover:bg-indigo-950">
			Recensioni
		</a>
	</div>

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
				class="w-fit rounded-xl bg-indigo-900 px-4 py-3 hover:bg-indigo-950"
				onclick={() => {
					selectedAnswer = selectedAnswer === 0 ? questions.length - 1 : selectedAnswer - 1;
				}}
			>
				Precedente
			</button>
		{/if}
		{#if selectedAnswer < questions.length - 1}
			<button
				class="w-fit rounded-xl bg-indigo-900 px-4 py-3 hover:bg-indigo-950"
				onclick={() => {
					selectedAnswer = selectedAnswer === questions.length - 1 ? 0 : selectedAnswer + 1;
				}}
			>
				Successiva
			</button>
		{/if}
	</div>
</main>

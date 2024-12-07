<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { getPocketbaseFileUrl } from '$lib/index';
	import { AnswersAnswerOptions, Collections } from '$lib/types/pocketbase';
	import { toast } from 'svoast';

	interface Props {
		question: {
			id: string;
			text: string;
		};
		answers: {
			text: string;
			image: string;
			option: AnswersAnswerOptions;
		}[];
	}

	let { question, answers }: Props = $props();

	let selectedAnswer: AnswersAnswerOptions | undefined = $state();

	const handleSubmit = async () => {
		if (selectedAnswer === undefined) {
			console.log('Missing selectedAnswer');
			toast.error('Scegli una risposta!');
			return;
		}

		toast.attention('Invio risposta in corso...', {
			infinite: true
		});

		try {
			const response = await fetch('/api/answer', {
				method: 'PUT',
				body: JSON.stringify({
					related_question: question.id,
					answer: selectedAnswer
				})
			});

			const res = await response.json();

			if (res.success) {
				toast.removeAll();
				toast.success('Risposta inviata!');
				selectedAnswer = undefined;
				invalidate(Collections.Answers);
			} else {
				toast.removeAll();
				toast.error(res.message);
				console.error(res);
			}
		} catch (error) {
			toast.removeAll();
			toast.error('Qualcosa è andato storto!');
			console.error(error);
		}
	};
</script>

<div class="flex flex-col gap-5 py-5">
	<h2 class="text-2xl font-semibold">{question.text}</h2>
	<div class="flex flex-col gap-5">
		{#each answers as { text: answer, image, option }}
			<button
				class="flex flex-col items-center gap-2 rounded-xl border-2 border-slate-50 px-2 py-5"
				class:bg-indigo-950={selectedAnswer === option}
				class:bg-indigo-900={selectedAnswer !== option}
				class:hover:bg-indigo-950={selectedAnswer !== option}
				onclick={() => {
					selectedAnswer = option;
				}}
			>
				{#if image}
					<div class="overflow-hidden rounded-xl border-2 border-indigo-500">
						<img
							class="max-w-40 object-cover object-center"
							src={getPocketbaseFileUrl(Collections.Questions, question.id, image)}
							alt="Answer image {option}"
						/>
					</div>
				{/if}
				<span class="text-lg font-semibold">{answer}</span>
			</button>
		{/each}
	</div>

	<div class="flex items-center justify-end gap-2">
		<button
			class="rounded bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600 disabled:bg-slate-500 disabled:text-slate-200"
			onclick={handleSubmit}
			disabled={selectedAnswer === undefined}
		>
			Avanti
		</button>
	</div>
</div>

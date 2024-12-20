<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { getPocketbaseFileUrl } from '$lib/index';
	import { AnswersAnswerOptions, Collections } from '$lib/types/pocketbase';
	import { slide } from 'svelte/transition';
	import { toast } from 'svoast';

	interface Props {
		question: {
			id: string;
			text: string;
			answers: {
				text: string;
				image: string;
				option: AnswersAnswerOptions;
			}[];
		};
	}

	let { question }: Props = $props();

	let loading = $state(false);

	const handleSelect = async (answer: AnswersAnswerOptions) => {
		if (!answer) {
			console.log('Missing selectedAnswer');
			toast.error('Scegli una risposta!');
			return;
		}

		loading = true;

		toast.attention('Invio risposta in corso...', {
			infinite: true
		});

		try {
			const response = await fetch('/api/answer', {
				method: 'PUT',
				body: JSON.stringify({
					related_question: question.id,
					answer
				})
			});

			const res = await response.json();

			if (res.success) {
				toast.removeAll();
				toast.success('Risposta inviata!');
				await invalidate(Collections.Answers);
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

		loading = false;
	};
</script>

<div class="flex flex-col gap-5">
	{#if loading}
		<div role="status" class="flex items-center justify-center">
			<svg
				aria-hidden="true"
				class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	{:else}
		<h2 transition:slide class="text-2xl font-semibold">{question.text}</h2>
		<div class="flex flex-col gap-3">
			{#each question.answers as { text: answer, image, option } (option)}
				{#if answer}
					<button
						transition:slide|global
						onclick={() => handleSelect(option)}
						class="flex items-center gap-2 overflow-hidden rounded-xl bg-primary shadow-xl"
					>
						{#if image}
							<figure class="shrink-0 py-3 ps-3">
								<img
									class="h-20 w-20 object-contain object-center"
									src={getPocketbaseFileUrl(Collections.Questions, question.id, image)}
									alt="Answer image {option}"
								/>
							</figure>
						{/if}
						<div class="w-full grow">
							<p class="w-full py-3 ps-3 text-start text-lg font-semibold text-primary-content">
								{answer}
							</p>
						</div>
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>

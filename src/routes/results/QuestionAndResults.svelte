<script lang="ts">
	import { getPocketbaseFileUrl } from '$lib/index';
	import { Collections, type ParticipantsResponse } from '$lib/types/pocketbase';

	interface Props {
		question: {
			id: string;
			text: string;
			answers: {
				text: string;
				image: string;
				participants: ParticipantsResponse[];
				isCorrect: boolean;
			}[];
		};
	}

	let { question }: Props = $props();
</script>

<div class="flex w-full flex-col gap-5">
	<h2 class="text-2xl font-semibold">{question.text}</h2>
	<div class="grid grid-cols-2 gap-3">
		{#each question.answers as { text: answer, image, participants, isCorrect }, index}
			{#if answer}
				<div
					class="flex flex-col items-center gap-2 rounded-xl border-2 border-slate-50 px-5 py-5"
					class:bg-indigo-900={!isCorrect}
					class:bg-green-900={isCorrect}
				>
					{#if image}
						<div class="overflow-hidden rounded-xl">
							<img
								class="max-h-28 max-w-28 object-cover object-center"
								src={getPocketbaseFileUrl(Collections.Questions, question.id, image)}
								alt="Answer image {index + 1}"
							/>
						</div>
					{/if}
					<span class="text-lg font-semibold">{answer}</span>
					<div class="flex flex-wrap items-center justify-center gap-2">
						{#each participants as { id, name, avatar }}
							<div class="flex items-center gap-2 px-4 py-3">
								<div class="flex items-center gap-2">
									<div class="size-10 overflow-hidden rounded-full border-2 border-indigo-500">
										<img
											class="aspect-square max-w-10 object-cover object-center"
											src={getPocketbaseFileUrl(Collections.Participants, id, avatar)}
											alt="Avatar {name}"
										/>
									</div>
								</div>
								<span>{name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

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
					class="flex flex-col gap-3 overflow-hidden rounded-xl p-3 shadow-xl"
					class:bg-error={!isCorrect}
					class:bg-success={isCorrect}
				>
					<div class="flex items-center gap-2">
						{#if image}
							<figure class="shrink-0 p-3">
								<img
									class="h-20 w-20 max-w-20 object-contain object-center"
									src={getPocketbaseFileUrl(Collections.Questions, question.id, image)}
									alt="Answer image {index}"
								/>
							</figure>
						{/if}
						<div class="w-full grow">
							<p
								class="w-full text-start text-lg font-semibold"
								class:text-error-content={!isCorrect}
								class:text-success-content={isCorrect}
							>
								{answer}
							</p>
						</div>
					</div>
					{#if participants.length > 0}
						<div class="flex flex-col gap-3 px-3">
							<div class="avatar-group -space-x-6 rtl:space-x-reverse">
								{#each participants as { id, name, avatar }}
									<div class="avatar border">
										<div class="w-12">
											<img
												src={getPocketbaseFileUrl(Collections.Participants, id, avatar)}
												alt="Avatar {name}"
											/>
										</div>
									</div>
								{/each}
							</div>
							<p
								class="text-sm font-semibold"
								class:text-error-content={!isCorrect}
								class:text-success-content={isCorrect}
							>
								{participants.map((participant) => participant.name).join(', ')}
							</p>
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>

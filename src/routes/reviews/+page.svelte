<script lang="ts">
	import { getPocketbaseFileUrl } from '$lib/index';
	import { Collections } from '$lib/types/pocketbase';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { reviews } = $derived(data);
</script>

<div class="flex min-h-screen flex-col gap-10 p-5">
	<div class="flex w-full flex-wrap items-center justify-between gap-5">
		<h1>Recensioni</h1>
		<div class="flex items-center gap-5">
			<a href="/" class="btn btn-primary w-fit">Home</a>
			<a href="/results" class="btn btn-primary w-fit">Risultati</a>
		</div>
	</div>

	{#if reviews.length > 0}
		<div class="flex w-full gap-5">
			<ol class="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
				{#each reviews as review (review.id)}
					<li
						transition:slide|global
						class="flex flex-col items-center gap-3 rounded-xl bg-base-300 p-5"
					>
						<div class="flex w-full items-start gap-5">
							<div class="size-20 shrink-0 overflow-hidden rounded-xl lg:size-40">
								<img
									class="size-20 object-cover object-center lg:size-40"
									src={getPocketbaseFileUrl(
										Collections.Participants,
										review.participant,
										review.expand!.participant.avatar
									)}
									alt="Avatar {review.expand!.participant.name}"
								/>
							</div>
							<div class="flex w-full grow flex-col gap-3">
								<p class="text-xl font-semibold">{review.expand!.participant.name}</p>
								<div class="flex items-center gap-1.5">
									{#each [1, 2, 3, 4, 5] as star (star)}
										<span
											class="cursor-pointer text-3xl lg:text-5xl"
											class:text-warning={review.stars >= star}
										>
											★
										</span>
									{/each}
								</div>
								<div class="w-full text-lg">{review.review}</div>
							</div>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	{:else}
		<p>Nessuna recensione disponibile!</p>
	{/if}
</div>

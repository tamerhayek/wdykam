<script lang="ts">
	import { getPocketbaseFileUrl } from '$lib/index';
	import { Collections } from '$lib/types/pocketbase';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { reviews } = $derived(data);
</script>

<main class="flex min-h-screen flex-col items-center gap-5 p-10">
	<h1>Recensioni</h1>

	<div class="flex w-full items-center justify-center gap-5">
		<a href="/" class="w-fit rounded-xl bg-indigo-900 px-4 py-3 hover:bg-indigo-950">Home</a>
		<a href="/results" class="w-fit rounded-xl bg-indigo-900 px-4 py-3 hover:bg-indigo-950">
			Risultati
		</a>
	</div>

	<div class="flex w-full gap-5">
		<ol class="flex w-full flex-wrap items-center justify-center gap-5">
			{#each reviews as review}
				<li
					class="flex flex-col items-center gap-3 rounded-xl border-2 border-indigo-300 bg-indigo-800 px-20 py-5"
				>
					<div class="flex flex-col items-center gap-2">
						<div class="flex items-center gap-2">
							<div class="size-40 overflow-hidden rounded-full border-2 border-indigo-500">
								<img
									class="aspect-square max-w-40 object-cover object-center"
									src={getPocketbaseFileUrl(
										Collections.Participants,
										review.participant,
										review.expand!.participant.avatar
									)}
									alt="Avatar {review.expand!.participant.name}"
								/>
							</div>
						</div>
						<span>{review.expand!.participant.name}</span>
					</div>
					<div class="flex items-center gap-1.5">
						<span class="cursor-pointer text-4xl" class:text-yellow-500={review.stars >= 1}>★</span>
						<span class="cursor-pointer text-4xl" class:text-yellow-500={review.stars >= 2}>★</span>
						<span class="cursor-pointer text-4xl" class:text-yellow-500={review.stars >= 3}>★</span>
						<span class="cursor-pointer text-4xl" class:text-yellow-500={review.stars >= 4}>★</span>
						<span class="cursor-pointer text-4xl" class:text-yellow-500={review.stars >= 5}>★</span>
					</div>
					<p class="text-lg">{review.review}</p>
				</li>
			{/each}
		</ol>
	</div>
</main>

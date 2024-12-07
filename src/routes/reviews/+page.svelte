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

<div class="flex min-h-screen flex-col items-center gap-10 p-5">
	<div class="flex w-full items-center justify-between gap-5">
		<h1>Recensioni</h1>
		<div class="flex items-center gap-5">
			<a href="/" class="btn btn-primary w-fit">Home</a>
			<a href="/results" class="btn btn-primary w-fit">Risultati</a>
		</div>
	</div>

	<div class="flex w-full gap-5">
		<ol class="grid w-full grid-cols-2 gap-5">
			{#each reviews as review}
				<li class="flex flex-col items-center gap-3 rounded-xl bg-base-300 p-5">
					<div class="flex w-full items-start gap-5">
						<div class="size-40 shrink-0 overflow-hidden rounded-xl">
							<img
								class="h-40 w-40 object-cover object-center"
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
								<span class="cursor-pointer text-5xl" class:text-warning={review.stars >= 1}>
									★
								</span>
								<span class="cursor-pointer text-5xl" class:text-warning={review.stars >= 2}>
									★
								</span>
								<span class="cursor-pointer text-5xl" class:text-warning={review.stars >= 3}>
									★
								</span>
								<span class="cursor-pointer text-5xl" class:text-warning={review.stars >= 4}>
									★
								</span>
								<span class="cursor-pointer text-5xl" class:text-warning={review.stars >= 5}>
									★
								</span>
							</div>
							<div class="w-full text-lg">{review.review}</div>
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</div>

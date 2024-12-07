<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { InputTextArea } from '$lib/components';
	import { Collections } from '$lib/types/pocketbase';
	import { toast } from 'svoast';

	let review = $state('');
	let stars = $state(0);

	let loading = $state(false);

	const handleSubmit = async () => {
		if (!review || !stars) {
			console.log('Missing review or stars');
			toast.error('Scrivi una recensione e scegli un numero di stelle!');
			return;
		}

		toast.attention('Invio recensione in corso...', {
			infinite: true
		});

		try {
			const response = await fetch('/api/review', {
				method: 'PUT',
				body: JSON.stringify({ review, stars })
			});

			const res = await response.json();

			if (res.success) {
				toast.removeAll();
				toast.success('Recensione inviata con successo!');
				review = '';
				stars = 0;
				invalidate(Collections.Reviews);
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

{#if loading}
	<div role="status" class="flex items-center justify-center">
		<span class="loading loading-spinner loading-md"></span>
		<span class="sr-only">Loading...</span>
	</div>
{:else}
	<div class="flex flex-col gap-5 rounded-xl py-5">
		<h2 class="text-2xl font-semibold">Dimmi che ne pensi.</h2>

		<div class="flex items-center gap-1.5">
			<!-- 1st Star -->
			<input onclick={() => (stars = 1)} type="radio" id="star1" name="stars" class="hidden" />
			<label for="star1" class="cursor-pointer text-4xl" class:text-warning={stars >= 1}> ★ </label>

			<!-- 2nd Star -->
			<input onclick={() => (stars = 2)} type="radio" id="star2" name="stars" class="hidden" />
			<label for="star2" class="cursor-pointer text-4xl" class:text-warning={stars >= 2}> ★ </label>

			<!-- 3rd Star -->
			<input onclick={() => (stars = 3)} type="radio" id="star3" name="stars" class="hidden" />
			<label for="star3" class="cursor-pointer text-4xl" class:text-warning={stars >= 3}> ★ </label>

			<!-- 4th Star -->
			<input onclick={() => (stars = 4)} type="radio" id="star4" name="stars" class="hidden" />
			<label for="star4" class="cursor-pointer text-4xl" class:text-warning={stars >= 4}> ★ </label>

			<!-- 5th Star -->
			<input onclick={() => (stars = 5)} type="radio" id="star5" name="stars" class="hidden" />
			<label for="star5" class="cursor-pointer text-4xl" class:text-warning={stars >= 5}> ★ </label>
		</div>

		<InputTextArea
			id="review"
			label="Lascia una recensione!"
			placeholder="Sei bellissimo!"
			bind:value={review}
		/>

		<div class="flex items-center gap-2">
			<button class="btn btn-primary w-full" onclick={handleSubmit} disabled={!review || !stars}>
				Finisci il quiz
			</button>
		</div>
	</div>
{/if}

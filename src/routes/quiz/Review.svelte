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

		loading = true;

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

		loading = false;
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
			{#each [1, 2, 3, 4, 5] as star (star)}
				<label
					for="star{star}"
					class="cursor-pointer text-4xl transition-colors duration-200 ease-in-out"
					class:text-warning={stars >= star}
				>
					<input
						onclick={() => (stars = star)}
						type="radio"
						id="star{star}"
						name="stars"
						class="hidden"
					/>
					★
				</label>
			{/each}
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

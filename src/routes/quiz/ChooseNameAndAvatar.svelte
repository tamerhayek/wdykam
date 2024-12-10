<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { InputCamera, InputText } from '$lib/components';
	import { Collections } from '$lib/types/pocketbase';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Reload } from '@steeze-ui/tabler-icons';
	import { toast } from 'svoast';

	let participantName = $state('');
	let files: FileList | undefined = $state();

	let loading = $state(false);

	const handleSubmit = async () => {
		if (!files || files.length !== 1 || !participantName) {
			console.log('Missing files or participantName');
			toast.error('Scatta una foto e scrivi chi sei!');
			return;
		}

		loading = true;

		toast.attention('Creazione partecipante in corso...', {
			infinite: true
		});

		const formData = new FormData();

		formData.append('name', participantName);
		formData.append('avatar', files[0]);

		try {
			const response = await fetch('/api/participant', {
				method: 'PUT',
				body: formData
			});

			const res = await response.json();

			if (res.success) {
				toast.removeAll();
				toast.success('Partecipante creato con successo!');
				participantName = '';
				files = undefined;
				invalidate(Collections.Participants);
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
	<div class="flex flex-col gap-5">
		<h2 class="text-2xl font-semibold">Chi c**** sei?</h2>

		{#if !files}
			<InputCamera id="avatar" label="Fammi vedere chi sei!" bind:files />
		{:else}
			<div class="relative flex items-center justify-center gap-2 p-3">
				<button
					onclick={() => {
						files = undefined;
					}}
					class="btn btn-error absolute right-0 top-0 w-fit overflow-hidden"
				>
					<Icon src={Reload} size="24px" /> <span>Ripeti</span>
				</button>
				<div class="size-60 overflow-hidden rounded-full border-2 border-primary">
					<img
						class="aspect-square max-w-60 object-cover object-center"
						src={URL.createObjectURL(files[0])}
						alt="Avatar"
					/>
				</div>
			</div>
		{/if}

		<InputText
			id="participant"
			label="Identificati!"
			placeholder="Michael Jackson"
			bind:value={participantName}
		/>

		<div class="flex items-center gap-2">
			<button
				class="btn btn-primary w-full"
				onclick={handleSubmit}
				disabled={!files || !participantName}
			>
				Inizia
			</button>
		</div>
	</div>
{/if}

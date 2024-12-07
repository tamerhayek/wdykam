<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { InputCamera, InputText } from '$lib/components';
	import { Collections } from '$lib/types/pocketbase';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { X } from '@steeze-ui/tabler-icons';
	import { toast } from 'svoast';

	let participantName = $state('');
	let files: FileList | undefined = $state();

	const handleSubmit = async () => {
		if (!files || files.length !== 1 || !participantName) {
			console.log('Missing files or participantName');
			toast.error('Scatta una foto e scrivi chi sei!');
			return;
		}

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
	};
</script>

<div class="flex flex-col gap-2 rounded-xl border-2 border-slate-50 bg-indigo-950 p-5">
	<h2 class="text-2xl font-semibold">Chi c**** sei?</h2>

	{#if !files}
		<InputCamera id="avatar" label="Fammi vedere chi sei!" bind:files />
	{:else}
		<div class="relative flex items-center justify-center gap-2 p-3">
			<button
				onclick={() => {
					files = undefined;
				}}
				class="absolute right-0 top-0 flex w-fit items-center gap-2 overflow-hidden rounded-lg bg-red-500 px-2 py-1"
			>
				<Icon src={X} size="24px" /> <span>Ripeti</span>
			</button>
			<div class="size-60 overflow-hidden rounded-full border-2 border-indigo-500">
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

	<div class="flex items-center justify-end gap-2">
		<button
			class="rounded bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600 disabled:bg-slate-500 disabled:text-slate-200"
			onclick={handleSubmit}
			disabled={!files || !participantName}
		>
			Avanti
		</button>
	</div>
</div>

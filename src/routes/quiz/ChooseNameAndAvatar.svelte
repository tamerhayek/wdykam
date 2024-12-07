<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { InputCamera, InputText } from '$lib/components';
	import { Collections } from '$lib/types/pocketbase';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { X } from '@steeze-ui/tabler-icons';
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

		<div class="flex items-center gap-2">
			<button
				class="w-full rounded bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600 disabled:bg-slate-500 disabled:text-slate-200"
				onclick={handleSubmit}
				disabled={!files || !participantName}
			>
				Inizia
			</button>
		</div>
	</div>
{/if}

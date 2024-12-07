<script lang="ts">
	import { getPocketbaseFileUrl } from '$lib/index';
	import { Collections } from '$lib/types/pocketbase';
	import type { PageData } from './$types';
	import ChooseNameAndAvatar from './ChooseNameAndAvatar.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { participant } = $derived(data);
</script>

<div class="flex min-h-screen w-full flex-col gap-5 p-3">
	<div class="flex w-full flex-col gap-3 rounded-xl border-2 border-white bg-indigo-950 px-4 py-3">
		<h1 class="w-full text-3xl font-bold">Cosa ne sai su di me?</h1>

		{#if participant}
			<div class="flex items-center gap-2">
				<div class="size-10 overflow-hidden rounded-full border-2 border-indigo-500">
					<img
						class="aspect-square max-w-10 object-cover object-center"
						src={getPocketbaseFileUrl(Collections.Participants, participant.id, participant.avatar)}
						alt="Avatar"
					/>
				</div>
				<h2 class="text-lg font-semibold">
					{participant.name}
				</h2>
			</div>
		{/if}
	</div>

	{#if !participant}
		<ChooseNameAndAvatar />
	{/if}
</div>

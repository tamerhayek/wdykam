<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { getPocketbaseFileUrl } from '$lib/index';
	import { Collections, type TypedPocketBase } from '$lib/types/pocketbase';
	import QRCode from '@castlenine/svelte-qrcode';
	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { results, totalQuestions } = $derived(data);

	const realtimeSync = async (pb: TypedPocketBase) => {
		await pb.collection(Collections.Answers).subscribe('*', (e) => {
			console.log('answers updated', e);
			invalidate(Collections.Answers);
		});
	};

	const realtimeUnsync = async (pb: TypedPocketBase) => {
		await pb.collection(Collections.Answers).unsubscribe();
	};

	onMount(() => {
		const pb = new PocketBase(env.PUBLIC_PB_INSTANCE_URL) as TypedPocketBase;
		realtimeSync(pb);

		return () => {
			realtimeUnsync(pb);
		};
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-between gap-10 p-5">
	<div class="flex w-full flex-wrap items-center justify-between gap-5">
		<h1>Quante ne sai su di me?</h1>
		<div class="flex items-center gap-5">
			<a href="/results" class="btn btn-primary w-fit">Risultati</a>
			<a href="/reviews" class="btn btn-primary w-fit">Recensioni</a>
		</div>
	</div>

	<div class="flex w-full grow flex-wrap justify-between gap-10">
		<div class="flex grow flex-col gap-5">
			<ol class="flex flex-col gap-3">
				{#each results as { id, name, avatar, correct_answers } (id)}
					<li
						class="relative flex items-center justify-between overflow-hidden rounded-full border-2 border-primary px-4 py-3"
					>
						<div
							class="absolute left-0 top-0 h-full rounded-full bg-neutral"
							style="width: {(correct_answers / totalQuestions) * 100}%"
						></div>
						<div class="z-10 flex items-center gap-2">
							<div class="flex items-center gap-2">
								<div class="size-10 overflow-hidden rounded-full border-2 border-neutral">
									<img
										class="aspect-square max-w-10 object-cover object-center"
										src={getPocketbaseFileUrl(Collections.Participants, id, avatar)}
										alt="Avatar"
									/>
								</div>
							</div>
							<span class="text-lg font-semibold text-neutral-content">{name}</span>
						</div>
						<p class="z-10 text-lg font-semibold text-neutral-content">{correct_answers}</p>
					</li>
				{:else}
					<p>Ancora nessun partecipante!</p>
				{/each}
			</ol>
		</div>
		<div class="w-full lg:w-1/3">
			<QRCode
				data="{env.PUBLIC_APP_URL}/quiz"
				shape="circle"
				haveBackgroundRoundedEdges
				haveGappedModules
				isResponsive
			/>
		</div>
	</div>
</div>

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

<main class="flex min-h-screen flex-col items-center justify-between gap-5 p-10">
	<h1>Quante ne sai su di me?</h1>

	<div class="flex w-full grow justify-between gap-5">
		<div class="flex grow flex-col gap-5 p-5">
			<ol class="flex flex-col gap-3">
				{#each results as { id, name, avatar, correct_answers }}
					<li
						class="relative flex items-center justify-between overflow-hidden rounded-xl border-2 border-indigo-300 p-3"
					>
						<div
							class="absolute left-0 top-0 -z-10 h-full rounded-xl bg-indigo-950"
							style="width: {(correct_answers / totalQuestions) * 100}%"
						></div>
						<div class="flex items-center gap-2">
							<div class="flex items-center gap-2">
								<div class="size-10 overflow-hidden rounded-full border-2 border-indigo-500">
									<img
										class="aspect-square max-w-10 object-cover object-center"
										src={getPocketbaseFileUrl(Collections.Participants, id, avatar)}
										alt="Avatar"
									/>
								</div>
							</div>
							<span>{name}</span>
						</div>
						<div>{correct_answers}</div>
					</li>
				{/each}
			</ol>
		</div>
		<div class="flex w-1/3 flex-col items-center gap-5 p-5">
			<QRCode
				data="{env.PUBLIC_APP_URL}/quiz"
				shape="circle"
				haveBackgroundRoundedEdges
				haveGappedModules
				isResponsive
			/>
			<a class="w-fit rounded-xl bg-indigo-900 px-4 py-3 hover:bg-indigo-950" href="/results">
				Risultati
			</a>
		</div>
	</div>
</main>

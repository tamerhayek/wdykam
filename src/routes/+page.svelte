<script lang="ts">
	import { env } from '$env/dynamic/public';
	import QRCode from '@castlenine/svelte-qrcode';
	import type { PageData } from './$types';
	import { getPocketbaseFileUrl } from '$lib/index';
	import { Collections } from '$lib/types/pocketbase';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { results, totalQuestions } = $derived(data);

	$effect(() => {
		console.log(results);
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
							class="absolute left-0 top-0 -z-10 h-full rounded-xl bg-indigo-600"
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
		<div class="w-1/3 p-5">
			<QRCode
				data="{env.PUBLIC_APP_URL}/quiz"
				shape="circle"
				haveBackgroundRoundedEdges
				haveGappedModules
				isResponsive
			/>
		</div>
	</div>
</main>

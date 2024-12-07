<script lang="ts">
	import { env } from '$env/dynamic/public';
	import QRCode from '@castlenine/svelte-qrcode';

	let total_answers = 100;
	let participants = [
		{
			name: 'John',
			correct_answers: 30
		},
		{
			name: 'Paul',
			correct_answers: 40
		},
		{
			name: 'Pippo',
			correct_answers: 35
		}
	].sort((a, b) => b.correct_answers - a.correct_answers);
</script>

<main class="flex min-h-screen flex-col items-center justify-between gap-5 p-10">
	<h1>Quante ne sai su di me?</h1>

	<div class="flex w-full grow justify-between gap-5">
		<div class="flex grow flex-col gap-5 p-5">
			<ol class="flex flex-col gap-3">
				{#each participants as { name, correct_answers }}
					<li
						class="relative flex items-center justify-between overflow-hidden rounded-xl border-2 border-indigo-300 p-3"
					>
						<div
							class="absolute left-0 top-0 -z-10 h-full rounded-xl bg-indigo-600"
							style="width: {(correct_answers / total_answers) * 100}%"
						></div>
						<span>{name}</span>
						<span>{correct_answers}</span>
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

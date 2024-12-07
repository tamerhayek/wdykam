<script lang="ts">
	import '@fontsource/poppins/latin-400-italic.css';
	import '@fontsource/poppins/latin-400.css';
	import '@fontsource/poppins/latin-600-italic.css';
	import '@fontsource/poppins/latin-600.css';
	import '@fontsource/poppins/latin-700.css';
	import '@fontsource/poppins/latin-800.css';
	import type { Snippet } from 'svelte';
	import { Toasts } from 'svoast';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>What do you know about me?</title>
	<meta name="title" content="What do you know about me?" />
	<meta name="description" content="What do you know about me?" />
</svelte:head>

<Toasts position="top-right" />

<main class="p-1">
	{@render children()}
</main>

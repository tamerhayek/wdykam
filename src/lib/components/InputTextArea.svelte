<script lang="ts">
	interface Props {
		id: string;
		label: string;
		placeholder: string;
		value: string;
	}

	let { id, label, placeholder, value = $bindable() }: Props = $props();
</script>

<div class="flex w-full flex-col gap-2">
	<div class="py-3">
		<label for={id} class="mb-2 block text-base font-medium text-slate-300">
			{label}
		</label>
		<textarea
			class="block h-40 w-full rounded-lg border-4 border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-indigo-500"
			{id}
			{placeholder}
			bind:value
		></textarea>
	</div>
</div>

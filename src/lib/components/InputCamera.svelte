<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Camera } from '@steeze-ui/tabler-icons';

	interface Props {
		id: string;
		label: string;
		files: FileList | undefined;
	}

	let { id, label, files = $bindable() }: Props = $props();
</script>

<div class="flex w-full flex-col gap-2">
	<div class="py-3">
		<label
			for={id}
			class="flex cursor-pointer flex-col items-center gap-5 rounded-xl border-2 border-primary bg-base-200 px-3 py-10 hover:bg-base-300"
		>
			{label}
			<Icon src={Camera} size="150px" />
		</label>
		<input
			{id}
			type="file"
			name="image"
			bind:files
			accept="image/*"
			capture="user"
			class="hidden"
		/>
	</div>
</div>

<script lang="ts">
	interface Props {
		id: string;
		label: string;
		placeholder: string;
		value: string;
	}

	let { id, label, placeholder, value = $bindable() }: Props = $props();
</script>

<label for={id} class="form-control w-full">
	<div class="label">
		<span class="label-text text-lg">{label}</span>
	</div>
	<textarea class="textarea textarea-bordered h-40" {id} {placeholder} bind:value></textarea>
</label>

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
	<input type="text" class="input input-bordered w-full" {id} {placeholder} bind:value />
</label>

<script lang="ts">
	import Select from '../primitives/Select.svelte';

	let {
		id = crypto.randomUUID(),
		name = '',
		value = $bindable(),
		label = '',
		options = [] as { value: string; label: string; disabled?: boolean }[],
		helperText = '',
		error = false,
		required = false,
		variant = 'outlined',
		fullWidth = false,
		className = ''
	} = $props();
</script>

<div class={`select-field ${fullWidth ? 'fullWidth' : ''}`}>
	<Select
		{id}
		{name}
		bind:value
		{options}
		{label}
		{error}
		{required}
		{variant}
		{fullWidth}
		{className}
	/>
	{#if helperText}
		<p class={`helper-text ${error ? 'error' : ''}`}>{helperText}</p>
	{/if}
</div>

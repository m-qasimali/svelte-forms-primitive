<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import '$lib/components/form/formfields/themes/Select.css';

	let {
		id = crypto.randomUUID(),
		name = '',
		value = $bindable(),
		options = [] as { value: string; label: string; disabled?: boolean }[],
		label = '',
		placeholder = 'Select...',
		disabled = false,
		error = false,
		required = false,
		variant = 'outlined', // outlined | filled | standard
		fullWidth = false,
		className = ''
	} = $props();

	const dispatch = createEventDispatcher();

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		value = target.value;
		dispatch('change', value);
	}
</script>

<div
	class={`select-root ${variant} ${error ? 'error' : ''} ${fullWidth ? 'fullWidth' : ''} ${className}`}
>
	<!-- {#if label}
		<label for={id} class="select-label">{label}{required ? '*' : ''}</label>
	{/if} -->

	<div class="select-wrapper">
		<select
			{id}
			{name}
			bind:value
			{disabled}
			{required}
			class="select-element"
			onchange={handleChange}
		>
			{#if placeholder}
				<option value="" disabled selected={value === ''}>{placeholder}</option>
			{/if}
			{#each options as opt}
				<option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
			{/each}
		</select>
		<span class="select-icon">▼</span>
	</div>
</div>

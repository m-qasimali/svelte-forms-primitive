<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/components/form/formfields/themes/Textarea.css';

	let {
		name = '',
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		autoFocus = false,
		autoComplete = '',
		id = crypto.randomUUID(),
		// Customization props
		variant = 'outlined', // outlined | filled | standard
		size = 'medium', // small | medium
		fullWidth = false,
		error = false,
		rows = 3,
		maxRows = 5,
		minRows = 1,
		className = '',
		helperText = '',
		label = '',
		ariaInvalid = false,
		startAdornment = null as Snippet | null,
		endAdornment = null as Snippet | null
	} = $props();
</script>

<div
	class={`textarea-root ${variant} ${size} 
    ${fullWidth ? 'fullWidth' : ''} 
    ${error ? 'error' : ''} 
    ${disabled ? 'disabled' : ''} ${className}`}
>
	{#if startAdornment}{@render startAdornment()}{/if}

	<textarea
		{id}
		{name}
		{placeholder}
		{disabled}
		{readonly}
		{required}
		aria-invalid={ariaInvalid}
		{rows}
		bind:value
		class="textarea-element"
		style:max-rows={maxRows}
		style:min-rows={minRows}
	></textarea>

	{#if label}
		<label for={id} class="floating-label">{label}</label>
	{/if}

	{#if endAdornment}{@render endAdornment()}{/if}

	{#if helperText}
		<p class="helper-text {error ? 'error' : ''}">{helperText}</p>
	{/if}
</div>

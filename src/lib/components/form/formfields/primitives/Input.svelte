<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/components/form/formfields/themes/Input.css';
	import { InputType } from '../types/input';

	let {
		name = '',
		type = InputType.TEXT,
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		autoFocus = false,
		autoComplete = false,
		id = '',
		ariaInvalid = false,
		ariaDescribedby = undefined as string | undefined,

		// Customization props
		variant = 'outlined', // 'outlined' | 'filled' | 'underline'
		size = 'medium', // 'small' | 'medium' | 'large'
		fullWidth = false,
		error = false,
		className = '',

		// adornments
		startAdornment = null as Snippet | null,
		endAdornment = null as Snippet | null,
		...props
	} = $props();
</script>

<div
	class={`input-root ${variant} ${size}
    ${error ? 'error' : ''} 
    ${disabled ? 'disabled' : ''} ${className}`}
>
	{#if startAdornment}{@render startAdornment()}{/if}

	<input
		{id}
		{name}
		{type}
		{placeholder}
		{disabled}
		{readonly}
		{required}
		autofocus={autoFocus}
		aria-describedby={ariaDescribedby}
		autocomplete={autoComplete ? 'on' : 'off'}
		bind:value
		aria-invalid={ariaInvalid}
		class="input-element"
		{...props}
	/>

	{#if endAdornment}{@render endAdornment()}{/if}
</div>

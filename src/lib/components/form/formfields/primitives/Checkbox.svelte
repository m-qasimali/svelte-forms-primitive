<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/components/form/formfields/themes/Checkbox.css';

	let {
		// Data
		id = crypto.randomUUID(),
		name = '',
		value = 'on',
		checked = $bindable(),
		indeterminate = false,
		required = false,

		// Behavior
		disabled = false,

		// Presentation
		size = 'medium', // "small" | "medium"
		color = 'primary', // "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info"
		className = '',
		icon = null as Snippet | null,
		checkedIcon = null as Snippet | null,
		indeterminateIcon = null as Snippet | null,
		label = '',

		// Accessibility
		ariaLabel = '',
		ariaLabelledby = ''
	} = $props();

	// reference to input element
	let inputEl: HTMLInputElement | null = null;

	// keep indeterminate reactive
	$effect(() => {
		if (inputEl) {
			inputEl.indeterminate = indeterminate;
		}
	});
</script>

<label
	class={`checkbox-root ${size} ${color} 
    ${checked ? 'checked' : ''} 
    ${indeterminate ? 'indeterminate' : ''} 
    ${disabled ? 'disabled' : ''} ${className}`}
>
	<input
		bind:this={inputEl}
		{id}
		type="checkbox"
		{name}
		bind:checked
		{value}
		{disabled}
		{required}
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledby}
		class="checkbox-input"
	/>

	<span class="checkbox-icon">
		{#if indeterminate}
			{#if indeterminateIcon}{@render indeterminateIcon()}{:else}—{/if}
		{:else if checked}
			{#if checkedIcon}{@render checkedIcon()}{:else}✔{/if}
		{:else if icon}{@render icon()}{:else}◻{/if}
	</span>

	{#if label}
		<span class="checkbox-label">{label}</span>
	{/if}
</label>

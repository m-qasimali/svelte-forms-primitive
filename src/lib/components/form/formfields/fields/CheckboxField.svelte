<script lang="ts">
	import Checkbox from '../primitives/Checkbox.svelte';

	let {
		// Data
		name = '',
		value = 'on',
		checked = $bindable(false),
		indeterminate = false,

		// Behavior
		required = false,
		disabled = false,

		// Presentation
		label = '',
		helperText = '',
		error = false,
		size = 'medium', // "small" | "medium"
		color = 'primary', // "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info"
		className = '',

		// Accessibility
		ariaLabel = '',
		ariaLabelledby = '',
		...props
	} = $props();
</script>

<div class={`checkbox-field ${error ? 'field-error' : ''} ${className}`}>
	<Checkbox
		{name}
		bind:checked
		{value}
		{indeterminate}
		{disabled}
		{required}
		{size}
		{color}
		{label}
		{ariaLabel}
		{ariaLabelledby}
		{...props}
	/>

	{#if helperText}
		<p class="helper-text {error ? 'error' : ''}">{helperText}</p>
	{/if}
</div>

<style>
	.checkbox-field {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin: 6px 0;
	}
	.helper-text {
		font-size: 12px;
		color: #666;
		margin-left: 28px;
	}
	.helper-text.error {
		color: #d32f2f;
	}
</style>

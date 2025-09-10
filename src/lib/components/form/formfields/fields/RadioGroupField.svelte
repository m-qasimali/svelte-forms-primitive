<script lang="ts">
	import RadioGroup from '../primitives/RadioGroup.svelte';

	let { label = '', value = $bindable(), helperText = '', error = false, ...restProps } = $props();
</script>

<div class="radio-field">
	{#if label}
		<label class="field-label">{label}</label>
	{/if}

	<RadioGroup {...restProps} bind:value className={error ? 'error' : ''} />

	{#if helperText}
		<p class="helper-text {error ? 'error' : ''}">{helperText}</p>
	{/if}
</div>

<style>
	.radio-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.field-label {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 0.25rem;
	}

	.helper-text {
		font-size: 12px;
		color: #666;
	}
	.helper-text.error {
		color: #d32f2f;
	}
</style>

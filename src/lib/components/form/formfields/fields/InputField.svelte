<script lang="ts">
	import Input from '../primitives/Input.svelte';
	import type { Snippet } from 'svelte';
	import { InputType } from '../types/input';

	let {
		// data
		name,
		value = $bindable(''),
		label = '',
		description = '',
		error: errorText = '',
		placeholder = '',
		type = InputType.TEXT,

		// behavior
		required = false,
		disabled = false,
		readonly = false,
		autoComplete = false,
		autoFocus = false,

		// presentation
		id = '',
		variant = /** 'outlined' | 'filled' | 'underline' */ 'outlined',
		size = /** 'small' | 'medium' | 'large' */ 'medium',
		fullWidth = false,
		layout = /** 'stacked' | 'inline' */ 'stacked',
		className = '',
		labelSuffix = null as Snippet | null,
		start = null as Snippet | null,
		end = null as Snippet | null,
		...props
	} = $props();

	let showPassword = $state(false);

	// ids for a11y
	const descId = $state(`${name ?? 'input'}-desc`);
	const msgId = $state(`${name ?? 'input'}-msg`);

	// generate a stable id if not provided
	$effect(() => {
		if (!id) id = `${name ?? 'input'}-${Math.random().toString(36).slice(2)}`;
	});

	const ariaDescribedBy = $derived(
		[description ? descId : null, errorText ? msgId : null].filter(Boolean).join(' ') || undefined
	);
</script>

{#snippet endAdornment()}
	{#if type === InputType.PASSWORD}
		<button type="button" class="toggle-password" onclick={() => (showPassword = !showPassword)}>
			{showPassword ? '🙈' : '👁️'}
		</button>
	{/if}
	{#if end}{@render end()}{/if}
{/snippet}

<div
	class={`field ${layout} ${errorText ? 'field--error' : ''} ${fullWidth ? 'field--full' : ''} ${className}`}
>
	{#if label}
		<label class="field__label" for={id}>
			{label}{required ? ' *' : ''}
			{#if labelSuffix}{@render labelSuffix()}{/if}
		</label>
	{/if}

	<div class="field__control">
		<Input
			{id}
			{name}
			type={type === InputType.PASSWORD && showPassword ? InputType.TEXT : type}
			bind:value
			{placeholder}
			{disabled}
			{readonly}
			{autoComplete}
			{autoFocus}
			{variant}
			{size}
			ariaInvalid={errorText ? true : false}
			ariaDescribedby={ariaDescribedBy}
			className="field-input"
			startAdornment={start}
			{endAdornment}
			{...props}
		/>
	</div>

	{#if description}
		<p id={descId} class="field__hint">{description}</p>
	{/if}

	{#if errorText}
		<p id={msgId} class="field__message">{errorText}</p>
	{/if}
</div>

<style>
	.toggle-password {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		padding: 0 0.5rem;
	}
</style>

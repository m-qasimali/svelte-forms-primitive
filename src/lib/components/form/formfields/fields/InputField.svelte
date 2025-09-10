<script lang="ts">
	import Input from '../primitives/Input.svelte';
	import type { Snippet } from 'svelte';
	import { InputType } from '../types/input';

	let {
		// data
		name,
		value = $bindable(),
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
		layout = /** 'stacked' | 'inline' | 'floating' */ 'stacked',
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

	// generate stable id if not provided
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
	<!-- stacked + inline behave normally -->
	{#if label && layout !== 'floating'}
		<label class="field__label" for={id}>
			{label}{required ? ' *' : ''}
			{#if labelSuffix}{@render labelSuffix()}{/if}
		</label>
	{/if}

	<div class="field__control">
		{#if layout === 'floating'}
			<div class="floating-wrapper">
				<Input
					{id}
					{name}
					type={type === InputType.PASSWORD && showPassword ? InputType.TEXT : type}
					bind:value
					placeholder=" "
					{disabled}
					{readonly}
					{autoComplete}
					{autoFocus}
					{variant}
					{size}
					ariaInvalid={!!errorText}
					ariaDescribedby={ariaDescribedBy}
					className="field-input"
					startAdornment={start}
					{endAdornment}
					{...props}
				/>
				<label for={id} class="floating-label">
					{label}{required ? ' *' : ''}
					{#if labelSuffix}{@render labelSuffix()}{/if}
				</label>
			</div>
		{:else}
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
				ariaInvalid={!!errorText}
				ariaDescribedby={ariaDescribedBy}
				className="field-input"
				startAdornment={start}
				{endAdornment}
				{...props}
			/>
		{/if}
	</div>

	{#if description}
		<p id={descId} class="field__hint">{description}</p>
	{/if}

	{#if errorText}
		<p id={msgId} class="field__message">{errorText}</p>
	{/if}
</div>

<style>
	/* password toggle button */
	.toggle-password {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		padding: 0 0.5rem;
	}

	.floating-wrapper {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		width: 100%;
	}

	.input-element {
		width: 100%;
		padding: 12px;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.floating-label {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: #777;
		transition: 0.2s ease all;
		background: white; /* prevent overlap with border */
		padding: 0 4px;
		pointer-events: none;
	}

	.floating-wrapper:focus-within .floating-label,
	.floating-wrapper.has-value .floating-label {
		top: -8px;
		left: 8px;
		font-size: 0.75rem;
		color: #333;
	}
</style>

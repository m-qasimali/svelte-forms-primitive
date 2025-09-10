<script lang="ts">
	import type { Snippet } from 'svelte';
	import Textarea from '../primitives/Textarea.svelte';

	let {
		// data
		name,
		value = $bindable(),
		label = '',
		description = '',
		error: errorText = '',
		placeholder = '',
		rows = 3,
		minRows = undefined as number | undefined,
		maxRows = undefined as number | undefined,

		// behavior
		required = false,
		disabled = false,
		readonly = false,
		autoFocus = false,

		// presentation
		id = '',
		variant = /** 'outlined' | 'filled' | 'standard' */ 'outlined',
		size = /** 'small' | 'medium' | 'large' */ 'medium',
		fullWidth = false,
		layout = /** 'stacked' | 'inline' | 'floating' */ 'stacked',
		className = '',
		labelSuffix = null as Snippet | null,
		start = null as Snippet | null,
		end = null as Snippet | null,
		...props
	} = $props();

	// ids for a11y
	const descId = $state(`${name ?? 'textarea'}-desc`);
	const msgId = $state(`${name ?? 'textarea'}-msg`);

	// generate a stable id if not provided
	$effect(() => {
		if (!id) id = `${name ?? 'textarea'}-${Math.random().toString(36).slice(2)}`;
	});

	const ariaDescribedBy = $derived(
		[description ? descId : null, errorText ? msgId : null].filter(Boolean).join(' ') || undefined
	);
</script>

<div
	class={`field ${layout} ${errorText ? 'field--error' : ''} ${fullWidth ? 'field--full' : ''} ${className}`}
>
	{#if label}
		<label class="field__label {layout === 'floating' ? 'floating' : ''}" for={id}>
			{label}{required ? ' *' : ''}
			{#if labelSuffix}{@render labelSuffix()}{/if}
		</label>
	{/if}

	<div class="field__control">
		<Textarea
			{id}
			{name}
			bind:value
			{placeholder}
			{disabled}
			{readonly}
			{autoFocus}
			{rows}
			{minRows}
			{maxRows}
			{variant}
			{size}
			ariaInvalid={errorText ? true : false}
			className="field-textarea"
			startAdornment={start}
			endAdornment={end}
			{...props}
		/>
	</div>

	{#if errorText}
		<p id={msgId} class="field__message">{errorText}</p>
	{/if}
</div>

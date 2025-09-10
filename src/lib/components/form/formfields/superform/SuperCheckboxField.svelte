<script lang="ts" module>
	import type { FormPath } from 'sveltekit-superforms';
	type T = Record<string, unknown>;
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Control, Field, Label, Description } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms';
	import FieldErrors from './FieldErrors.svelte';
	import Checkbox from '../primitives/Checkbox.svelte';

	let {
		form,
		name,
		label = '',
		description = '',
		helperText = '',
		...restProps
	}: {
		form: SuperForm<T>;
		name: U;
		label?: string;
		description?: string;
		helperText?: string;
		value?: string;
		required?: boolean;
		disabled?: boolean;
		indeterminate?: boolean;
		size?: 'small' | 'medium';
		color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
		className?: string;
	} = $props();

	const { form: formData } = form;
</script>

<Field {form} {name}>
	<Control>
		{#snippet children({ props })}
			<div class="checkbox-wrapper">
				<Checkbox {label} {...restProps} {...props} bind:checked={$formData[name]} />
			</div>
		{/snippet}
	</Control>

	{#if description}
		<Description>{description}</Description>
	{/if}

	{#if helperText}
		<p class="helper-text">{helperText}</p>
	{/if}

	<FieldErrors />
</Field>

<style>
	.checkbox-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.helper-text {
		font-size: 0.85rem;
		color: #666;
		margin-left: 1.75rem;
	}
</style>

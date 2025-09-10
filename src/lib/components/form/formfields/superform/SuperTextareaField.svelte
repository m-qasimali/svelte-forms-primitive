<script lang="ts" module>
	import type { FormPath } from 'sveltekit-superforms';
	type T = Record<string, unknown>;

	// the path/name of the field in the form object
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Control, Description, Field, Label } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms';
	import FieldErrors from './FieldErrors.svelte';
	import TextareaField from '../fields/TextareaField.svelte';

	let {
		form,
		name,
		label = '',
		description = '',
		...restProps
	}: {
		form: SuperForm<T>;
		name: U;
		label?: string;
		description?: string;
		rows?: number;
		minRows?: number;
		maxRows?: number;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		autoFocus?: boolean;
		variant?: 'outlined' | 'filled' | 'standard';
		size?: 'small' | 'medium' | 'large';
		fullWidth?: boolean;
		layout?: 'stacked' | 'inline' | 'floating';
		className?: string;
	} = $props();

	const { form: formData } = form;
</script>

<Field {form} {name}>
	<Control>
		{#snippet children({ props })}
			<TextareaField {label} {description} {...restProps} {...props} bind:value={$formData[name]} />
		{/snippet}
	</Control>

	<FieldErrors />
</Field>

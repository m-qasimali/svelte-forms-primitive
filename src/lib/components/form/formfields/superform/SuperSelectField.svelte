<script lang="ts" module>
	import type { FormPath } from 'sveltekit-superforms';
	type T = Record<string, unknown>;
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Field, Control, Label, Description } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms';
	import FieldErrors from './FieldErrors.svelte';
	import SelectField from '../fields/SelectField.svelte';

	let {
		form,
		name,
		label = '',
		description = '',
		options = [] as { value: string; label: string; disabled?: boolean }[],
		...restProps
	}: {
		form: SuperForm<T>;
		name: U;
		label?: string;
		description?: string;
		options?: { value: string; label: string; disabled?: boolean }[];
		helperText?: string;
		required?: boolean;
		variant?: 'outlined' | 'filled' | 'standard';
		fullWidth?: boolean;
		className?: string;
	} = $props();

	const { form: formData } = form;

	$effect(() => {
		console.log('form: ', $formData);
	});
</script>

<Field {form} {name}>
	<Control>
		{#snippet children({ props })}
			<Label>{label}</Label>
			<SelectField {label} {options} {...restProps} {...props} bind:value={$formData[name]} />
		{/snippet}
	</Control>

	{#if description}
		<Description>{description}</Description>
	{/if}

	<FieldErrors />
</Field>

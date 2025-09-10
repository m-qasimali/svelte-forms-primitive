<script lang="ts" module>
	import type { FormPath } from 'sveltekit-superforms';
	type T = Record<string, unknown>;
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Field, Control, Label, Description } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms';
	import FieldErrors from './FieldErrors.svelte';
	import RadioGroupField from '../fields/RadioGroupField.svelte';

	let {
		form,
		name,
		label = '',
		description = '',
		options = [] as { label: string; value: string }[],
		...restProps
	}: {
		form: SuperForm<T>;
		name: U;
		label?: string;
		description?: string;
		options?: { label: string; value: string }[];
		helperText?: string;
		className?: string;
	} = $props();

	const { form: formData } = form;
</script>

<Field {form} {name}>
	<Control>
		{#snippet children({ props })}
			<RadioGroupField
				{label}
				{description}
				{options}
				{...props}
				{...restProps}
				bind:value={$formData[name]}
			/>
		{/snippet}
	</Control>

	{#if description}
		<Description>{description}</Description>
	{/if}

	<FieldErrors />
</Field>

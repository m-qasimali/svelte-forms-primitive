<script lang="ts" module>
	import type { FormPath } from 'sveltekit-superforms';
	type T = Record<string, unknown>;
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Field, Control, Label, Description } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms';
	import FieldErrors from './FieldErrors.svelte';
	import Switch from '../primitives/Switch.svelte';

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
		disabled?: boolean;
		required?: boolean;
		color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default';
		size?: 'small' | 'medium';
		edge?: 'start' | 'end' | false;
		className?: string;
	} = $props();

	const { form: formData } = form;
</script>

<Field {form} {name}>
	<Control>
		{#snippet children({ props })}
			<Label>{label}</Label>

			<Switch {...restProps} {...props} bind:checked={$formData[name]} />
		{/snippet}
	</Control>

	{#if description}
		<Description>{description}</Description>
	{/if}

	<FieldErrors />
</Field>

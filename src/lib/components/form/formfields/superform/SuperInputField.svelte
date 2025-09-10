<script
	lang="ts"
	generics="T extends Record<string, unknown>, U extends import('sveltekit-superforms').FormPath<T>"
>
	import { Control, Description, Field, Label } from 'formsnap';

	import type { SuperForm } from 'sveltekit-superforms';
	import FieldErrors from './FieldErrors.svelte';
	import Input from '../primitives/Input.svelte';
	import InputField from '../fields/InputField.svelte';

	let {
		form,
		name,
		description = '',
		...restProps
	}: {
		form: SuperForm<T>;
		name: U;
		label: string;
		description?: string;
		type?: string;
		placeholder?: string;
		className?: string;
	} = $props();

	const { form: formData } = form;
</script>

<Field {form} {name}>
	<Control>
		{#snippet children({ props })}
			<InputField {...restProps} {description} {...props} bind:value={$formData[name]} />
		{/snippet}
	</Control>

	{#if description}
		<Description>{description}</Description>
	{/if}

	<FieldErrors />
</Field>

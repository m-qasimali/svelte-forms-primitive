<script lang="ts">
	import { Field, Control, Label, Description, Message } from 'formsnap';
	import Input from '../primitives/Input.svelte';

	let { name, form, label = '', placeholder = '', description = '' } = $props();
</script>

<Field {form} {name}>
	<Label>{label}</Label>

	<Control let:attrs>
		<Input {...attrs} {placeholder} />
	</Control>

	{#if description}
		<Description>{description}</Description>
	{/if}

	<Message />
</Field>

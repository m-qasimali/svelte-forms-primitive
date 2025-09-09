<script lang="ts">
	import { DateField, type WithoutChildrenOrChild } from 'bits-ui';
	import '$lib/components/form/formfields/themes/DateField.css';

	let {
		value = $bindable(),
		placeholder = $bindable(),
		name,
		labelText = 'Select a date',
		...restProps
	}: WithoutChildrenOrChild<DateField.RootProps> & {
		labelText: string;
		name?: string;
	} = $props();
</script>

<DateField.Root bind:value bind:placeholder {...restProps}>
	<div class="datefield-container">
		<DateField.Label class="datefield-label">{labelText}</DateField.Label>
		<DateField.Input {name} class="datefield-input">
			{#snippet children({ segments })}
				{#each segments as { part, value }, i (part + i)}
					<div class="datefield-segment-wrapper">
						{#if part === 'literal'}
							<DateField.Segment {part} class="datefield-segment-literal">
								{value}
							</DateField.Segment>
						{:else}
							<DateField.Segment {part} class="datefield-segment">
								{value}
							</DateField.Segment>
						{/if}
					</div>
				{/each}
			{/snippet}
		</DateField.Input>
	</div>
</DateField.Root>

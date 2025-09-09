<script lang="ts">
	import '$lib/components/form/formfields/themes/Toggle.css';

	let {
		value = '',
		groupValue = $bindable(), // comes from parent group
		exclusive = false,
		disabled = false,
		size = 'medium',
		color = 'standard',
		fullWidth = false,
		className = '',
		children // snippet
	} = $props();

	let selected = $state(false);

	// reactive effect: sync selected with groupValue
	$effect(() => {
		if (exclusive) {
			selected = groupValue === value;
		} else {
			selected = Array.isArray(groupValue) && groupValue.includes(value);
		}
	});

	function handleClick() {
		if (disabled) return;
		groupValue = value;
		console.log('ToggleButton clicked:', { value, groupValue, selected });
	}
</script>

<button
	type="button"
	aria-pressed={selected}
	{disabled}
	class="toggle-button {size} {color} {selected ? 'selected' : ''} {disabled
		? 'disabled'
		: ''} {fullWidth ? 'fullWidth' : ''} {className}"
	onclick={handleClick}
>
	{@render children?.()}
</button>

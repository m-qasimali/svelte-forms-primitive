<script lang="ts">
	import '$lib/components/form/formfields/themes/Toggle.css';

	let {
		exclusive = false,
		orientation = 'horizontal',
		disabled = false,
		size = 'medium',
		color = 'standard',
		fullWidth = false,
		className = '',
		children // snippet with render-props
	} = $props();
</script>

<div
	role="group"
	class="toggle-button-group {orientation} {disabled ? 'disabled' : ''} {className}"
>
	{@render children({
		exclusive,
		disabled,
		size,
		color,
		fullWidth
	})}
</div>

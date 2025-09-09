<script lang="ts">
	import '$lib/components/form/formfields/themes/Switch.css';

	let {
		checked = $bindable(false), // reactive, can be bound in parent
		disabled = false,
		required = false,
		id = crypto.randomUUID(),
		name = '',
		value = 'on',
		size = 'medium', // small | medium
		color = 'primary', // primary | secondary | success | error | info | warning | default
		edge: edge = false, // 'start' | 'end' | false
		className = ''
	} = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
	}
</script>

<label
	class="switch-root {size} {color} {checked ? 'checked' : ''} {disabled ? 'disabled' : ''} {edge
		? `edge-${edge}`
		: ''} {className}"
>
	<input
		type="checkbox"
		role="switch"
		class="switch-input"
		{id}
		{name}
		{value}
		{required}
		{disabled}
		{checked}
		on:change={handleChange}
	/>
	<span class="switch-track"></span>
	<span class="switch-thumb"></span>
</label>

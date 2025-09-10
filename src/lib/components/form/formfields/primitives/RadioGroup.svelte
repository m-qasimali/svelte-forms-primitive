<script lang="ts">
	import '$lib/components/form/formfields/themes/RadioGroup.css';

	let {
		name = '',
		value = $bindable(),
		options = [] as {
			value: string;
			label: string;
			disabled?: boolean;
		}[],
		row = false,
		size = 'medium', // small | medium | large
		color = 'primary', // primary | secondary | success | error | warning | info | default
		variant = 'outlined', // outlined | filled | standard
		disabled = false,
		className = ''
	} = $props();

	function handleChange(selected: string) {
		value = selected;
	}

	$effect(() => {
		console.log('value: ', value);
	});
</script>

<div
	role="radiogroup"
	class={`radio-group ${row ? 'row' : ''} ${disabled ? 'disabled' : ''} ${className}`}
>
	{#each options as opt}
		<label class={`radio-root ${size} ${color} ${opt.disabled || disabled ? 'disabled' : ''}`}>
			<input
				type="radio"
				{name}
				value={opt.value}
				checked={opt.value === value}
				disabled={opt.disabled || disabled}
				onchange={() => handleChange(opt.value)}
				class="radio-input"
			/>
			<span class={`radio-icon ${variant} ${opt.value === value ? 'checked' : ''}`}></span>
			<span class="radio-label">{opt.label}</span>
		</label>
	{/each}
</div>

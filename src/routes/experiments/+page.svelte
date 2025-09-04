<script lang="ts">
	import InputField from '$lib/components/form/formfields/fields/InputField.svelte';
	import { InputType } from '$lib/components/form/formfields/types/input';

	let password = $state('');
</script>

<h2>Password Field Demo</h2>

<InputField
	name="password"
	label="Password"
	type={InputType.PASSWORD}
	placeholder="Enter your password"
	bind:value={password}
	error={password && password.length < 6 ? 'At least 6 characters' : ''}
/>

<p>Live value: {password}</p>

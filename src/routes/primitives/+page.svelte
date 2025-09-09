<script lang="ts">
	import CheckboxField from '$lib/components/form/formfields/fields/CheckboxField.svelte';
	import InputField from '$lib/components/form/formfields/fields/InputField.svelte';
	import SelectField from '$lib/components/form/formfields/fields/SelectField.svelte';
	import TextareaField from '$lib/components/form/formfields/fields/TextareaField.svelte';
	import DatePicker from '$lib/components/form/formfields/primitives/DatePicker.svelte';
	import MyDateField from '$lib/components/form/formfields/primitives/MyDateField.svelte';
	import RadioGroup from '$lib/components/form/formfields/primitives/RadioGroup.svelte';
	import Switch from '$lib/components/form/formfields/primitives/Switch.svelte';
	import ToggleButton from '$lib/components/form/formfields/primitives/ToggleButton.svelte';
	import ToggleButtonGroup from '$lib/components/form/formfields/primitives/ToggleButtonGroup.svelte';
	import { InputType } from '$lib/components/form/formfields/types/input';
	import { parseDate } from '@internationalized/date';

	let birthday = $state(parseDate('2000-01-01'));
	let wifiEnabled = $state(true);
	let notifications = $state(false);
	let groupValue = $state('list');
	let age = $state('');
	let options = [
		{ value: '10', label: 'Ten' },
		{ value: '20', label: 'Twenty' },
		{ value: '30', label: 'Thirty' }
	];
	const radioOptions = [
		{ value: 'a', label: 'Option A' },
		{ value: 'b', label: 'Option B' },
		{ value: 'c', label: 'Option C' }
	];

	let outlined = $state('a');
	let filled = $state('b');
	let standard = $state('c');

	let checked1 = $state(false);
	let checked2 = $state(false);
	let checked3 = $state(false);
	let checked4 = $state(false);

	let bio = $state('');
	let email = $state('');
	let password = $state('');
	let username = $state('');
</script>

<h1>Date Picker Demo</h1>
<DatePicker />
<hr />

<h1>Custom Date Field</h1>

<MyDateField labelText="Birthday" bind:value={birthday} />
<p>Selected date: {birthday.toString()}</p>

<hr />

<h1>Switch Demo</h1>

<Switch bind:checked={wifiEnabled} color="primary" />
<span>Wi-Fi: {wifiEnabled ? 'On' : 'Off'}</span>

<br /><br />

<Switch bind:checked={notifications} color="success" size="small" />
<span>Notifications: {notifications ? 'Enabled' : 'Disabled'}</span>

<hr />

<h1>TOGGLE Demo</h1>
<ToggleButtonGroup exclusive>
	{#snippet children({ ...props })}
		<ToggleButton value="list" bind:groupValue {...props}>📋 List</ToggleButton>
		<ToggleButton value="module" bind:groupValue {...props}>🗂️ Module</ToggleButton>
		<ToggleButton value="quilt" bind:groupValue {...props}>🧩 Quilt</ToggleButton>
	{/snippet}
</ToggleButtonGroup>

<p>Selected view: {groupValue}</p>
<hr />

<h1>Select Field Demo</h1>
<SelectField
	label="Age"
	bind:value={age}
	{options}
	variant="outlined"
	fullWidth
	helperText="Please select your age."
/>

<p>Selected Age: {age}</p>
<hr />

<h1>Radio button Demo</h1>
<h3>Outlined Radios</h3>
<RadioGroup
	name="outlined-demo"
	{options}
	bind:value={outlined}
	variant="outlined"
	color="primary"
/>
<p>Selected: {outlined}</p>

<h3>Filled Radios</h3>
<RadioGroup name="filled-demo" {options} bind:value={filled} variant="filled" color="secondary" />
<p>Selected: {filled}</p>

<h3>Standard Radios</h3>
<RadioGroup
	name="standard-demo"
	{options}
	bind:value={standard}
	variant="standard"
	color="success"
/>
<p>Selected: {standard}</p>

<hr />

<h1>Checkbox Field Demo</h1>
<h2>Checkbox Variants</h2>

<CheckboxField label="Primary (default)" bind:checked={checked1} helperText="Helper text" />
<CheckboxField label="Secondary" bind:checked={checked2} color="secondary" />
<CheckboxField label="Success" bind:checked={checked3} color="success" />
<CheckboxField label="Error" bind:checked={checked4} color="error" helperText="Error state" error />

<h2>Disabled States</h2>
<CheckboxField label="Disabled checked" checked disabled />
<CheckboxField label="Disabled unchecked" disabled />

<h2>Indeterminate State</h2>
<CheckboxField label="Indeterminate" indeterminate />

<h2>Sizes</h2>
<CheckboxField label="Small checkbox" size="small" />
<CheckboxField label="Medium checkbox" size="medium" />

<hr />

<h1>Textarea Demo</h1>

<TextareaField
	name="bio"
	label="Biography"
	description="Tell us about yourself"
	placeholder="Start typing..."
	bind:value={bio}
	rows={4}
	variant="outlined"
	fullWidth
	error={bio.length < 10 ? 'At least 10 characters' : ''}
/>

<p>Live value: {bio}</p>

<hr />

<h1>Email Field</h1>
<InputField
	name="email"
	label="Email Address"
	type={InputType.EMAIL}
	layout="floating"
	bind:value={email}
	error={email && !email.includes('@') ? 'Invalid email' : ''}
/>
<hr />

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

<InputField
	name="username"
	label="Username"
	type={InputType.TEXT}
	placeholder="Enter username"
	bind:value={username}
>
	{#snippet start()}
		<span>start</span>
	{/snippet}
	{#snippet end()}
		<span>end</span>
	{/snippet}
</InputField>

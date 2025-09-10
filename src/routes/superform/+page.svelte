<script lang="ts">
	import SuperInputField from '$lib/components/form/formfields/superform/SuperInputField.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	import userProfileSchema from '$lib/schemas/userProfile';
	import { InputType } from '$lib/components/form/formfields/types/input';
	import SuperTextareaField from '$lib/components/form/formfields/superform/SuperTextareaField.svelte';
	import SuperCheckboxField from '$lib/components/form/formfields/superform/SuperCheckboxField.svelte';
	import SuperRadioGroupField from '$lib/components/form/formfields/superform/SuperRadioGroupField.svelte';
	import SuperSelectField from '$lib/components/form/formfields/superform/SuperSelectField.svelte';
	import SuperSwitchField from '$lib/components/form/formfields/superform/SuperSwitchField.svelte';
	import SuperDatePickerField from '$lib/components/form/formfields/superform/SuperDatePickerField.svelte';

	let { data } = $props<{ data: { form: any } }>();

	const form = superForm(data.form, {
		validators: valibotClient(userProfileSchema),
		validationMethod: 'oninput',
		customValidity: false,
		scrollToError: 'smooth'
	});

	const genderOptions = [
		{ label: 'Male', value: 'male' },
		{ label: 'Female', value: 'female' },
		{ label: 'Other', value: 'other' }
	];
</script>

<form method="POST" use:form.enhance class="space-y-6">
	<SuperInputField {form} name="name" label="Name" type={InputType.TEXT} />
	<SuperInputField {form} name="email" type={InputType.EMAIL} label="Email" />
	<SuperInputField {form} name="password" type={InputType.PASSWORD} label="Password" />

	<hr />
	<SuperTextareaField
		{form}
		name="bio"
		label="Your Bio"
		rows={4}
		description="Share a little about yourself..."
	/>

	<hr />
	<SuperRadioGroupField {form} name="gender" label="Gender" options={genderOptions} />

	<hr />

	<SuperCheckboxField {form} name="acceptTerms" label="I accept the Terms & Conditions" />

	<hr />

	<SuperSelectField
		{form}
		name="country"
		label="Country"
		options={[
			{ value: 'pk', label: 'Pakistan' },
			{ value: 'us', label: 'United States' },
			{ value: 'uk', label: 'United Kingdom' }
		]}
	/>

	<hr />

	<SuperSwitchField
		{form}
		name="notifications"
		label="Enable notifications"
		description="Turn on to get notified about updates"
	/>

	<SuperDatePickerField
		{form}
		name="birthday"
		label="Birthday"
		description="Pick your date of birth"
	/>

	<button class="btn" type="submit">Submit</button>
</form>

<style>
	.btn {
		padding: 0.5rem 1rem;
		background-color: #4f46e5;
		color: white;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 1rem;
		margin-top: 2rem;
	}
	.btn:hover {
		background-color: #4338ca;
	}
	form {
		max-width: 400px;
		margin: 2rem auto;
	}
</style>

// +page.server.ts
import { superValidate } from 'sveltekit-superforms/server';
import { valibot } from 'sveltekit-superforms/adapters';
import userProfileSchema from '$lib/schemas/userProfile';

export const load = async () => {
	const form = await superValidate(valibot(userProfileSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(userProfileSchema));

		if (!form.valid) {
			// Return errors back to form
			return { form };
		}

		// ✅ process form data (save to DB, API, etc.)
		console.log('Form submitted:', form.data);

		return { form };
	}
};

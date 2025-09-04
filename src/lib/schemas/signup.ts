import { object, string, minLength, regex } from 'valibot';

export const signupSchema = object({
	username: string([
		minLength(3, 'Username must be at least 3 characters long'),
		regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed')
	])
});

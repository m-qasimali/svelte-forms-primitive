import { boolean, check, email, enum_, minLength, object, pipe, string } from 'valibot';

enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

const userProfileSchema = object({
	name: pipe(string(), minLength(2, 'Name must be at least 2 characters')),
	email: pipe(string(), email('Invalid email address')),
	password: pipe(string(), minLength(6, 'Password must be at least 6 characters')),

	bio: pipe(string(), minLength(10, 'Bio must be at least 10 characters')),
	acceptTerms: pipe(
		boolean(),
		check((val) => val === true, 'You must accept the terms and conditions')
	),
	gender: pipe(
		enum_(Gender),
		check((val) => val !== undefined && val !== null, 'Gender is required')
	),
	country: pipe(
		string(),
		check((val) => val !== undefined && val !== null && val !== '', 'Country is required')
	),
	notifications: pipe(
		boolean(),
		check((val) => val === true, 'you must turn on notifications')
	),
	birthday: pipe(
		string(),
		check((val) => val !== undefined && val !== null && val !== '', 'DOB is required')
	)
});

export default userProfileSchema;

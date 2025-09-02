// import * as z from 'zod';

// const SignupSchema = z.object({
//   firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }).max(100),
//   middleName: z.string().max(100),
//   lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }).max(100),
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(100),
//   confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 characters long" }).max(100),
//   phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{3}$/, {
//       message: 'Phone number must have 9 digits',
//     }),
//   dob: z.iso.date({ message: "Invalid date of birth" }),
//   pob: z.string().min(2, { message: "Place of Birth must be at least 2 characters long" }).max(100),
//   gender: z.enum(['Male', 'Female'], { message: "Invalid gender" }),
//   region: z.string().min(2, { message: "Region must be at least 2 characters long" }).max(100),
//   birthRegion: z.string().min(2, { message: "Birth Region must be at least 2 characters long" }).max(100),
//   streetAddress: z.string().min(2, { message: "Street Address must be at least 2 characters long" }).max(100),
//   city: z.string().min(2, { message: "City must be at least 2 characters long" }).max(100),
//   idCardNumber: z.string().min(2, { message: "ID Card Number must be at least 2 characters long" }).max(100),
//   voterCardNumber: z.string().min(2, { message: "Voter Card Number must be at least 2 characters long" }).max(100),
// });

// export default SignupSchema;


import { z } from 'zod';

export const Step1Schema = z.object({
  firstName: z.string().min(2, 'First must be atleast 2 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last must be atleast 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{3}$/, 'Phone number must be in the format (000) 000-000'),
  dob: z.string().min(2, 'Date of birth is required'),
  pob: z.string().min(2, 'Place of birth is required'),
  gender: z.enum(['Male', 'Female'], { message: "Invalid gender" }),
  birthRegion: z.enum(['North West', 'South', 'East', 'West', 'Litoral', 'Centre', 'North', 'South West', 'Adamawa', 'Far North'], { message: "Invalid birth region" }),
});

export const Step2Schema = z.object({
  streetAddress: z.string().min(2, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  region: z.enum(['North-West', 'South', 'East', 'West', 'Litoral', 'Centre', 'North', 'South-West', 'Adamawa', 'Far-North'], { message: "Invalid region" }),
});

export const Step3Schema = z.object({
  idCardNumber: z.string().min(2, 'ID card number is required'),
  voterCardNumber: z.string().optional(),
});

export const Step4Schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});


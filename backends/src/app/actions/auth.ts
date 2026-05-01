'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/app/lib/session';
import { LoginFormSchema, SignupFormSchema, User } from '@/app/lib/definitions';

// Mock DB - In a real app, this would be a database call
const users: User[] = [
  {
    id: '1',
    username: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // In real app, this is hashed
    role: 'ADMIN',
  },
];

export async function signup(formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  // Simulate password encryption and DB insertion
  const newUser: User = {
    id: Math.random().toString(36).substring(7),
    username,
    email,
    password, 
    role: 'USER',
  };

  users.push(newUser);

  await createSession(newUser.id, newUser.role);
  redirect('/dashboard');
}

export async function login(formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // Simulate DB lookup
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return {
      errors: {
        email: ['Invalid credentials.'],
      },
    };
  }

  await createSession(user.id, user.role);
  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}

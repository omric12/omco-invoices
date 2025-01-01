'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  try {
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();

    // Set cookie using next/headers
    const cookieStore = await cookies();
    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    redirect('/dashboard');
  } catch (error: any) {
    return {
      error: error.message || 'An error occurred during login',
    };
  }
}

export async function register(formData: FormData) {
  try {
    const payload = {
      email: formData.get('emailAddress'),
      password: formData.get('password'),
    };

    // console.log('Request payload:', payload); // Debug payload

    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Registration failed');
    }

    // Return success instead of redirect
    return {
      success: true,
      message: 'Registration successful',
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred during registration',
    };
  }
}

export async function logout() {
  const cookieStore = cookies();
  // Delete the token cookie by setting it to expire immediately
  cookieStore.set('token', '', {
    expires: new Date(0),
    path: '/',
  });

  redirect('/');
}

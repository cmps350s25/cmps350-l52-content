import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.JWT_SECRET;

export async function sign(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(secretKey);
}

export async function verify(authToken = '') {
  try {
    const { payload } = await jwtVerify(authToken, secretKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(user) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await sign({ user, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set('auth_token', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/',
  });

  redirect('/dashboard');
}

export async function verifySession() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')?.value;
  const user = await verify(authToken);

  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function updateSession() {
  const cookieStore = await cookies();
  const authToken = cookies().get('auth_token')?.value;
  const user = await verify(authToken);

  if (!authToken || !user) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore().set('auth_token', authToken, {
    httpOnly: true,
    secure: true,
    expires: expires,
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  redirect('/login');
}

import 'server-only';
import { cookies } from 'next/headers';
import type { SessionPayload } from './definitions';

const secretKey = process.env.SESSION_SECRET || 'a-very-secret-key-that-should-be-in-env';

export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = JSON.stringify({ userId, role, expiresAt });

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;

  try {
    const session = JSON.parse(cookie) as SessionPayload;
    return session;
  } catch (e) {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

import { clearCookieHeader, methodNotAllowed } from '../lib/ctAuth';

// Drops the refresh cookie. Access tokens are short-lived and simply expire;
// CT token revocation can be added here later if needed.
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return methodNotAllowed();

  return new Response(null, {
    status: 204,
    headers: { 'Set-Cookie': clearCookieHeader() },
  });
};

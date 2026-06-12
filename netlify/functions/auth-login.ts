import { errorJson, methodNotAllowed, projectKey, refreshCookieHeader, requestToken, tokenJson } from '../lib/ctAuth';

// Customer token via the password flow. Body: { email, password }.
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return methodNotAllowed();

  try {
    const { email, password } = (await req.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = await requestToken(`/oauth/${projectKey()}/customers/token`, {
      grant_type: 'password',
      username: email,
      password,
    });
    return tokenJson(token, token.refresh_token ? refreshCookieHeader(token.refresh_token) : undefined);
  } catch (error) {
    return errorJson(error);
  }
};

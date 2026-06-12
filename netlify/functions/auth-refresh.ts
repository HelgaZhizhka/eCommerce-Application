import { errorJson, methodNotAllowed, readRefreshCookie, requestToken, tokenJson } from '../lib/ctAuth';

// Exchanges the httpOnly refresh cookie for a fresh access token.
// CT keeps the refresh token stable, so the cookie is not reissued.
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return methodNotAllowed();

  const refreshToken = readRefreshCookie(req);
  if (!refreshToken) {
    return new Response(JSON.stringify({ message: 'No session to refresh' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = await requestToken('/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    return tokenJson(token);
  } catch (error) {
    return errorJson(error);
  }
};

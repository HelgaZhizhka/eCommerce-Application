import { errorJson, methodNotAllowed, projectKey, refreshCookieHeader, requestToken, tokenJson } from '../lib/ctAuth';

// Anonymous session token (cart for guests). Refresh token goes into an
// httpOnly cookie — the browser never sees it.
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return methodNotAllowed();

  try {
    const token = await requestToken(`/oauth/${projectKey()}/anonymous/token`, {
      grant_type: 'client_credentials',
    });
    return tokenJson(token, token.refresh_token ? refreshCookieHeader(token.refresh_token) : undefined);
  } catch (error) {
    return errorJson(error);
  }
};

import { errorJson, methodNotAllowed, requestToken, tokenJson, visitorScopes } from '../lib/ctAuth';

// App-level read-only token for catalog browsing (replaces the browser-side
// client_credentials flow that leaked the secret). No cookie: nothing to refresh,
// the browser just re-asks when it expires.
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return methodNotAllowed();

  try {
    const token = await requestToken('/oauth/token', {
      grant_type: 'client_credentials',
      scope: visitorScopes(),
    });
    return tokenJson(token);
  } catch (error) {
    return errorJson(error);
  }
};

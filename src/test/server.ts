import { setupServer } from 'msw/node';

import { handlers } from './handlers';

export const server = setupServer(...handlers);

// Records every outgoing request so tests can assert URL/query/body shape.
// Listeners are removed globally in setupTests' afterEach.
export const recordRequests = (): Request[] => {
  const calls: Request[] = [];
  server.events.on('request:start', ({ request }) => calls.push(request.clone()));
  return calls;
};

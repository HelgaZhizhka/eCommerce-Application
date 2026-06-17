import { useEffect, useState } from 'react';

// Replacement for MUI's useMediaQuery — subscribes to a media query and returns
// whether it currently matches. SSR-safe (defaults to false on the server).
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (): void => setMatches(mql.matches);

    onChange();
    mql.addEventListener('change', onChange);

    return (): void => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export function debounce<F extends (...args: never[]) => void>(func: F, delay: number): F {
  let inDebounce: NodeJS.Timeout | null = null;

  return function debouncedFunction(...args: Parameters<F>) {
    if (inDebounce !== null) {
      clearTimeout(inDebounce);
    }
    inDebounce = setTimeout(() => func(...args), delay);
  } as F;
}

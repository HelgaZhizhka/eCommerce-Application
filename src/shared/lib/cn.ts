import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// shadcn/ui standard className combiner: clsx + tailwind-merge.
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

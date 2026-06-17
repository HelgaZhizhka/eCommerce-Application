import type { CSSProperties } from 'react';

import fon1 from './images/fon1.png';

// Shared Tailwind class strings for the 3-step registration wizard (was
// Registration.module.scss). The active progress segment renders the fon1
// decoration above it via an ::after that reads the image from a CSS variable.
export const progressContainerClass = 'mb-[14px] mt-11 flex gap-3';
export const progressClass = 'h-3 w-full bg-spicy-orange';
export const progressActiveClass =
  'relative bg-spicy-orange-active after:absolute after:bottom-full after:left-0 after:h-[50px] after:w-20 after:bg-contain after:bg-no-repeat after:[background-image:var(--reg-fon)] after:content-[""]';
export const progressActiveStyle = { '--reg-fon': `url(${fon1})` } as CSSProperties;
export const btnLoginClass = 'my-4';
export const lineContainerClass = 'relative mb-4 mt-5 flex h-full items-center justify-center';
export const lineClass = 'absolute top-1/2 h-px w-full bg-gray';
export const textClass = 'z-[1] bg-body px-5';

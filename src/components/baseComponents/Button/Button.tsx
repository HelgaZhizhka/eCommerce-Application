import { forwardRef } from 'react';

import { cn } from '../../../shared/lib/cn';

type Variant = 'contained' | 'outlined' | 'text';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

// Tailwind replacement for MUI <Button>. variant maps to MUI's contained/
// outlined/text (default text, as MUI does); colour is the primary token.
const base =
  'inline-flex items-center justify-center gap-2 rounded px-4 py-1.5 font-medium uppercase transition-colors disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  contained: 'bg-primary text-white hover:bg-primary/90',
  outlined: 'border border-primary text-primary hover:bg-primary/5',
  text: 'text-primary hover:bg-primary/5',
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'text', fullWidth, className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], fullWidth && 'w-full', className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export default Button;

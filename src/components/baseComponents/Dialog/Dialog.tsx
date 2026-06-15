import { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../../../shared/lib/cn';

// Minimal shadcn-style Dialog on Radix. Replaces MUI Dialog/Modal — gives focus
// trap, Esc-to-close and scroll lock for free (phase 6 a11y). A built-in close
// button sits top-right; pass `hideClose` to omit it.
const Dialog = DialogPrimitive.Root;
const DialogTitle = DialogPrimitive.Title;
const DialogClose = DialogPrimitive.Close;

type ContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  hideClose?: boolean;
};

const DialogContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ContentProps>(
  ({ className, children, hideClose, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[1200] bg-black/50" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed top-1/2 left-1/2 z-[1300] max-h-[90vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded bg-panel p-6 text-content shadow-xl outline-none',
          className
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogClose
            aria-label="close"
            className="absolute top-2 right-2 z-10 text-gray transition-colors hover:text-content"
          >
            <X size={24} />
          </DialogClose>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

export { Dialog, DialogContent, DialogTitle, DialogClose };

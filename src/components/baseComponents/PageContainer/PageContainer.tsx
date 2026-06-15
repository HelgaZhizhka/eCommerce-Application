import { cn } from '../../../shared/lib/cn';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// Tailwind replacement for MUI <Container maxWidth="xl">: centered, capped at
// the theme's xl breakpoint (1440px) with MUI's default gutters (16px, 24px at
// sm+). className merges so pages can layer their own layout on top.
const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => (
  <div className={cn('mx-auto w-full max-w-[1440px] px-4 sm:px-6', className)}>{children}</div>
);

export default PageContainer;

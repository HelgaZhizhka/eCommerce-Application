import { cn } from '../../shared/lib/cn';

type Props = {
  className?: string;
  image: string;
  title: string;
  description: string;
};

const Feature: React.FC<Props> = ({ className, image, title, description }) => (
  <div
    className={cn(
      'relative mb-5 rounded p-5 text-white',
      'sm:min-h-[200px] sm:[padding:20px_250px_20px_20px]',
      'md:mb-0 md:w-[340px] md:[min-height:auto] md:[padding:150px_20px_20px]',
      '[&:nth-child(1)]:bg-blue [&:nth-child(2)]:bg-green [&:nth-child(3)]:bg-purple',
      className
    )}
  >
    <div className="absolute right-5 top-5 max-sm:hidden">
      <picture>
        <source media="(max-width: 1023px)" srcSet={image} />
        <img src={image} alt={title} />
      </picture>
    </div>
    <div>
      <div className="mb-2.5 mt-0 text-[28px]">{title}</div>
      <div>{description}</div>
    </div>
  </div>
);

export default Feature;

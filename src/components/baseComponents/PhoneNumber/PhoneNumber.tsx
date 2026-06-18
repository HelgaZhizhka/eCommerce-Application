import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.enum';
import { cn } from '../../../shared/lib/cn';

type Props = {
  children?: string;
  className?: string;
};

const PhoneNumber: React.FC<Props> = ({ children, className }) => {
  const cleanedPhoneNumber = children?.replace(/[^\d+]/g, '');

  return (
    <span className={cn('flex items-center', className)}>
      <Icon name={IconName.PHONE} width={32} height={32} className="icon mr-[5px]" />
      <a className="text-inherit" href={`tel: ${cleanedPhoneNumber}`}>
        {children}
      </a>
    </span>
  );
};

export default PhoneNumber;

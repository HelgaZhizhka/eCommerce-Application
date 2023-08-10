import { IconName } from './icon.enum';

type IconProps = {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, width = 24, height = 24, className, color }) => (
  <svg width={width} height={height} className={className} color={color}>
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;

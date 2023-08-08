import { IconProps } from './icon.type';

const Icon: React.FC<IconProps> = ({ name, width = 24, height = 24, className, color }) => (
  <svg width={width} height={height} className={className} color={color}>
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;

import { IconName } from './Icon.enum';

type Props = {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

const Icon: React.FC<Props> = ({ name, width = 24, height = 24, className, color }) => (
  <svg width={width} height={height} className={className} color={color}>
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;

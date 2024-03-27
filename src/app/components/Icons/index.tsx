import { SiWebmoney } from 'react-icons/si';
import { CiBeerMugFull } from 'react-icons/ci';

type IconProps = {
  children: React.ReactNode;
};

const Icons = function ({ children }: IconProps) {
  return { children };
};

Icons.logo = ({ ...props }) => {
  return <SiWebmoney {...props} />;
};
Icons.beer = ({ ...props }) => {
  return <CiBeerMugFull {...props} />;
};

export { Icons };

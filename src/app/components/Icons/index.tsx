import { SiWebmoney } from 'react-icons/si';
import { CiBeerMugFull } from 'react-icons/ci';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { GrIntegration } from 'react-icons/gr';

export function logo({ ...props }) {
  return <SiWebmoney {...props} />;
}
export function beer({ ...props }) {
  return <CiBeerMugFull {...props} />;
}
export function dashboard({ ...props }) {
  return <MdOutlineSpaceDashboard {...props} />;
}
export function integration({ ...props }) {
  return <GrIntegration {...props} />;
}

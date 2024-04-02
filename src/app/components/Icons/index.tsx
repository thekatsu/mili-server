import { SiWebmoney } from 'react-icons/si';
import { CiBeerMugFull } from 'react-icons/ci';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { GrIntegration } from 'react-icons/gr';

function logo({ ...props }) {
  return <SiWebmoney {...props} />;
}
function beer({ ...props }) {
  return <CiBeerMugFull {...props} />;
}
function dashboard({ ...props }) {
  return <MdOutlineSpaceDashboard {...props} />;
}
function integration({ ...props }) {
  return <GrIntegration {...props} />;
}

const Icon = function () {
  return <></>;
};

Icon.logo = logo;
Icon.beer = beer;
Icon.dashboard = dashboard;
Icon.integragion = integration;

export { Icon };

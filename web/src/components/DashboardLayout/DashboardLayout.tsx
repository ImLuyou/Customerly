import { useState } from 'react';

import { Box } from '@mui/material';

import ButtonAppBar from '../DashboardBar/DashboardBar';
import SideMenu from '../SideMenu/SideMenu';

const DashboardLayout = ({ children }) => {
  const [displaySideMenu, setDisplaySideMenu] = useState(false);
  const [displayTitle, setDisplayTitle] = useState('Dashboard');

  return (
    <>
      <ButtonAppBar
        onBurgerMenu={e => setDisplaySideMenu(e)}
        displaySideMenu={displaySideMenu}
        title={displayTitle}
      />
      <SideMenu
        drawerOpen={displaySideMenu}
        onClose={e => setDisplaySideMenu(false)}
        onLinkClick={e => setDisplayTitle(e)}
      />

      <Box sx={{ padding: '8px' }}>{children}</Box>
    </>
  );
};

export default DashboardLayout;

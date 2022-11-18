import React from 'react';

import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';

type Props = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  children: React.ReactNode;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
};

const MobileDrawer = ({
  mobileOpen,
  handleDrawerToggle,
  children,
  anchor = 'left',
}: Props) => {
  const drawerWidth = 240;

  return (
    <Box component="nav">
      <Drawer
        anchor={anchor}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;

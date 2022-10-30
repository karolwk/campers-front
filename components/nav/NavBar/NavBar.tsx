import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './NavBar.module.css';
import ScrollTop from '../../ui/ScrollTop/ScrollTop';
import MobileDrawer from '../../dialogs/Drawer/MobileDrawer';
import { Button, Box, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from '../../menu/MobileMenu/MobileMenu';
import { Navlinks } from '../../../shared/types';

interface Props {
  navLinks: Navlinks;
}

export default function NavBar({ navLinks }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={styles.navbar}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ pr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{ display: { xs: 'none', sm: 'block' } }}
            className={styles.menu}
          >
            {navLinks.map((item) => (
              <Button key={item.name} sx={{ color: '#000000' }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <MobileDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      >
        <MobileMenu navLinks={navLinks} />
      </MobileDrawer>
      <Toolbar id="back-to-top-anchor" />

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

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
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  links?: { name: string; address: string }[];
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ['Home', 'About', 'Contact'];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={styles.navbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Scroll to see button
          </Typography>
        </Toolbar>
      </AppBar>
      <MobileDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      >
        {drawer}
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

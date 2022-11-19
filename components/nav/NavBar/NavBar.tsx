import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './NavBar.module.css';
import ScrollTop from '../../ui/ScrollTop/ScrollTop';
import MobileDrawer from '../../dialogs/Drawer/MobileDrawer';
import {
  Button,
  Box,
  IconButton,
  useScrollTrigger,
  Container,
} from '@mui/material';
import { useAppSelector } from '../../../hooks/reduxHooks';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from '../../menu/MobileMenu/MobileMenu';
import { Navlinks } from '../../../shared/types';

import Link from 'next/link';

interface Props {
  navLinks: Navlinks;
}

interface ElevationProps {
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationProps) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    className: trigger ? styles.navbar2 : styles.navbar,
  });
}

export default function NavBar({ navLinks, ...props }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navData = useAppSelector((state) => state.pageData);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={styles.navbar}>
          <Container>
            <Toolbar className={styles.toolbar}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Logo
              </Typography>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ pr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                sx={{ display: { xs: 'none', md: 'block' } }}
                className={styles.menu}
              >
                <Box sx={{ paddingLeft: '10px', display: 'flex', gap: '20px' }}>
                  <Typography>{navData.email}</Typography>
                  <Typography>{navData.phone}</Typography>
                </Box>
                {navLinks.map((item) => (
                  <Link href={item.url} key={item.name} passHref>
                    <Button sx={{ color: '#000000', marginRight: '20px' }}>
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
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

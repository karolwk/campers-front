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
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { formatPhone } from '../../../utils/helpers';
import LogoImage from '../../../assets/LogoImage/LogoImage';

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
      <MobileDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      >
        <MobileMenu
          navLinks={navLinks}
          handleDrawerToggle={handleDrawerToggle}
        />
      </MobileDrawer>
      <ElevationScroll {...props}>
        <AppBar className={styles.navbar}>
          <Container component="nav">
            <Toolbar className={styles.toolbar}>
              <Box sx={{ flexGrow: 1 }}>
                <LogoImage href="/" width={150} />
              </Box>

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
                  <Typography className={styles.contactData}>
                    <EmailIcon color="primary" />
                    {navData.email}
                  </Typography>
                  <Typography className={styles.contactData}>
                    <PhoneIcon color="primary" />
                    {formatPhone(navData.phone)}
                  </Typography>
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

      <Toolbar id="back-to-top-anchor" />

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

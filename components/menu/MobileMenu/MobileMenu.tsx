import React, { useCallback, useEffect } from 'react';

import {
  ListItem,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Navlinks } from '../../../shared/types';
import LogoImage from '../../../assets/LogoImage/LogoImage';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';

type Props = {
  navLinks: Navlinks;
  handleDrawerToggle: () => void;
};

const MobileMenu = ({ navLinks, handleDrawerToggle }: Props) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <LogoImage width={130} href="/" onClick={handleDrawerToggle} />

      <Divider />
      <List>
        {navLinks.map((item) => (
          <Link key={item.name} href={item.url} passHref>
            <MuiLink underline="none">
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </MuiLink>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default MobileMenu;

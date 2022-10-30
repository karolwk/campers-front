import React from 'react';

import {
  ListItem,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Navlinks } from '../../../shared/types';

type Props = {
  navLinks: Navlinks;
  handleDrawerToggle?: () => void;
};

const MobileMenu = ({ navLinks, handleDrawerToggle }: Props) => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        M. na logo
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MobileMenu;

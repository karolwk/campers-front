import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from '@mui/material';
import React from 'react';

import { MainAmenities } from '../../../shared/types';

type Props = {
  items?: MainAmenities[];
  dense?: boolean;
  shorter?: boolean;
};

const ListWithIcon = ({ items, dense = false, shorter = false }: Props) => {
  if (!items) {
    return <></>;
  }

  return (
    <List dense={dense ? dense : shorter}>
      {items.map((item, index) => {
        if (shorter && index > 3) {
          return;
        }

        return (
          <ListItem key={item.name}>
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListWithIcon;

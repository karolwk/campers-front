import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import React from 'react';

import { MainAmenities } from '../../../shared/types';

type Props = {
  items?: MainAmenities[];
  dense?: boolean;
};

const ListWithIcon = ({ items, dense = false }: Props) => {
  if (!items) {
    return <></>;
  }

  return (
    <List dense={dense}>
      {items.map((item) => (
        <ListItem key={item.name}>
          <ListItemIcon>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ListWithIcon;

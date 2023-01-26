import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import React from 'react';
List;
type Props = {
  items?: string[];
  dense?: boolean;
};

const ListWithIcon = ({ items, dense = false }: Props) => {
  if (!items) {
    return <></>;
  }

  return (
    <List dense={dense}>
      {items.map((item) => (
        <ListItem key={item}>
          <ListItemIcon>
            <CheckBoxOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default ListWithIcon;

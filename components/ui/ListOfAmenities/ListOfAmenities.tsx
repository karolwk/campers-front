import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

import { BoxProps } from '@mui/material/Box';

interface Props extends BoxProps {
  title: string;
  amenities: string;
}
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import styles from './ListOfAmenities.module.css';

import { splitAmenities } from '../../../utils/helpers';

const ListOfAmenities = ({ title, amenities, ...rest }: Props) => {
  return (
    <Box {...rest}>
      <Typography variant="h2" align="center">
        {title}
      </Typography>
      <Divider sx={{ marginY: '1rem' }} />
      <Box className={styles.wrapper}>
        {splitAmenities(amenities).map((item) => {
          if (item) {
            return (
              <Box key={item} className={styles.amenitiy}>
                <CheckCircleOutlineOutlinedIcon />
                {item}
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default ListOfAmenities;

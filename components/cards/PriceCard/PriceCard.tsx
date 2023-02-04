import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import styles from './PriceCard.module.css';

type Props = {
  price: {
    price: number;
    sesons: string;
    info: string;
  };
};

const PriceCard = ({ price }: Props) => {
  return (
    <Box className={styles.container}>
      <Typography>{price.sesons}</Typography>
      <Typography className={styles.price}>
        {price.price + 'zł / doba'}
      </Typography>

      <Typography variant="caption">{price.info}</Typography>
    </Box>
  );
};

export default PriceCard;

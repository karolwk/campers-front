import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

type Props = {
  price: {
    price: number;
    season: string;
    info: string;
  };
};

const PriceCard = ({ price }: Props) => {
  return (
    <Box>
      <Typography>{price.price + 'zł / doba'}</Typography>
      <Typography>{price.season}</Typography>
      <Typography>{price.info}</Typography>
    </Box>
  );
};

export default PriceCard;

import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

import { Camper } from '../../../shared/types';
import NextImage from 'next/image';
import { formatPathtoGCS } from '../../../utils/helpers';

type Props = {
  camper: Camper;
};

const CamperCard = ({ camper }: Props) => {
  return (
    <Box>
      <Box>
        <NextImage
          src={formatPathtoGCS(camper.mainImage)}
          alt={camper.name + ' obraz'}
          height={100}
          width={100}
        ></NextImage>
      </Box>
      <Typography variant="h2">{camper.name}</Typography>
      {camper.mainAmenities?.map((amenity) => (
        <Box key={amenity.name}>
          <NextImage
            src={formatPathtoGCS(amenity.icon.iconPath)}
            height={32}
            width={32}
          />
          <Typography>{amenity.name}</Typography>
        </Box>
      ))}
      <Typography>{`od ${camper.price[0].price} zł/doba`} </Typography>
      <Button>Opis szczegółowy</Button>
    </Box>
  );
};

export default CamperCard;

import React from 'react';
import { Box, Typography, Icon, Button, Paper } from '@mui/material';
import styles from './CamperCard.module.css';
import { Camper } from '../../../shared/types';
import NextImage from 'next/image';
import { formatPathtoGCS, makeURLfromName } from '../../../utils/helpers';
import NextLink from 'next/link';

type Props = {
  camper: Camper;
};

const CamperCard = ({ camper }: Props) => {
  return (
    <Paper className={styles.camperBox} elevation={3}>
      <Box>
        <NextImage
          src={formatPathtoGCS(camper.mainImage)}
          alt={camper.name + ' obraz'}
          height={100}
          width={100}
        ></NextImage>
      </Box>
      <Typography variant="h6" align="center">
        {camper.name}
      </Typography>
      <Box>
        {camper.mainAmenities?.map((amenity) => (
          <Box key={amenity.name} className={styles.iconBox}>
            <Icon>{amenity.icon}</Icon>
            <Typography>{amenity.name}</Typography>
          </Box>
        ))}
      </Box>
      <Typography fontSize={19} marginY="1rem" color="primary">
        {`od ${camper.price[0].price} zł/doba`}
      </Typography>
      <NextLink href={'kampery/' + makeURLfromName(camper.name)} passHref>
        <Button variant="contained" color="success" size="large">
          Opis szczegółowy
        </Button>
      </NextLink>
    </Paper>
  );
};

export default CamperCard;

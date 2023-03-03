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
      <Box className={styles.topBox}>
        <Paper className={styles.imageWrapper}>
          <NextImage
            src={formatPathtoGCS(camper.mainImage)}
            alt={camper.name + ' obraz'}
            height={166}
            width={250}
          ></NextImage>
        </Paper>
        <Typography variant="h6" align="center" marginBottom="1rem">
          {camper.name}
        </Typography>
      </Box>

      <Box flex="1">
        {camper.mainAmenities?.map((amenity) => (
          <Box key={amenity.name} className={styles.iconBox}>
            <Icon>{amenity.icon}</Icon>
            <Typography>{amenity.name}</Typography>
          </Box>
        ))}
      </Box>
      <Box className={styles.bottomBox}>
        <Typography
          fontSize={19}
          marginY="1rem"
          color="primary"
          fontWeight={500}
        >
          {`od ${camper.price[0].price} zł/doba`}
        </Typography>
        <NextLink href={'kampery/' + makeURLfromName(camper.name)} passHref>
          <Button variant="contained" color="primary" size="large">
            Opis szczegółowy
          </Button>
        </NextLink>
      </Box>
    </Paper>
  );
};

export default CamperCard;

import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
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
    <Box className={styles.camperBox}>
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
        <Box key={amenity.name} className={styles.iconBox}>
          <NextImage
            src={formatPathtoGCS(amenity.icon.iconPath)}
            height={32}
            width={32}
          />
          <Typography>{amenity.name}</Typography>
        </Box>
      ))}
      <Typography>{`od ${camper.price[0].price} zł/doba`} </Typography>
      <NextLink href={'kampery/' + makeURLfromName(camper.name)} passHref>
        <Button>Opis szczegółowy</Button>
      </NextLink>
    </Box>
  );
};

export default CamperCard;

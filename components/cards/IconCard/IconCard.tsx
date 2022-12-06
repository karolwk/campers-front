import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { formatPathtoGCS } from '../../../utils/helpers';

type Props = {
  iconURL: string;
  iconTitle: string;
  iconDescription: string;
};

const IconCard = ({ iconURL, iconTitle, iconDescription }: Props) => {
  return (
    <Box>
      <Image
        src={formatPathtoGCS(`${iconURL}`)}
        width={100}
        height={100}
        alt={iconTitle + ' icon'}
      ></Image>
      <Typography>{iconTitle}</Typography>
      <Typography>{iconDescription}</Typography>
    </Box>
  );
};

export default IconCard;

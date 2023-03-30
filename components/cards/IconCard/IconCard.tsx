import React from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { formatPathtoGCS } from '../../../utils/helpers';
import styles from './IconCard.module.css';

type Props = {
  iconURL: string;
  iconTitle: string;
  iconDescription: string;
};

const IconCard = ({ iconURL, iconTitle, iconDescription }: Props) => {
  return (
    <Paper elevation={5} className={styles.iconContainer}>
      <Image
        src={formatPathtoGCS(`${iconURL}`)}
        width={100}
        height={100}
        alt={iconTitle + ' icon'}
      ></Image>

      <Typography className={styles.title}>{iconTitle}</Typography>
      <Divider className={styles.divider} />
      <Typography>{iconDescription}</Typography>
    </Paper>
  );
};

export default IconCard;

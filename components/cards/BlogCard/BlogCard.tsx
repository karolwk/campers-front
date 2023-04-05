import React from 'react';
import { Box, Typography, Paper, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import { formatPathtoGCS, makeDateFromTimeStamp } from '../../../utils/helpers';
import NextLink from 'next/link';

import styles from './BlogCard.module.css';
type Props = {
  title: string;
  imageUrl: string;
  timestamp: number;
  readTime: string;
  pageUrl: string;
};

const BlogCard = ({ title, imageUrl, timestamp, readTime, pageUrl }: Props) => {
  return (
    <Paper className={styles.blogBox}>
      <Box className={styles.thumbImageBox}>
        <NextLink href={'/blog/' + pageUrl} passHref>
          <MuiLink>
            <Image
              src={formatPathtoGCS(imageUrl)}
              alt="Blog thumbnail link to post"
              layout="fill"
              objectPosition="center"
              objectFit="cover"
            />
          </MuiLink>
        </NextLink>
      </Box>

      <Box className={styles.textBox}>
        <Typography fontSize={13}>
          {makeDateFromTimeStamp(timestamp)}
        </Typography>
        <NextLink href={'/blog/' + pageUrl} passHref>
          <MuiLink underline="none">
            <Typography fontSize="1.5rem" lineHeight="1.8rem" marginY="0.7rem">
              {title}
            </Typography>
          </MuiLink>
        </NextLink>

        <Box>
          <Typography marginBottom="0.5rem" fontSize={12}>
            {readTime}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default BlogCard;

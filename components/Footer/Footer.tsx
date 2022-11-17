import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import styles from './Footer.module.css';
import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

type Props = {};

const Footer = (props: Props) => {
  const pageData = useAppSelector((store) => store.pageData);

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Box>
          <Typography variant="subtitle1">Kontakt</Typography>
        </Box>

        <Box></Box>
        <Box></Box>
      </Container>
    </footer>
  );
};

export default Footer;

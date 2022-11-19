import { Box, Typography, Container, Button } from '@mui/material';
import Image from 'next/image';
import styles from './Footer.module.css';
import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

type Props = {};

const Footer = (props: Props) => {
  const pageData = useAppSelector((store) => store.pageData);

  return (
    <footer className={styles.footer}>
      <Container>
        <Box sx={{ position: 'relative' }}>
          <Typography variant="subtitle1">Kontakt</Typography>

          <Image src="/images/logo.png" alt="dia" width={172} height={92} />
        </Box>

        <Box></Box>
        <Box></Box>
      </Container>
    </footer>
  );
};

export default Footer;

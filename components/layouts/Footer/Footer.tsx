import { Box, Typography, Container, Button } from '@mui/material';
import Image from 'next/image';
import styles from './Footer.module.css';
import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import ReactMarkdown from 'react-markdown';
import { formatPhone } from '../../../utils/helpers';
import FooterCard from '../../cards/FooterCard/FooterCard';
import NextLink from 'next/link';
import { navLinks } from '../../../shared/links';
import { Link as MuiLink } from '@mui/material';
import { Facebook } from '@mui/icons-material';
import LogoImage from '../../../assets/LogoImage/LogoImage';

type Props = {};

const Footer = (props: Props) => {
  const pageData = useAppSelector((store) => store.pageData);

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <FooterCard title="Kontakt">
          <LogoImage href="/" width={172} />
          <Box>
            <Typography fontWeight="bold">{pageData.companyName}</Typography>
            <Typography>{pageData.companyaddress}</Typography>
            <Typography>
              {pageData.companyZipCode + ' ' + pageData.companyCity}
            </Typography>
          </Box>

          <Typography>{pageData.email}</Typography>
          <Typography>tel. +48 {formatPhone(pageData.phone)}</Typography>
        </FooterCard>
        <FooterCard title="Strony">
          {navLinks.map((link) => (
            <NextLink key={link.name} href={link.url} passHref>
              <MuiLink sx={{ display: 'block' }}>{link.name}</MuiLink>
            </NextLink>
          ))}
        </FooterCard>
        <FooterCard title="Sociale">test</FooterCard>
        <FooterCard title="">
          <Box className={styles.butonContainer}>
            <Button variant="outlined">Zadzwoń do nas</Button>
            <Button variant="outlined">Napisz do nas</Button>
            <Button variant="outlined">Zobacz na mapie</Button>
          </Box>
        </FooterCard>
      </Container>
    </footer>
  );
};

export default Footer;

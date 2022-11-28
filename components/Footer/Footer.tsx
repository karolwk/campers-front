import { Box, Typography, Container, Button } from '@mui/material';
import Image from 'next/image';
import styles from './Footer.module.css';
import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import ReactMarkdown from 'react-markdown';
import { formatPhone } from '../../utils/helpers';
import FooterCard from './FooterCard/FooterCard';
import NextLink from 'next/link';
import { navLinks } from '../../shared/links';
import { Link as MuiLink } from '@mui/material';

type Props = {};

const Footer = (props: Props) => {
  const pageData = useAppSelector((store) => store.pageData);

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <FooterCard title="Kontakt">
          <Image src="/images/logo.png" alt="dia" width={172} height={92} />
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

        <Box></Box>
        <Box></Box>
      </Container>
    </footer>
  );
};

export default Footer;

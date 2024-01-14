import { Box, Typography, Container, Button, IconButton } from '@mui/material';
import Image from 'next/image';
import styles from './Footer.module.css';
import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';

import { formatPhone } from '../../../utils/helpers';
import FooterCard from '../../cards/FooterCard/FooterCard';
import NextLink from 'next/link';
import { footerLinks } from '../../../shared/links';
import { Link as MuiLink } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LogoImage from '../../../assets/LogoImage/LogoImage';
import Grid2 from '@mui/material/Unstable_Grid2';
import ContactInfo from '../../ui/ContactInfo/ContactInfo';

type Props = {};

const Footer = (props: Props) => {
  const pageData = useAppSelector((store) => store.pageData);

  return (
    <footer className={styles.footer}>
      <Container>
        <Grid2 container spacing={5}>
          <Grid2 xs={12} sm={6} md={3}>
            <FooterCard title="Kontakt">
              <LogoImage href="/" width={172} />
              <ContactInfo
                companyName={pageData.companyName}
                companyAddress={pageData.companyaddress}
                zipCode={pageData.companyZipCode}
                city={pageData.companyCity}
                email={pageData.email}
                phone={pageData.phone}
              />
            </FooterCard>
          </Grid2>
          <Grid2 xs={12} sm={6} md={3}>
            <FooterCard title="Strony">
              {footerLinks.map((link) => (
                <NextLink key={link.name} href={link.url} passHref>
                  <MuiLink
                    className={styles.footerLink}
                    sx={{ display: 'block' }}
                  >
                    {link.name}
                  </MuiLink>
                </NextLink>
              ))}
            </FooterCard>
          </Grid2>
          <Grid2 xs={12} sm={6} md={3}>
            <FooterCard title="Social media">
              <IconButton
                href={pageData.facebook ? pageData.facebook : '#'}
                color="primary"
                aria-label="go to our facebook"
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton
                href={pageData.instagram ? pageData.instagram : '#'}
                color="primary"
                aria-label="go to our instagram"
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
              <IconButton
                href={pageData.pinterest ? pageData.pinterest : '#'}
                color="primary"
                aria-label="go to our pinterest"
              >
                <PinterestIcon fontSize="large" />
              </IconButton>
            </FooterCard>
          </Grid2>
          <Grid2 xs={12} sm={6} md={3}>
            <FooterCard title="">
              <Box className={styles.butonContainer}>
                <Button
                  variant="outlined"
                  href={`tel:${formatPhone(pageData.phone, true)}`}
                >
                  Zadzwoń do nas
                </Button>
                <NextLink href="/kontakt" passHref>
                  <Button variant="outlined">Napisz do nas</Button>
                </NextLink>
                <NextLink href="/kontakt" passHref>
                  <Button variant="outlined">Zobacz na mapie</Button>
                </NextLink>
              </Box>
            </FooterCard>
          </Grid2>
        </Grid2>
      </Container>
    </footer>
  );
};

export default Footer;

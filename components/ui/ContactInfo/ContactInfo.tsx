import { Box, Link as MuiLink, Typography } from '@mui/material';
import React, { memo } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import styles from './ContactInfo.module.css';
import { formatPhone } from '../../../utils/helpers';

type Props = {
  companyName: string;
  companyAddress: string;
  zipCode: string | null;
  city: string | null;
  email: string;
  phone: string;
};

const ContactInfo = ({
  companyName,
  companyAddress,
  zipCode,
  city,
  email,
  phone,
}: Props) => {
  return (
    <Box>
      <Typography fontSize="1.2rem" fontWeight={500}>
        {companyName}
      </Typography>
      <Typography>{companyAddress}</Typography>
      <Typography>{zipCode + ' ' + city}</Typography>
      <Box className={styles.emailAndPhone}>
        <EmailIcon color="primary" fontSize="small" />
        {email}
      </Box>
      <Box className={styles.emailAndPhone}>
        <PhoneIcon color="primary" fontSize="small" />
        <MuiLink href={`tel:${formatPhone(phone, true)}`} underline="none">
          {formatPhone(phone)}
        </MuiLink>
      </Box>
    </Box>
  );
};

export default memo(ContactInfo);

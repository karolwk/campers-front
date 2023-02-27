import { Button, Typography } from '@mui/material';
import React from 'react';

type Props = {
  companyName: string;
};

const InfoWindowText = ({ companyName }: Props) => {
  return (
    <>
      <Typography fontWeight={500} marginBottom="1rem" align="center">
        {companyName}
      </Typography>

      <Button href="https://goo.gl/maps/kmDoZT4ziohQ6hdY6" variant="outlined">
        Ustaw trasę dojazdu
      </Button>
    </>
  );
};

export default React.memo(InfoWindowText);

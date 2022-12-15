import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FaqMainPage } from '../../../shared/types';
type Props = {
  faq: FaqMainPage[];
};

const FaqAccordion = ({ faq }: Props) => {
  return (
    <Box>
      {faq.map((faq, index) => (
        <Accordion key={faq.question}>
          <AccordionSummary
            aria-controls={`faq-${index + 1}-pytanie`}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqAccordion;

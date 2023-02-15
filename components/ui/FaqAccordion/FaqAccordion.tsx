import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FaqAccordion.module.css';
import { FaqMainPage } from '../../../shared/types';
type Props = {
  faq: FaqMainPage[];
};

const FaqAccordion = ({ faq }: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (expanded && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [expanded]);

  return (
    <Box>
      {faq.map((faq, index) => (
        <Accordion
          key={faq.question}
          disableGutters
          className={styles.accordion}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            aria-controls={`faq-${index + 1}-content`}
            id={`faq-${index + 1}-header`}
            className={styles.accordionSummary}
            expandIcon={
              <ExpandMoreIcon
                fontSize="large"
                color="primary"
                className={styles.icon}
              />
            }
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <Typography ref={ref}> {faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqAccordion;

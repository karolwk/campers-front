import { Box, Typography, Container, Button } from '@mui/material';
import styles from './FooterCard.module.css';
type Props = {
  children: React.ReactNode;
  title: string;
};

const FooterCard = ({ children, title, ...rest }: Props) => {
  return (
    <Box className={styles.card}>
      <Typography fontSize={'20px'} fontWeight="bold">
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default FooterCard;

import { Box, Typography, Container, Button } from '@mui/material';
import styles from './FooterCard.module.css';
type Props = {
  children: React.ReactNode;
  title: string;
};

const FooterCard = ({ children, title, ...rest }: Props) => {
  return (
    <Box className={styles.card}>
      <Typography variant="h1" fontSize={20} fontWeight="bold">
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default FooterCard;

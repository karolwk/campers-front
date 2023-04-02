import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf, boolean } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextInput from '../FormTextInput/FormTextInput';
import { Box, Link as MuiLink, Slide, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styles from './ContactForm.module.css';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import AlertSnackBar from '../../ui/AlertSnackBar/AlertSnackBar';
import FormCheckBox from '../FormCheckbox/FormCheckbox';
import Dialog from '@mui/material/Dialog';
import PrivacyDialog from '../../dialogs/PrivacyDialog/PrivacyDialog';

const defaultValues = {
  firstName: '',
  email: '',
  phone: '',
  message: '',
  captchaToken: '',
  rodoAcceptance: false,
};

// Form schema rules object using zod
const formSchema = object({
  firstName: string().min(1, 'To pole jest wymagane'),
  email: string().min(1, 'Proszę podać email').email('Nieprawidłowy email'),
  // Regex for polish phone numbers and empty string
  phone: string()
    .regex(
      /^(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}$/,
      'Nieprawidłowy numer telefonu'
    )
    .optional(),
  message: string()
    .max(800, 'Treść wiadomosci jest za dluga! Maksimum znaków to 800')
    .min(1, 'Treść jest wymagana'),
  captchaToken: string().optional(),
  rodoAcceptance: boolean().refine((value) => value === true, {
    message: 'Pole wymagane',
  }),
});

// Infer the Schema to get the TS Type
export type FormSchema = TypeOf<typeof formSchema>;

type Props = {
  privacyContent: string;
};

const ContactForm = ({ privacyContent }: Props) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [alertBox, setAlertBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [openPrivacyDialog, setOpenPrivacyDialog] = useState(false);
  const handleClosePrivacyDialog = useCallback(() => {
    setOpenPrivacyDialog(false);
  }, []);
  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // If open we take focus on div to scroll
    if (openPrivacyDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openPrivacyDialog]);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if (!executeRecaptcha) {
      console.log('Exectute recaptcha not yet available');
      return;
    }
    try {
      const token = await executeRecaptcha('formSubmit');
      const dataToSend = { ...data, captchaToken: token };

      const res = await axios.post('/api/enquiry', dataToSend);
      const status = res.data.status;
      if (status === 'success') {
        setAlertBox(true);
        reset();
      } else {
        setErrorMessage(res.data.message);
        setAlertBox(true);
      }

      // console.log(res.data.message + status + ' response from api');
    } catch (error: any) {
      console.error(error);

      error.message
        ? setErrorMessage(error.message)
        : setErrorMessage(JSON.stringify(error));

      setAlertBox(true);
    }
  };

  return (
    <>
      <Dialog
        open={openPrivacyDialog}
        onClose={handleClosePrivacyDialog}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <PrivacyDialog
          handleClose={handleClosePrivacyDialog}
          currentRef={descriptionElementRef}
          content={privacyContent}
          ariaDescId="scroll-dialog-title"
          ariaTitleId="scroll-dialog-description"
        />
      </Dialog>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <AlertSnackBar
          open={alertBox}
          autoHideDuration={6000}
          successMsg="Formularz wysłany poprawnie!"
          errTitle="Podczas wysyłania formularza wystąpił bład:"
          errMsg={errorMessage}
          onClose={() => {
            setAlertBox(false), setErrorMessage(null);
          }}
        />
        <Grid2 marginBottom="1rem">
          <Typography className={styles.formTitle}>
            Napisz do nas wiadomość
          </Typography>
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <FormTextInput
              variant="filled"
              fullWidth
              required
              name="firstName"
              label="Imię"
              control={control}
              disabled={isSubmitting}
              errors={errors}
            />
          </Grid2>
          <Grid2 xs={12} sm={6} gap={2}>
            <FormTextInput
              variant="filled"
              fullWidth
              required
              name="email"
              label="Twój adres e-mail"
              control={control}
              disabled={isSubmitting}
              errors={errors}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormTextInput
              variant="filled"
              fullWidth
              name="phone"
              label="Telefon"
              control={control}
              disabled={isSubmitting}
              errors={errors}
            />
          </Grid2>
          <Grid2 xs={12}>
            <FormTextInput
              variant="filled"
              name="message"
              label="Twoja wiadomość"
              fullWidth
              required
              control={control}
              errors={errors}
              disabled={isSubmitting}
              multiline
              rows={5}
            />
          </Grid2>

          <Grid2 xs={12}>
            <FormCheckBox
              control={control}
              disabled={isSubmitting}
              errors={errors}
              required
              name="rodoAcceptance"
              label={
                <>
                  Zapoznałem się z{' '}
                  <MuiLink onClick={() => setOpenPrivacyDialog(true)}>
                    informacją o administratorze i przetwarzaniu danych
                  </MuiLink>
                  *
                </>
              }
            />
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Typography marginBottom="1rem">* - pola wymagane</Typography>

            <LoadingButton
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              loadingPosition="end"
              size="large"
              fullWidth
              loading={isSubmitting}
            >
              Wyślij
            </LoadingButton>
          </Grid2>
          <Grid2 xs={12}>
            <Typography fontSize={9} marginY="-10px">
              Ta strona jest chroniona przez reCAPTCHA i Google{' '}
              <MuiLink href="https://policies.google.com/privacy">
                Polityka prywatności
              </MuiLink>{' '}
              i Obowiązują{' '}
              <MuiLink href="https://policies.google.com/terms">
                Warunki korzystania z usługi
              </MuiLink>
              .
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default ContactForm;

import React, { useEffect, useState } from 'react';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { literal, object, string, TypeOf, number } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextInput from '../FormTextInput/FormTextInput';
import { Box, Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styles from './ContactForm.module.css';

import { ReCaptcha } from '../ReCaptchaButton/ReCaptchaButton';

type Props = {};

const defaultValues = {
  firstName: '',
  email: '',
  phone: '',
  message: '',
  captchaToken: '',
};

// Form schema rules object using zod
const formSchema = object({
  firstName: string().min(1, 'To pole jest wymagane'),
  email: string().min(1, 'Proszę podać email').email('Nieprawidłowy email'),
  // Regex for polish phone numbers and empty string
  phone: string()
    .regex(
      /^(|(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w))$/,
      'Nieprawidłowy numer telefonu'
    )

    .optional(),
  message: string()
    .max(800, 'Treść wiadomosci jest za dluga! Maksimum znaków to 800')
    .min(1, 'Treść jest wymagana'),
  captchaToken: string().optional(),
});

// Infer the Schema to get the TS Type
type FormSchema = TypeOf<typeof formSchema>;

const ContactForm = (props: Props) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
    register,
  } = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onVerifyCaptcha = (token: string) => {
    setValue('captchaToken', token);
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        reset();
      }, 2000);
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
        <Grid2 xs={12} sm={4}>
          <ReCaptcha onVerifyCaptcha={onVerifyCaptcha} />
          <Typography marginBottom="1rem">* - pola wymagane</Typography>

          <Button type="submit" variant="contained" size="large" fullWidth>
            Wyślij
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ContactForm;

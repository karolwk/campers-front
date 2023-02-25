import React from 'react';
import { Controller, FormState, Control, useFormState } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type Props = {
  name: string;
  control: Control<any>;
  errors?: any;
  formState?: FormState<any>;
} & TextFieldProps;

const CustomTextField = ({
  name,
  control,
  formState,
  errors,
  ...rest
}: Props) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...rest}
          {...field}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default CustomTextField;

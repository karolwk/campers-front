import {
  Checkbox,
  FormControl,
  FormControlLabelProps,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, FormState, Control, useFormState } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
type Props = {
  name: string;
  control: Control<any>;
  required?: boolean;
  errors?: any;
  formState?: FormState<any>;
} & Omit<FormControlLabelProps, 'control'>;

const FormCheckBox = ({
  name,
  control,
  required = false,
  formState,
  errors,
  ...rest
}: Props) => {
  return (
    <FormControl error={!!errors[name]}>
      <Controller
        render={({ field: { value, ...field } }) => (
          <FormControlLabel
            {...rest}
            control={
              <Checkbox required={required} {...field} checked={!!value} />
            }
          />
        )}
        name={name}
        control={control}
      />
      {errors[name] && (
        <Typography color="red">{errors[name].message}</Typography>
      )}
    </FormControl>
  );
};

export default FormCheckBox;

import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import React from 'react';

type Props = {
  onVerifyCaptcha: any;
};
//The CaptchaButton component uses the useGoogleReCaptcha hook to get the executeRecaptcha function,
//which it calls with the contact argument to execute the reCAPTCHA verification process.
// If executeRecaptcha returns a token, it calls onVerifyCaptcha with the token.

const CaptchaButton = ({ onVerifyCaptcha }: Props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const clickHandler = async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha('contact');

    onVerifyCaptcha(token);
  };

  return (
    <button onClick={clickHandler}>Please validate you are a human.</button>
  );
};

export const ReCaptcha = ({ onVerifyCaptcha }: Props) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_CLIENT_RECAPTACHA_API as string}
    scriptProps={{ defer: true }}
  >
    <CaptchaButton onVerifyCaptcha={onVerifyCaptcha} />
  </GoogleReCaptchaProvider>
);

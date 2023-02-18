import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../../../styles/Home.module.css';
import React from 'react';
import { Typography } from '@mui/material';

type Props = {
  children: React.ReactNode;
  metaTitle: string;
  metaDescription: string;
  pageTitle?: string;
  pageSubtitle?: string;
};

const Layout = ({
  children,
  metaTitle,
  metaDescription,
  pageTitle,
  pageSubtitle,
}: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {pageTitle && (
          <>
            <Typography variant="h1" textAlign="center" marginTop="2rem">
              {pageTitle}
            </Typography>
            {pageSubtitle && (
              <Typography
                variant="subtitle1"
                textAlign="center"
                marginBottom="2rem"
              >
                {pageSubtitle}
              </Typography>
            )}
          </>
        )}

        {children}
      </main>
    </div>
  );
};

export default Layout;

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../../../styles/Home.module.css';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const Layout = ({ children, title, description }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;

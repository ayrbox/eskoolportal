import { signOut } from 'next-auth/client';
import { FC, useEffect } from 'react';
import Head from 'next/head';
import { securePage } from '~/lib/securePage';

export const Logout: FC = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <>
      <Head>
        <title>Logout</title>
      </Head>

      <div className="vh-100 wh-100 d-flex justify-content-center">
        <h1>Logging out</h1>
      </div>
    </>
  );
};

export const getServerSideProps = securePage();

export default Logout;

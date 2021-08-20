import React from 'react';
import Layout from '~/components/Layout';
import { securePage } from '~/lib/securePage';

const MarksEntry = ({ user }) => {
  return (
    <Layout user={user} title="Marks Entry">
      <h1>hello</h1>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default MarksEntry;

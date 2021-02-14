import { FunctionComponent } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Container } from 'reactstrap';

import { securePage } from '~/lib/securePage';

const Index: FunctionComponent = () => {
  return (
    <Layout title="Dashboard">
      <Container>
        <h1>Welcome to eskoolPortal</h1>
      </Container>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default Index;

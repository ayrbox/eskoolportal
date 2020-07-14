import Link from 'next/link';
import Layout from '../components/Layout';
import Router from 'next/router';
import { Container } from 'reactstrap';

const Index = ({ students, classes }) => {
  return (
    <Layout>
      <Container>
        <h1>Welcome to eskoolPortal</h1>
        <Link href="/student/enroll">
          <a>Enroll New Student</a>
        </Link>
        <br />
        <Link href="/students">
          <a>Students List</a>
        </Link>
      </Container>
    </Layout>
  );
};

export default Index;

import Link from 'next/link';
import Layout from '../components/Layout';
import Router from 'next/router';

const Index = ({ students, classes }) => {
  return (
    <Layout>
      <h1>Welcome to eskoolPortal</h1>
      <Link href="/student/enroll">
        <a>Enroll New Student</a>
      </Link>
      <br />
      <Link href="/students">
        <a>Students List</a>
      </Link>
    </Layout>
  );
};

export default Index;

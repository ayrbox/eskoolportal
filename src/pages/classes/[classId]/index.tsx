import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@components/Layout';
import useSwr from 'swr';

import { securePage } from '~/lib/securePage';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ClassIndex = ({ user }) => {
  const router = useRouter();
  const { data, error } = useSwr(
    `/api/classes/${router.query.classId}`,
    fetcher
  );

  if (!data) return <h1>Loading...</h1>;

  return (
    <Layout user={user} title="Classes">
      <h1>Class</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href={`/classes/${data.id}/students`}>
        <a>View Students</a>
      </Link>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default ClassIndex;

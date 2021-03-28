import Link from 'next/link';
import Layout from '~/components/Layout';
import useSwr from 'swr';
import axios from 'axios';
import { Table } from 'reactstrap';

import { securePage } from '~/lib/securePage';

const fetcher = async (url) => axios.get(url).then((res) => res.data);

const SubjectIndex = ({ user }) => {
  const { data } = useSwr('/api/subjects', fetcher);

  if (!data) return <h1>Loading....</h1>;

  return (
    <Layout user={user} title="Subjects">
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, description }) => (
            <tr key={id}>
              <td>
                <Link href={`/subjects/${id}`}>
                  <a>{name}</a>
                </Link>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default SubjectIndex;

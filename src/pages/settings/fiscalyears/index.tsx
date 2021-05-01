import Link from 'next/link';
import Layout from '~/components/Layout';
import useSwr from 'swr';
import axios from 'axios';
import { Table } from 'reactstrap';

import { securePage } from '~/lib/securePage';
import { FiscalYear } from '~/database/entities/FiscalYear';

const fetcher = async (url: string) => axios.get(url).then(res => res.data);

const FiscalYearIndex = ({ user }) => {
  const { data } = useSwr<FiscalYear[], unknown>('/api/fiscalyears', fetcher);

  if (!data) return <h1>Loading....</h1>;

  return (
    <Layout user={user} title="Fiscal Year">
      <div className="d-flex justify-content-end my-3">
        <Link href="/settings/fiscalyears/new">
          <a className="btn btn-primary">New Fiscal Year</a>
        </Link>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Fiscal Year</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, startDate, endDate }) => (
            <tr key={id}>
              <td>
                <Link href={`/settings/fiscalyears/${id}`}>
                  <a>{name}</a>
                </Link>
              </td>
              <td>{startDate}</td>
              <td>{endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default FiscalYearIndex;

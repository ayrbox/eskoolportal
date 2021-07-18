import Link from "next/link";
import Layout from "~/components/Layout";
import useSwr from "swr";
import axios from "axios";

import { securePage } from "~/lib/securePage";

const fetcher = async (url: string) => axios.get(url).then((res) => res.data);

const Classes = ({ user }) => {
  const { data } = useSwr(`/api/classes/`, fetcher);

  if (!data) return <h1>Loading...</h1>;

  return (
    <Layout user={user} title="Class">
      <h1>Classes</h1>
      <Link href={`/students/`}>GO TO STUDENTS</Link>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/classes/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default Classes;

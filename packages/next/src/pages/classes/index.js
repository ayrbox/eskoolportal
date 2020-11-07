import Link from "next/link";
import Layout from "../../components/Layout";
import useSwr from "swr";
import axios from "axios";

// const fetcher = (url) => fetch(url).then((res) => res.json());
const fetcher = async (url) => axios.get(url).then((res) => res.data);

const Classes = () => {
  const { data, error } = useSwr(`/api/classes/`, fetcher);

  if (!data) return <h1>Loading...</h1>;

  return (
    <Layout>
      <h1>Classes</h1>
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

export default Classes;

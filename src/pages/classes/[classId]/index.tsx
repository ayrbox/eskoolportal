import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "~/components/Layout";
import useSwr from "swr";
import { User } from "@prisma/client";
import { FC } from "react";

import { securePage } from "~/lib/securePage";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface ClassPageProps {
  user: User;
}

const ClassIndex: FC<ClassPageProps> = ({ user }: ClassPageProps) => {
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

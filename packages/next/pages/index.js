import axios from 'axios';
import Link from 'next/link';

const Index = ({ students }) => {
  return (
    <main>
      <h1>Get all students</h1>
      <ol>
        {students.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/student/${id}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
};

Index.getInitialProps = async () => {
  const res = await axios.get('http://localhost:3000/api/students');
  return {
    students: res.data,
  };
};

export default Index;

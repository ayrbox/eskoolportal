import axios from 'axios';
import Link from 'next/link';

const Index = ({ student }) => {
  const { name } = student;
  return (
    <main>
      <h1>Students - {name}</h1>
      <pre>{JSON.stringify(student, null, 4)}</pre>
    </main>
  );
};

Index.getInitialProps = async ({ query }) => {
  const { id } = query;

  const res = await axios.get(`http://localhost:3000/api/student/${id}`);
  return {
    student: res.data,
  };
};

export default Index;

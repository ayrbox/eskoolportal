import Layout from '~/components/Layout';
import SubjectForm from '~/components/SubjectForm';
import type { Subject } from '~/database/entities/Subject';
import { securePage } from '~/lib/securePage';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewSubject = ({ user }) => {
  const router = useRouter();
  const newSubject: Partial<Subject> = {
    name: '',
    description: '',
  };

  const handleFormSubmit = async (subject: Subject) => {
    try {
      await axios.post('/api/subjects', subject);
      router.replace('/settings/subjects');
      return true;
    } catch (err) {
      console.error(err.response.message);
      return false;
    }
  };

  return (
    <Layout user={user} title="Subjects">
      <SubjectForm
        initialValues={newSubject as Subject}
        onFormSubmit={handleFormSubmit}
      />
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default NewSubject;

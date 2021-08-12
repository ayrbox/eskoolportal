import Layout from '~/components/Layout';
import useSwr, { mutate } from 'swr';
import axios from 'axios';
import { Table } from 'reactstrap';
import type { Subject } from '~/database/entities/Subject';
import ListPage from '~/components/ListPage';
import { securePage } from '~/lib/securePage';
import { FormState } from '~/types/FormMode';
import SubjectForm from '~/components/SubjectForm';

const fetcher = async (url: string) => axios.get(url).then((res) => res.data);

const SUBJECT_ENDPOINT = '/api/subjects';
const SubjectIndex = ({ user }) => {
  const { data } = useSwr('/api/subjects', fetcher);

  const handleFormSubmit = async (state: FormState<Subject>) => {
    try {
      if (state.mode === 'EDIT' && state.data.id) {
        await axios.put(`${SUBJECT_ENDPOINT}/${state.data.id}`, state.data);
      } else {
        await axios.post(SUBJECT_ENDPOINT, state.data);
      }
      mutate(SUBJECT_ENDPOINT);
      return true;
    } catch (err) {
      console.error('Handle error gracefully', err);
      return false;
    }
  };

  if (!data) return <h1>Loading....</h1>;

  return (
    <Layout user={user} title="Subjects">
      <ListPage<Subject> url="/api/subjects" onFormSubmit={handleFormSubmit}>
        {({ items, onItemClick, formState, onFormClose, onFormSubmit }) => (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {items.map((subject) => (
                  <tr key={subject.id}>
                    <td>
                      <a href="#" onClick={onItemClick(subject)}>
                        {subject.name}
                      </a>
                    </td>
                    <td>{subject.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {formState.isOpen && (
              <SubjectForm
                values={formState.data}
                onFormSubmit={onFormSubmit}
                onClose={onFormClose}
              />
            )}
          </>
        )}
      </ListPage>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default SubjectIndex;

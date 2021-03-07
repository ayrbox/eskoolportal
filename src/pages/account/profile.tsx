import Layout from '~/components/Layout';
import { securePage } from '~/lib/securePage';

const Profile = ({ user }) => {
  return (
    <Layout user={user} title="Account Profile">
      <div className="bg-white ">
        <h1>Test</h1>
      </div>
      <h1>Pag</h1>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = securePage();

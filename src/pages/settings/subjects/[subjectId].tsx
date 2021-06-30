import Layout from "~/components/Layout";
import SubjectForm from "~/components/SubjectForm";
import { Subject } from "~/database/entities/Subject";
import { securePage } from "~/lib/securePage";
import axios from "axios";
import { useRouter } from "next/router";

const EditSubjectPage = ({ user, subject }) => {
  const router = useRouter();

  const handleFormSubmit = async (updatedSubject: Subject) => {
    try {
      await axios.put(`/api/subjects/${subject.id}`, updatedSubject);
      router.replace("/settings/subjects");
      return true;
    } catch (err) {
      console.error(err.response.message);
      return false;
    }
  };
  return (
    <Layout user={user} title="Subjects">
      <SubjectForm initialValues={subject} onFormSubmit={handleFormSubmit} />
    </Layout>
  );
};

export const getServerSideProps = securePage(async (ctx, user) => {
  const subjectId = ctx.params.subjectId as string;
  const subject = await Subject.findOne({ id: subjectId });

  return {
    props: {
      subject: JSON.parse(JSON.stringify(subject)),
      user,
    },
  };
});

export default EditSubjectPage;

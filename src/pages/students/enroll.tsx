import { Row, Col } from "reactstrap";
import StudentProfileLayout from "~/components/PageLayouts/StudentProfileLayout";
import StudentForm from "~/components/StudentForm";
import axios from "axios";
import { useRouter } from "next/router";

// SSR
import { Class } from "~/database/entities/Class";
import { Section } from "~/database/entities/Section";
import { securePage } from "~/lib/securePage";
import type { Student } from "~/database/entities/Student";

const Enroll = ({ classes, sections, user }) => {
  const router = useRouter();
  const [defaultClass] = classes;
  const [defaultSection] = sections;

  const newStudent: Partial<Student> = {
    dateOfBirth: undefined,
    gender: "female",
    joinDate: undefined,
    classId: defaultClass.id,
    sectionId: defaultSection.id,
  };

  const handleFormikSubmit = async (values: Student) => {
    try {
      const { data } = await axios.post<Student>("/api/students/", values);
      router.replace(`/students/${data.id}`);
      console.log(data);
    } catch (err) {
      // TODO: toast error message
      console.error("Error enrolling new student", err);
    }
  };

  return (
    <StudentProfileLayout studentName="New Enrollment" user={user}>
      <Row>
        <Col lg={9}>
          <h3>Details</h3>
          <StudentForm
            formMode="ADD"
            classes={classes}
            sections={sections}
            initialValues={newStudent as Student}
            onFormSubmit={handleFormikSubmit}
          />
        </Col>
      </Row>
    </StudentProfileLayout>
  );
};

export const getServerSideProps = securePage(async (_, user) => {
  const classes = await Class.find();
  const sections = await Section.find();

  return {
    props: {
      classes: JSON.parse(JSON.stringify(classes)),
      sections: JSON.parse(JSON.stringify(sections)),
      user,
    },
  };
});

export default Enroll;

import { Row, Col } from "reactstrap";
import { Student } from "~/database/entities/Student";
import { Class } from "~/database/entities/Class";
import { Section } from "~/database/entities/Section";
import StudentProfileLayout from "~/components/PageLayouts/StudentProfileLayout";
import Panel from "~/components/Panel";
import axios from "axios";

import { securePage } from "~/lib/securePage";
import StudentForm from "~/components/StudentForm";

const Index = ({ student, classes, sections, user }) => {
  const { id, name } = student;

  const handleFormikSubmit = async (values: Student) => {
    const r = await axios.put(`/api/students/${id}`, values);
    console.log(r.data);
  };

  return (
    <StudentProfileLayout studentName={name} user={user}>
      <Row>
        <Col lg={9}>
          <Panel>
            <Row>
              <Col>
                <h3>Details</h3>
              </Col>
            </Row>
            <StudentForm
              formMode="EDIT"
              classes={classes}
              sections={sections}
              initialValues={student}
              onFormSubmit={handleFormikSubmit}
            />
          </Panel>
        </Col>
      </Row>
    </StudentProfileLayout>
  );
};

export const getServerSideProps = securePage(async (ctx, user) => {
  const id = ctx.params.id as string;

  const student = await Student.findOne({ id });
  const classes = await Class.find();
  const sections = await Section.find();

  return {
    student,
    classes,
    sections,
  };
});

export default Index;

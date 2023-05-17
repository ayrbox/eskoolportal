import { Row, Col } from "reactstrap";

import StudentProfileLayout from "~/components/PageLayouts/StudentProfileLayout";
import Panel from "~/components/Panel";
import axios from "axios";

import { securePage } from "~/lib/securePage";
import StudentForm from "~/components/StudentForm";
import prisma from "~/lib/prisma";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import { ClassGroup, Section, Student } from "@prisma/client";

interface EditStudentProps extends PagePropsWithUser {
  student: Student;
  classGroups: ClassGroup[];
  sections: Section[];
}

const Index = ({ student, classGroups, sections, user }: EditStudentProps) => {
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
              classes={classGroups}
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

export const getServerSideProps = securePage(async (ctx) => {
  const id = (ctx.params?.id as string) || "";

  const student = await prisma.student.findUnique({ where: { id } });
  const classGroups = await prisma.classGroup.findMany();
  const sections = await prisma.section.findMany();

  return {
    student,
    classGroups,
    sections,
  };
});

export default Index;

import { Row, Col } from "reactstrap";
import StudentProfileLayout from "~/components/PageLayouts/StudentProfileLayout";
import StudentForm from "~/components/StudentForm";
import axios from "axios";
import { useRouter } from "next/router";

import { securePage } from "~/lib/securePage";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import { ClassGroup, Prisma, Section, Student } from "@prisma/client";
import prisma from "~/lib/prisma";

interface EnrollProps extends PagePropsWithUser {
  classes: ClassGroup[];
  sections: Section[];
}

const Enroll = ({ classes, sections, user }: EnrollProps) => {
  const router = useRouter();
  const [defaultClass] = classes;
  const [defaultSection] = sections;

  const newStudent: Partial<Student> = {
    dateOfBirth: undefined,
    gender: "female",
    joinDate: undefined,
    classGroupId: defaultClass.id,
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

export const getServerSideProps = securePage(async () => {
  const classes = await prisma.classGroup.findMany();
  const sections = await prisma.section.findMany();

  return {
    classes,
    sections,
  };
});

export default Enroll;

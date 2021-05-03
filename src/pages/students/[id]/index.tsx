import { Row, Col } from 'reactstrap';
import { Student } from '~/database/entities/Student';
import { Class } from '~/database/entities/Class';
import { Section } from '~/database/entities/Section';
import StudentProfileLayout from '~/components/PageLayouts/StudentProfileLayout';
import Panel from '~/components/Panel';
import Link from 'next/link';

import { securePage } from '~/lib/securePage';
import { FunctionComponent } from 'react';
import { User } from 'next-auth';
import { FaEnvelopeOpen, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export interface ProfileProps {
  student: Student;
  user: User;
}

const Profile: FunctionComponent<ProfileProps> = ({
  student,
  user,
}: ProfileProps) => {
  const { id, name } = student;

  return (
    <StudentProfileLayout studentName={name} user={user}>
      <Row>
        <Col lg={9}>
          <Panel>
            <div className="d-flex justify-content-between">
              <h3>Student Profile</h3>
              <Link href={`/students/${id}/edit`}>Edit</Link>
            </div>

            <hr />

            <h3>{name}</h3>
            <address>
              <FaMapMarkerAlt />
              {student.address}
              <br />
              <FaPhoneAlt /> {student.contactNo}
              <br />
              <FaEnvelopeOpen /> {student.email}
            </address>
          </Panel>
        </Col>
      </Row>
      <Row>
        <Col>
          <pre>{JSON.stringify(student, null, 2)}</pre>
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
    props: {
      student: JSON.parse(JSON.stringify(student)),
      classes: JSON.parse(JSON.stringify(classes)),
      sections: JSON.parse(JSON.stringify(sections)),
      user,
    },
  };
});

export default Profile;

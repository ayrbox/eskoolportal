import Link from 'next/link';
import { Row, Col, Button, Form } from 'reactstrap';
import { Formik } from 'formik';
import { object, string, date, mixed } from 'yup';

import { Student, Class, Section } from '@eskoolportal/api/src/models';
import StudentProfileLayout from '@components/PageLayouts/StudentProfileLayout';
import FormItem from '@components/FormItem';
import FormSelect from '@components/FormSelect';
import IBox from '@components/IBox';

const studentSchema = object().shape({
  name: string().min(3).required('Name is required.'),
  dateOfBirth: date().required('Date of birth is required.'),
  gender: mixed().oneOf(['male', 'female']).required('Gender is requried.'),
  address: string().required('Address is required.'),
  email: string().email().required('Email is required to contact you.'),
  joinDate: date(),
  classRollNo: string(),
  contactNo: string().required(
    'Phone or any other contact number is required.'
  ),
  referenceCode: string(),
  classId: string().required('Please specify student class.'),
  sectionId: string().required('Please specify student section.'),
});

const Index = ({ student, classes, sections }) => {
  const {
    id,
    name,
    createdAt,
    updatedAt,
    dateOfBirth,
    gender,
    address,
    email,
    joinDate,
    classRollNo,
    contactNo,
    referenceCode,
    classId,
    sectionId,
  } = student;

  const data = {
    id,
    name,
    createdAt,
    updatedAt,
    dateOfBirth,
    gender,
    address,
    email,
    joinDate,
    classRollNo,
    contactNo,
    referenceCode,
    classId,
    sectionId,
  };

  return (
    <StudentProfileLayout studentName={name}>
      <Row>
        <Col lg={9}>
          <IBox>
            <Row>
              <Col>
                <h3>Details</h3>
              </Col>
            </Row>
            <Formik validationSchema={studentSchema} initialValues={data}>
              {({ values }) => (
                <Form>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <FormItem
                    id="referenceCode"
                    name="referenceCode"
                    label="ReferenceCode"
                    value={referenceCode}
                  />
                  <FormItem id="name" name="name" label="Name" value={name} />
                  <FormItem
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    type="email"
                  />
                  <FormItem
                    id="gender"
                    name="gender"
                    label="Gender"
                    value={gender}
                  />
                  <FormItem
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date Of Birth"
                    value={dateOfBirth}
                  />
                  <FormSelect name="classId" label="Class">
                    {classes.map(({ id, name: classDesc }) => (
                      <option key={id} value={id}>
                        {classDesc}
                      </option>
                    ))}
                  </FormSelect>
                  <FormSelect name="sectionId" label="Section">
                    {sections.map(({ id, name: sectionDesc }) => (
                      <option key={id} value={id}>
                        {sectionDesc}
                      </option>
                    ))}
                  </FormSelect>

                  <FormItem
                    id="classRollNo"
                    name="classRollNo"
                    label="Roll No"
                    value={classRollNo}
                  />
                  <FormItem
                    id="address"
                    name="address"
                    label="Address"
                    value={address}
                    type="textarea"
                    helpText="Enter full address"
                  />
                  <FormItem
                    id="contactNo"
                    name="contactNo"
                    label="Contact No"
                    value={contactNo}
                  />
                  <FormItem
                    id="joinDate"
                    name="joinDate"
                    label="Joined Date"
                    value={joinDate}
                  />
                </Form>
              )}
            </Formik>

            <Row>
              <Col lg={12} className="m-b-md">
                <Link href={`/students/${id}/edit`}>
                  <a className="btn btn-white btn-xs float-right">
                    Edit Detail
                  </a>
                </Link>
                <Button color="primary" className="float-right">
                  Save
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <dl className="row mb-0">
                  <div className="col-sm-4 text-sm-right">
                    <dt>Created:</dt>
                  </div>
                  <div className="col-sm-8 text-sm-left">
                    <dd className="mb-1">{createdAt}</dd>
                  </div>
                </dl>
                <dl className="row mb-0">
                  <div className="col-sm-4 text-sm-right">
                    <dt>Updated:</dt>
                  </div>
                  <div className="col-sm-8 text-sm-left">
                    <dd className="mb-1">{updatedAt}</dd>
                  </div>
                </dl>
              </Col>
            </Row>
          </IBox>
        </Col>
      </Row>
    </StudentProfileLayout>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const student = await Student.findByPk(id, { raw: true });

  const classes = await Class.findAll({ raw: true });
  const sections = await Section.findAll({ raw: true });

  console.log(student);

  ctx.isLoggedIn = true;
  if (!ctx.isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      student: JSON.parse(JSON.stringify(student)),
      classes: JSON.parse(JSON.stringify(classes)),
      sections: JSON.parse(JSON.stringify(sections)),
    },
  };
}

export default Index;

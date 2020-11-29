import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import { Formik } from 'formik';
import { object, string, date, mixed } from 'yup';

import { Class, Section } from '@eskoolportal/api/src/models';
import StudentProfileLayout from '@components/PageLayouts/StudentProfileLayout';
import FormItem from '@components/FormItem';
import FormSelect from '@components/FormSelect';
import IBox from '@components/IBox';
import axios from 'axios';

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

const Enroll = ({ classes, sections }) => {
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
    rollno,
    contactNo,
    referenceCode,
    classId,
    sectionId,
  } = {};

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
    rollno,
    contactNo,
    referenceCode,
    classId,
    sectionId,
  };

  const handleFormikSubmit = async (values) => {
    const r = await axios.post(`/api/students`, values);
    console.log(r.data);
    //TODO: redirect to students detail page
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
            <Formik
              validationSchema={studentSchema}
              initialValues={data}
              onSubmit={handleFormikSubmit}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <FormItem
                    id="referenceCode"
                    name="referenceCode"
                    label="ReferenceCode"
                    value={referenceCode}
                  />
                  <FormItem name="name" label="Name" />
                  <FormItem name="email" label="Email" type="email" />
                  <FormSelect name="gender" label="Gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </FormSelect>
                  <FormItem name="dateOfBirth" label="Date Of Birth" />
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
                  <FormItem name="rollno" label="Roll No" />
                  <FormItem name="address" label="Address" type="textarea" />
                  <FormItem name="contactNo" label="Contact No" />
                  <FormItem name="joinDate" label="Joined Date" />
                  <FormGroup row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              )}
            </Formik>
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
  const classes = await Class.findAll({ raw: true });
  const sections = await Section.findAll({ raw: true });

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
      classes: JSON.parse(JSON.stringify(classes)),
      sections: JSON.parse(JSON.stringify(sections)),
    },
  };
}

export default Enroll;

import axios from 'axios';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Formik } from 'formik';
import { object, string, date, mixed, number } from 'yup';

const formInitialValue = {
  name: 'new name',
  dateOfBirth: '2020-01-20',
  gender: 'Female',
  address: '20 test',
  email: 'test@hotmail.com',
  joinDate: '20/07/2020',
  classRollNo: 'tes2832',
  contactNo: '2020373837',
  referenceCode: '203402834',
  studentClass: 1,
  section: 'A',
};

const formSchema = object().shape({
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
  studentClass: number().required('Please specify student class.'),
  section: number().required('Please specify student section.'),
});

const Enroll = ({ classes, sections }) => {
  return (
    <Layout>
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top  "
          role="navigation"
          style={{ marginBottom: 0 }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn btn-primary "
              href="#"
            >
              <i className="fa fa-bars"></i> Search Icon
            </a>
            <form
              role="search"
              className="navbar-form-custom"
              action="search_results.html"
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search for something..."
                  className="form-control"
                  name="top-search"
                  id="top-search"
                />
              </div>
            </form>
          </div>
        </nav>
      </div>
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-sm-4">
          <h2>Student Detail</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" as="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/students" as="/students">
                <a>Students</a>
              </Link>
            </li>
            <li className="breadcrumb-item active">
              <input type="text" name="name" />
            </li>
          </ol>
        </div>
      </div>
      <div className="wrapper wrapper-content animated fadeInUp">
        <div className="row">
          <div className="col-lg-9">
            <div className="ibox">
              <div className="ibox-content">
                <Formik
                  initialValues={formInitialValue}
                  validationSchema={formSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    handleSubmit,
                    errors,
                  }) => <pre>{JSON.stringify(values, null, 2)}</pre>}
                </Formik>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="wrapper wrapper-content project-manager">
              <h4>Medical Information:</h4>
              <p className="small">Student has some medical condition.</p>
              <p className="small font-bold">
                <span>
                  <i className="fa fa-circle text-warning"></i> High priority
                </span>
              </p>
              <h5>Medical Detail</h5>
              <ul className="list-unstyled project-files">
                <li>
                  <a href="">
                    <i className="fa fa-file"></i> Eye test report.pdf
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa fa-file-picture-o"></i> Other medical
                    report.doc
                  </a>
                </li>
              </ul>
              <div className="text-center m-t-md">
                <a href="#" className="btn btn-xs btn-primary">
                  Add Medical Detail
                </a>{' '}
                <a href="#" className="btn btn-xs btn-primary">
                  Report contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, query }) {
  // const { id } = query;
  // console.log("Fetching data ...............");
  // const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : ""; // REVISIT: not ideal but could be passed into via context.
  // const res = await axios.get(`${baseUrl}/api/student/${id}`);
  return {
    props: {
      classes: [],
      sections: [],
    },
  };
}

export default Enroll;

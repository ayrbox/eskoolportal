import axios from "axios";
import Link from "next/link";
import StudentProfileLayout from "../../../components/PageLayouts/StudentProfileLayout";

const Index = ({ student }) => {
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
    class: studentClass,
    section
  } = student;
  return (
    <StudentProfileLayout>
      <div className="wrapper wrapper-content animated fadeInUp">
        <div className="row">
          <div className="col-lg-9">
            <div className="ibox">
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="m-b-md">
                      <Link href="" href="/student/[id]" as={`/student/${id}`}>
                        <a className="btn btn-white btn-xs float-right">Back</a>
                      </Link>
                      <button
                        className="btn btn-white btn-xs float-right"
                        type="button"
                      >
                        Save
                      </button>
                      <h2>{name}</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Email:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">
                          <a href={`mailto:${email}`} className="text-navy">
                            {" "}
                            {email}
                          </a>
                        </dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Gender:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{gender}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Date Of Birth:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{dateOfBirth}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Class:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{studentClass.name}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Section:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{section.name}</dd>
                      </div>
                    </dl>

                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Roll No:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{classRollNo}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Address</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{address}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Contact No.</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{contactNo}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="col-lg-6" id="cluster_info">
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Joined Date:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{joinDate}</dd>
                      </div>
                    </dl>
                    <dl className="row mb-0">
                      <div className="col-sm-4 text-sm-right">
                        <dt>Reference Code:</dt>
                      </div>
                      <div className="col-sm-8 text-sm-left">
                        <dd className="mb-1">{referenceCode}</dd>
                      </div>
                    </dl>
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <dl className="row mb-0">
                      <div className="col-sm-2 text-sm-right">
                        <dt>Attendance:</dt>
                      </div>
                      <div className="col-sm-10 text-sm-left">
                        <dd>
                          <div className="progress m-b-1">
                            <div
                              style={{ width: "90%" }}
                              className="progress-bar progress-bar-striped progress-bar-animated"
                            ></div>
                          </div>
                          <small>
                            Attendance of student is <strong>90%</strong>.
                          </small>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
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
                </a>{" "}
                <a href="#" className="btn btn-xs btn-primary">
                  Report contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentProfileLayout>
  );
};

export async function getServerSideProps({ req, query }) {
  const { id } = query;
  const { baseUrl } = req;

  // REVISIT: fetcher should be provided by context +1
  const res = await axios({
    url: `${baseUrl}/api/student/${id}`,
    method: "get",
    headers: req ? { cookie: req.headers.cookie } : undefined
  });

  return {
    props: {
      student: res.data
    }
  };
}

export default Index;

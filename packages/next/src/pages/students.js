import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import useSwr from "swr";

import { Class } from "@eskoolportal/api/src/models";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Students = ({ classes }) => {
  const router = useRouter();

  const handleClassChange = (e) => {
    e.preventDefault();
    const classId = e.target.value;
    router.push(`/?class=${classId}`, `/?class=${classId}`);
  };

  const { data: students, error: studentError } = useSwr(
    `/api/students/`,
    fetcher
  );

  return (
    <Layout>
      <h1>Students</h1>
      <div className="ibox ">
        <div className="ibox-title">
          <h5>Students Result</h5>
          <div className="ibox-tools">
            <a className="collapse-link">
              <i className="fa fa-chevron-up"></i>
            </a>
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <i className="fa fa-wrench"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a href="#" className="dropdown-item">
                  Config option 1
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item">
                  Config option 2
                </a>
              </li>
            </ul>
            <a className="close-link">
              <i className="fa fa-times"></i>
            </a>
          </div>
        </div>
        <div className="ibox-content">
          <div className="row">
            <div className="col-sm-5 m-b-xs">
              <select
                className="form-control-sm form-control input-s-sm inline"
                onChange={handleClassChange}
              >
                <option value="ALL">All</option>
                {classes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-4 m-b-xs">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-sm btn-white active">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autoComplete="off"
                    defaultChecked
                  />{" "}
                  All
                </label>
                <label className="btn btn-sm btn-white">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autoComplete="off"
                  />{" "}
                  A
                </label>
                <label className="btn btn-sm btn-white">
                  <input
                    type="radio"
                    name="options"
                    id="option3"
                    autoComplete="off"
                  />{" "}
                  B
                </label>
                <label className="btn btn-sm btn-white">
                  <input
                    type="radio"
                    name="options"
                    id="option4"
                    autoComplete="off"
                  />{" "}
                  C
                </label>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-group">
                <input
                  placeholder="Search"
                  type="text"
                  className="form-control form-control-sm"
                />
                <span className="input-group-append">
                  {" "}
                  <button type="button" className="btn btn-sm btn-primary">
                    Go!
                  </button>{" "}
                </span>
              </div>
            </div>
          </div>
          {students ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Contact no</th>
                    <th>Email</th>

                    <th>Join Date</th>
                    <th>Class</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(
                    ({
                      id,
                      name,
                      dateOfBirth,
                      gender,
                      address,
                      contactNo,
                      email,
                      joinDate,
                      class: studentClass,
                      section,
                    }) => (
                      <tr key={id}>
                        <td>
                          <Link href="/student/[id]" as={`/student/${id}`}>
                            <a>{name}</a>
                          </Link>
                        </td>
                        <td>{dateOfBirth}</td>
                        <td>{gender}</td>
                        <td>{address}</td>
                        <td>{contactNo}</td>
                        <td>{email}</td>
                        <td>{joinDate}</td>
                        <td>
                          <Link href={`/class/${studentClass.id}`}>
                            <a>{studentClass.name}</a>
                          </Link>
                        </td>
                        <td>
                          <Link href={`/class/${section.id}`}>
                            <a>{section.name}</a>
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <h1>Loading....</h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const classes = await Class.findAll({ raw: true });
  const a = JSON.stringify(classes);

  ctx.isLogged = true;
  if (!ctx.isLogged) {
    return {
      redirect: { destination: "/classes", permanent: false },
    };
  }

  return {
    props: {
      classes: JSON.parse(JSON.stringify(classes)),
    },
  };
}

export default Students;

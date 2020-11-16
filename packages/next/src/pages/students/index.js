import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import useSwr from 'swr';
import clsx from 'clsx';

import { Class, Section } from '@eskoolportal/api/src/models';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Students = ({ classes, sections }) => {
  const [classId, setClassId] = useState('');
  const [section, setSection] = useState('ALL');

  const handleClassChange = (e) => {
    e.preventDefault();
    setClassId(e.target.value);
  };

  const handleSectionChange = (id) => (e) => {
    e.preventDefault();
    setSection(id);
    console.log('Section: ', id);
  };

  const { data: students } = useSwr(
    classId ? `/api/classes/${classId}/students?section=${section}` : null,
    fetcher
  );

  return (
    <Layout>
      <h1>Students</h1>
      <div className="ibox ">
        <div className="ibox-title">
          <h5>Students</h5>
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
                value={classId}
              >
                <option value="">-</option>
                {classes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-4 m-b-xs">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={clsx('btn btn-sm btn-white', {
                    active: section === 'ALL',
                  })}
                >
                  <input
                    type="radio"
                    name="sections"
                    id="section-all"
                    autoComplete="off"
                    onClick={handleSectionChange('ALL')}
                  />
                  All
                </label>
                {sections.map(({ id, name }) => (
                  <label
                    className={clsx('btn btn-sm btn-white', {
                      active: section === id,
                    })}
                    key={id}
                  >
                    <input
                      type="radio"
                      name="sections"
                      id={`section-${id}`}
                      autoComplete="off"
                      onClick={handleSectionChange(id)}
                    />
                    {name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {students && classId ? (
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
                          <Link href={`/students/${id}`}>
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
            <div>{classId && <h1>Loading....</h1>}</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const classes = await Class.findAll({ raw: true });
  const sections = await Section.findAll({ raw: true });

  ctx.isLogged = true;
  if (!ctx.isLogged) {
    return {
      redirect: { destination: '/classes', permanent: false },
    };
  }
  return {
    props: {
      classes: JSON.parse(JSON.stringify(classes)),
      sections: JSON.parse(JSON.stringify(sections)),
    },
  };
}

export default Students;

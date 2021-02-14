import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@components/Layout';
import useSwr from 'swr';
import clsx from 'clsx';
import { Button, Table, Input, Col } from 'reactstrap';

// SSR
import { Class } from '~/database/entities/Class';
import { Section } from '~/database/entities/Section';

import { securePage } from '~/lib/securePage';
import { ensureConnection } from '~/database';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Students = ({ classes, sections, user }) => {
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
    <Layout title="Students" user={user}>
      <h1>Students</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
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
            <Col sm={5}>
              <Input
                type="select"
                name="studentClass"
                id="studentClass"
                onChange={handleClassChange}
                value={classId}
              >
                <option></option>
                {classes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Input>
            </Col>
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
              {students && <h1>Total Number of student: {students.length}</h1>}
            </div>
            <div className="col-sm-3 m-b-xs text-right">
              <Link href="/students/enroll">
                <Button color="primary">Enroll New Student</Button>
              </Link>
            </div>
          </div>

          {students && classId ? (
            <div className="table-responsive">
              <Table striped>
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
                          <Link href={`/classes/${studentClass.id}/students`}>
                            <a>{studentClass.name}</a>
                          </Link>
                        </td>
                        <td>{section.name}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          ) : (
            <div>{classId && <h1>Loading....</h1>}</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = securePage(async (_, user) => {
  await ensureConnection();
  const classes = await Class.find();
  const sections = await Section.find();

  return {
    props: {
      classes: JSON.parse(JSON.stringify(classes)),
      sections: JSON.parse(JSON.stringify(sections)),
      user,
    },
  };
});

export default Students;

import { useState, ChangeEventHandler, MouseEventHandler, FC } from "react";
import Link from "next/link";
import Layout from "~/components/Layout";
import useSwr from "swr";
import clsx from "clsx";
import { Button, Table, Input, Col } from "reactstrap";
import prisma from "~/lib/prisma";
import type { ClassGroup, Section, User, Student } from "@prisma/client";

import { securePage } from "~/lib/securePage";
import { StudentWithClassGroup } from "~/types/StudentTypes";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface StudentPageProps {
  classes: ClassGroup[];
  sections: Section[];
  user: User;
}

const Students: FC<StudentPageProps> = ({
  classes,
  sections,
  user,
}: StudentPageProps) => {
  const [classId, setClassId] = useState("");
  const [section, setSection] = useState("ALL");

  const handleClassChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setClassId(e.target.value);
  };
  const handleSectionChange =
    (id: string): MouseEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      setSection(id);
      console.log("Section: ", id);
    };

  const { data: students } = useSwr<StudentWithClassGroup[]>(
    classId ? `/api/classes/${classId}/students?section=${section}` : null,
    fetcher
  );

  return (
    <Layout title="Students" user={user}>
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
            <Col sm={3}>
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
            <Col sm={3} className="m-b-xs">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={clsx("btn btn-sm btn-white", {
                    active: section === "ALL",
                  })}
                >
                  <input
                    type="radio"
                    name="sections"
                    id="section-all"
                    autoComplete="off"
                    onClick={handleSectionChange("ALL")}
                  />
                  All
                </label>
                {sections.map(({ id, name }) => (
                  <label
                    className={clsx("btn btn-sm btn-white", {
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
              {students && (
                <span className="px-3">
                  Total Number of student:
                  <strong> {students.length}</strong>
                </span>
              )}
            </Col>

            <Col sm={3} className="m-b-xs text-right">
              <Link href="/students/enroll">
                <Button color="primary">Enroll New Student</Button>
              </Link>
            </Col>
          </div>

          {students && classId ? (
            <div className="table-responsive">
              <Table striped>
                <thead>
                  <tr>
                    <td>Ref Code</td>
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
                      referenceCode,
                      dateOfBirth,
                      gender,
                      address,
                      contactNo,
                      email,
                      joinDate,
                      ClassGroup,
                      Section,
                    }) => (
                      <tr key={id}>
                        <td>{referenceCode}</td>
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
                          <Link href={`/classes/${ClassGroup.id}/students`}>
                            <a>{ClassGroup.name}</a>
                          </Link>
                        </td>
                        <td>{Section.name}</td>
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

export const getServerSideProps = securePage(async () => {
  const classes = await prisma.classGroup.findMany();
  const sections = await prisma.section.findMany();

  return {
    classes,
    sections,
  };
});

export default Students;

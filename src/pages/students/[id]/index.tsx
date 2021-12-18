import React, { FunctionComponent } from "react";
import Link from "next/link";
import { User } from "next-auth";
import axios from "axios";
import {
  FaEnvelopeOpen,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTrash,
} from "react-icons/fa";
import { mutate } from "swr";
import { Container, Row, Col, Table } from "reactstrap";
import StudentProfileLayout from "~/components/PageLayouts/StudentProfileLayout";
import Panel from "~/components/Panel";
import { MedicalHistory } from "~/database/entities/MedicalHistory";
import { securePage } from "~/lib/securePage";
import ListPage from "~/components/ListPage";
import MedicalHistoryForm from "~/components/MedicalHistoryForm";
import { FormState } from "~/types/FormMode";
import prisma from "~/lib/prisma";
import { StudentWithClassGroup } from "~/types/StudentTypes";

export interface ProfileProps {
  student: StudentWithClassGroup;
  user: User;
}

const Profile: FunctionComponent<ProfileProps> = ({
  student,
  user,
}: ProfileProps) => {
  const { id, name } = student;

  const medicalHistoryUrl = `/api/students/${id}/medical-history`;

  const handleMedicalHistoryFormSubmit = async (
    state: FormState<MedicalHistory>
  ) => {
    try {
      if (state.mode === "EDIT" && state.data.id) {
        await axios.put(`${medicalHistoryUrl}/${state.data.id}`, state.data);
      } else {
        await axios.post(medicalHistoryUrl, state.data);
      }
      mutate(medicalHistoryUrl);
      return true;
    } catch (err) {
      console.error("Handle error gracefully", err);
      return false;
    }
  };

  const handleMedicalHistoryDelete = async (item: MedicalHistory) => {
    try {
      await axios.delete(`${medicalHistoryUrl}/${item.id}`);
      mutate(medicalHistoryUrl);
      return true;
    } catch (err) {
      console.error("Handle error gracefully", err);
      return false;
    }
  };

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
            <h1>
              <strong>{name}</strong>
            </h1>
            <address>
              <FaMapMarkerAlt /> {student.address}
              <br />
              <FaPhoneAlt /> {student.contactNo}
              <br />
              <FaEnvelopeOpen /> {student.email}
            </address>
          </Panel>
        </Col>
      </Row>
      <Row>
        <Col lg={9}>
          <Panel>
            <p>
              <strong>Ref Code:</strong> {student.referenceCode}
            </p>
            <p>
              <strong>Roll No:</strong> {student.rollNo}
            </p>
            <p>
              <strong>Joined:</strong> {student.joinDate}
            </p>
            <p>
              <strong>Class: </strong> {student.ClassGroup.name}{" "}
              {student.Section.name}
            </p>
          </Panel>
        </Col>
      </Row>

      <Container className="border" fluid>
        <h1>Medical History</h1>
        <ListPage<MedicalHistory>
          url={`/api/students/${id}/medical-history`}
          onFormSubmit={handleMedicalHistoryFormSubmit}
          onDelete={handleMedicalHistoryDelete}
        >
          {({
            items,
            onItemClick,
            formState,
            onFormClose,
            onFormSubmit,
            onDelete,
          }) => (
            <>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Severity</th>
                    <th>Triage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((history) => (
                    <tr key={history.id}>
                      <td>
                        <a href="#" onClick={onItemClick(history)}>
                          {history.description}
                        </a>
                      </td>
                      <td>{history.severity}</td>
                      <td>{history.triageNote}</td>
                      <td>
                        <a
                          href="#"
                          className="text-danger"
                          onClick={() => onDelete && onDelete(history)}
                        >
                          <FaTrash />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {formState.isOpen && (
                <MedicalHistoryForm
                  values={formState.data}
                  onClose={onFormClose}
                  onFormSubmit={onFormSubmit}
                />
              )}
            </>
          )}
        </ListPage>
      </Container>
    </StudentProfileLayout>
  );
};

export const getServerSideProps = securePage(async (ctx, user) => {
  const studentId = ctx.params?.id as string;
  const student = await prisma.student.findFirst({
    where: { id: studentId },
    include: {
      ClassGroup: true,
      Section: true,
    },
  });

  return {
    student,
  };
});

export default Profile;

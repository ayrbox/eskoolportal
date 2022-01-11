import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Col, Input, Label, Row, Table } from "reactstrap";
import Layout from "~/components/Layout";
import { securePage } from "~/lib/securePage";
import { ClassGroup, Exam, FiscalYear, Section } from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import prisma from "~/lib/prisma";
import axios from "axios";
import * as yup from "yup";
import {
  ExamClassQueryParams,
  ObtainedMarksQueryParams,
  StudentWithObtainedMarks,
} from "~/types/Marks";

interface MarksEntryProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
  classGroups: ClassGroup[];
  sections: Section[];
}

const examClassQueryValidation = yup.object().shape({
  examId: yup.string().required(),
  classGroupId: yup.string().required(),
  sectionId: yup.string().required(),
});

const MarksEntry = ({
  user,
  fiscalYears,
  classGroups,
  sections,
}: MarksEntryProps) => {
  const [fiscalYear, setFiscalYear] = useState<FiscalYear | undefined>(
    fiscalYears[0]
  );
  const [examList, setExamList] = useState<Exam[]>([]);
  const [queryParams, setQueryParams] = useState<Partial<ExamClassQueryParams>>(
    {
      classGroupId: "",
      examId: "",
      sectionId: "",
    }
  );

  const [studentsWithObtainedMarks, setStudentsWithObtainedMarks] =
    useState<StudentWithObtainedMarks[]>();

  useEffect(() => {
    async function fetchExamList() {
      const { data } = await axios.get<Exam[]>(
        `/api/exams?fiscalYear=${fiscalYear?.id}`
      );
      setExamList(data);
      setQueryParams((prev) => ({
        ...prev,
        examdId: undefined,
      }));
    }
    if (fiscalYear) fetchExamList();
  }, [fiscalYear]);

  const handleFiscalYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const fiscalYearId = e.target.value;
    setFiscalYear(fiscalYears.find(({ id }) => fiscalYearId == id));
  };

  // When form value
  useEffect(() => {
    async function fetchMarks() {
      try {
        await examClassQueryValidation.validate(queryParams);
        const { data } = await axios.get<StudentWithObtainedMarks[]>(
          "/api/marks/evaluation",
          { params: queryParams }
        );
        setStudentsWithObtainedMarks(data);
      } catch {
        /* DO NOTHING */
      }
    }

    fetchMarks();
  }, [queryParams]);

  const handleFormChange =
    (
      key: keyof ObtainedMarksQueryParams
    ): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setQueryParams((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  return (
    <Layout user={user} title="Marks Evaluations">
      <>
        <Row>
          <Col sm={3}>
            <Label>Year: </Label>
            <Input
              type="select"
              name="fiscalYear"
              id="fiscalYear"
              onChange={handleFiscalYearChange}
              value={fiscalYear?.id}
            >
              <option></option>
              {fiscalYears.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </Col>
          <Col sm={3}>
            <Label>Exam: </Label>
            <Input
              type="select"
              name="exam"
              id="exam"
              value={queryParams.examId}
              onChange={handleFormChange("examId")}
            >
              <option></option>
              {examList.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Label>Class: </Label>
            <Input
              type="select"
              name="classGroup"
              id="classGroup"
              value={queryParams.classGroupId}
              onChange={handleFormChange("classGroupId")}
            >
              <option></option>
              {classGroups.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </Col>
          <Col sm={3}>
            <Label>Section: </Label>
            <Input
              type="select"
              name="section"
              id="section"
              value={queryParams.sectionId}
              onChange={handleFormChange("sectionId")}
            >
              <option></option>
              {sections.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
        {studentsWithObtainedMarks && (
          <Table>
            <thead>
              <tr>
                <th>Student Code</th>
                <th>Student</th>
                {studentsWithObtainedMarks[0].obtainedMarks.map((marks) => (
                  <th>{marks.subject.name}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {studentsWithObtainedMarks.map((student) => (
                <tr>
                  <td>{student.referenceCode}</td>
                  <td>{student.name}</td>
                  {student.obtainedMarks.map((marks) => (
                    <td>{marks.obtainedMarks}</td>
                  ))}
                  <td>
                    {student.obtainedMarks.reduce(
                      (total, marks) => total + marks.obtainedMarks,
                      0
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    </Layout>
  );
};

export const getServerSideProps = securePage(async () => {
  const fiscalYears = await prisma.fiscalYear.findMany();
  const classGroups = await prisma.classGroup.findMany();
  const sections = await prisma.section.findMany();

  return {
    fiscalYears,
    classGroups,
    sections,
  };
});

export default MarksEntry;

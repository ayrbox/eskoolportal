import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Button, Col, Input, Label, Row, Table } from "reactstrap";
import Layout from "~/components/Layout";
import { securePage } from "~/lib/securePage";
import {
  ClassGroup,
  Exam,
  FiscalYear,
  Section,
  Student,
  Subject,
} from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import prisma from "~/lib/prisma";
import axios from "axios";
import Panel from "~/components/Panel";
import { StudentWithObtainedMarks } from "~/types/StudentTypes";
import * as yup from "yup";
import { ObtainMarksWithStudentDetail } from "~/types/Marks";

interface MarksEntryProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
  classGroups: ClassGroup[];
  sections: Section[];
  subjects: Subject[];
}

type FormValue = {
  examId?: string;
  classGroupId?: string;
  sectionId?: string;
  subjectId?: string;
  studentCode: string;
  examType?: string;
};

const formValueValidation = yup.object().shape({
  examId: yup.string().required(),
  classGroupId: yup.string().required(),
  sectionId: yup.string().required(),
  subjectId: yup.string().required(),
  examType: yup.string().nullable(),
});

type Mark = {
  fullMark: number;
  passMark: number;
  obtainedMarks: number;
};

const MarksEntry = ({
  user,
  fiscalYears,
  classGroups,
  sections,
  subjects,
}: MarksEntryProps) => {
  const [fiscalYear, setFiscalYear] = useState<FiscalYear | undefined>(
    fiscalYears[0]
  );
  const [examList, setExamList] = useState<Exam[]>([]);
  const [formValue, setFormValue] = useState<FormValue>({
    classGroupId: "ckxpa91ni00503z6enhie22eo",
    examId: "ckxpa91v413623z6ey5joslar",
    sectionId: "ckxpa91nl00673z6e06rmgpsl",
    subjectId: "ckxpa91uq13353z6e2jrcc0ny",
    studentCode: "8WWMT",
    examType: undefined,
  });
  const [studentMarks, setStudentMarks] = useState<StudentWithObtainedMarks>();
  const [marks, setMarks] = useState<Mark>({
    fullMark: 0,
    passMark: 0,
    obtainedMarks: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [obtainedMarks, setObtainedMarks] =
    useState<ObtainMarksWithStudentDetail[]>();

  useEffect(() => {
    async function fetchExamList() {
      const { data } = await axios.get<Exam[]>(
        `/api/exams?fiscalYear=${fiscalYear?.id}`
      );
      setExamList(data);
      setFormValue((prev) => ({
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
        await formValueValidation.validate(formValue);

        const { data } = await axios.get<ObtainMarksWithStudentDetail[]>(
          "/api/marks",
          { params: formValue }
        );
        setObtainedMarks(data);
      } catch {
        /* DO NOTHING */
      }
    }

    fetchMarks();
  }, [formValue]);

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const { data } = await axios.get<StudentWithObtainedMarks>(
      `/api/marks/${formValue.studentCode}`,
      {
        params: formValue,
      }
    );
    setStudentMarks(data);

    const [studentCurrentMarks] = data.obtainMarks;

    setMarks({
      fullMark: studentCurrentMarks?.fullMark || data.fullMark,
      passMark: studentCurrentMarks?.passMark || data.passMark,
      obtainedMarks: studentCurrentMarks?.obtainedMarks || 0,
    });

    // TODO: Handle Error
    // 400 Error
    // 404 Student not found
    // 400 Student does not belong to selected classGroup and/or classSection
    const { data: marksForAll } = await axios.get<unknown>("/api/marks", {
      params: formValue,
    });
    console.log(marksForAll);
  };

  const handleFormChange =
    (key: keyof FormValue): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setFormValue((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleOpenDialog: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  return (
    <Layout user={user} title="Marks Entry">
      <>
        <pre>{JSON.stringify(formValue, null, 2)}</pre>
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
              value={formValue.examId}
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
              value={formValue.classGroupId}
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
              value={formValue.sectionId}
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
          <Col sm={3}>
            <Label>Subject: </Label>
            <Input
              type="select"
              name="subject"
              id="subject"
              value={formValue.subjectId}
              onChange={handleFormChange("subjectId")}
            >
              <option></option>
              {subjects.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </Col>
          <Col sm={3}>
            <Label>Exam Type:</Label>
            <Input
              type="select"
              name="examType"
              id="examType"
              value={formValue.examType}
              onChange={handleFormChange("examType")}
            >
              <option></option>
              <option>Theory</option>
              <option>Practical</option>
            </Input>
          </Col>
        </Row>
        <Input
          type="text"
          name="studentCode"
          id="studentCode"
          onKeyPress={handleKeyPress}
          onChange={handleFormChange("studentCode")}
          value={formValue.studentCode}
        />
        {studentMarks && (
          <Panel>
            <h1>
              <strong>{studentMarks?.name}</strong> (
              <small>{studentMarks?.rollNo}</small>)
            </h1>
            <p>
              {studentMarks?.ClassGroup.name} ({studentMarks?.Section.name})
            </p>
            <Input
              type="number"
              name="obtainedMarks"
              value={marks.obtainedMarks}
            />
            <Row>
              <Col>
                <Input
                  type="number"
                  name="fullMark"
                  value={marks.fullMark}
                  disabled
                />
              </Col>
              <Col>
                <Input
                  type="number"
                  name="passMark"
                  value={marks.passMark}
                  disabled
                />
              </Col>
            </Row>
            <pre>{JSON.stringify(studentMarks, null, 2)}</pre>
          </Panel>
        )}

        <div className="d-flex justify-content-end py-3">
          <Button color="primary" className="mr-3" onClick={handleOpenDialog}>
            Enter Marks
          </Button>
        </div>

        {obtainedMarks && (
          <Table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam Type</th>
                <th>Full Marks</th>
                <th>Pass Marks</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {obtainedMarks.map((marks) => (
                <tr>
                  <td>{marks.student.name}</td>
                  <td>{marks.examType}</td>
                  <td>{marks.fullMark}</td>
                  <td>{marks.passMark}</td>
                  <td>{marks.obtainedMarks}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {openDialog && <h1>Dialog should be open here.</h1>}
      </>
    </Layout>
  );
};

export const getServerSideProps = securePage(async () => {
  const fiscalYears = await prisma.fiscalYear.findMany();
  const classGroups = await prisma.classGroup.findMany();
  const sections = await prisma.section.findMany();
  const subjects = await prisma.subject.findMany();

  return {
    fiscalYears,
    classGroups,
    sections,
    subjects,
  };
});

export default MarksEntry;

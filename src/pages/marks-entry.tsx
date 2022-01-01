import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { Col, Input, Label, Row } from "reactstrap";
import Layout from "~/components/Layout";

import { securePage } from "~/lib/securePage";

import { ClassGroup, Exam, FiscalYear, Section, Subject } from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import prisma from "~/lib/prisma";
import axios from "axios";

interface MarksEntryProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
  classGroups: ClassGroup[];
  sections: Section[];
	subjects: Subject[];
}

const MarksEntry = ({
  user,
  fiscalYears,
  classGroups,
  sections,
	subjects,
}: MarksEntryProps) => {
  const [fiscalYear, setFiscalYear] = useState<FiscalYear>();
  const [examList, setExamList] = useState<Exam[]>([]);

  const [studentCode, setStudentCode] = useState<string>("");


  useEffect(() => {
    async function fetchExamList() {
      const { data } = await axios.get<Exam[]>(
        `/api/exams?fiscalYear=${fiscalYear?.id}`
      );
      setExamList(data);
    }
    if (fiscalYear) fetchExamList();
  }, [fiscalYear]);

  const handleFiscalYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const fiscalYearId = e.target.value;
    setFiscalYear(fiscalYears.find(({ id }) => fiscalYearId == id));
  };

  const handleStudentCodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setStudentCode(e.target.value);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Yo do your shit with ", studentCode);
    }
  };

  return (
    <Layout user={user} title="Marks Entry">
      <Row>
        <Col sm={3}>
          <Label>Year: </Label>
          <Input
            type="select"
            name="fiscalYear"
            id="fiscalYear"
            onChange={handleFiscalYearChange}
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
          <Input type="select" name="exam" id="exam">
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
          <Input type="select" name="classGroup" id="classGroup">
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
          <Input type="select" name="section" id="section">
            <option></option>
            {sections.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
				<Col sm={6}>
          <Label>Subject: </Label>
          <Input type="select" name="subject" id="subject">
            <option></option>
            {subjects.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
      </Row>

      <Input
        type="text"
        name="studentCode"
        id="studentCode"
        onKeyPress={handleKeyPress}
        onChange={handleStudentCodeChange}
        value={studentCode}
      />
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

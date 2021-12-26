import React, { ChangeEventHandler } from "react";
import { Col, Input, Label, Row, Table } from "reactstrap";
import Layout from "~/components/Layout";
import ListPage from "~/components/ListPage";

import { securePage } from "~/lib/securePage";
import { useState } from "react";
import { stringify } from "querystring";
import GradeForm from "~/components/GradeForm";
import { FormState } from "~/types/FormMode";
import axios from "axios";
import { mutate } from "swr";

import type { FiscalYear, Exam, ClassGroup, Subject } from "@prisma/client";
import prisma from "~/lib/prisma";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";

type Grade = any;

type QueryState = {
  fiscalYear?: FiscalYear;
  exam?: Exam;
  class?: ClassGroup;
  subject?: Subject;
};

const GRADE_ENDPOINT = "/api/grades";

interface GradeSettingsProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
  exams: Exam[];
  classGroups: ClassGroup[];
  subjects: Subject[];
}

const GradeSettings = ({
  user,
  fiscalYears,
  exams,
  classGroups,
  subjects,
}: GradeSettingsProps) => {
  const [query, setQuery] = useState<QueryState>({});

  const params = {
    fiscalYearId: query.fiscalYear?.id,
    examId: query.exam?.id,
    classId: query.class?.id,
  };

  const handleFormSubmit = async (state: FormState<Grade>) => {
    const {
      id,
      year,
      exam,
      class: clazz,
      subject,
      gradeType,
      fullMark,
      passMark,
    } = state.data;

    const payload = {
      yearId: year.id,
      examId: exam.id,
      classId: clazz.id,
      subjectId: subject.id,
      gradeType,
      fullMark,
      passMark,
    };

    try {
      if (state.mode === "EDIT" && id) {
        await axios.put(`${GRADE_ENDPOINT}/${id}`, payload);
      } else {
        await axios.post(GRADE_ENDPOINT, payload);
      }
      mutate(`${GRADE_ENDPOINT}?${stringify(params)}`);
      return true;
    } catch (err) {
      console.error("Handle error", err); // TODO
      return false;
    }
  };

  const handleParamsChange =
    (
      paramKey: string,
      items: Array<FiscalYear | Exam | ClassGroup | Subject>
    ): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      setQuery((prev) => {
        const id = e.target.value;
        const item = items.find(({ id: id_ }) => id_ === id);
        return {
          ...prev,
          [paramKey]: item,
        };
      });
    };

  return (
    <Layout user={user} title="Grades">
      <Row>
        <Col sm={3}>
          <Label>Year: </Label>
          <Input
            type="select"
            name="year"
            id="year"
            value={query.fiscalYear?.id}
            onChange={handleParamsChange("year", fiscalYears)}
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
            value={query.exam?.id}
            onChange={handleParamsChange("exam", exams)}
          >
            <option></option>
            {exams.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
        <Col sm={3}>
          <Label>Class: </Label>
          <Input
            type="select"
            name="class"
            id="class"
            value={query.class?.id}
            onChange={handleParamsChange("class", classGroups)}
          >
            <option></option>
            {classGroups.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
      </Row>
      <ListPage<Grade>
        url={`${GRADE_ENDPOINT}?${stringify(params)}`}
        onFormSubmit={handleFormSubmit}
        initialFormData={{ ...query, fullMark: 100, passMark: 40 }}
      >
        {({ items, onItemClick, formState, onFormClose, onFormSubmit }) => (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Full Marks</th>
                  <th>Pass Marks</th>
                </tr>
              </thead>
              <tbody>
                {items.map((grade) => (
                  <tr key={grade.id}>
                    <td>
                      <a href="#" onClick={onItemClick(grade)}>
                        {grade.subject.name}
                        {grade.gradeType && <span> ({grade.gradeType})</span>}
                      </a>
                    </td>
                    <td>{grade.fullMark}</td>
                    <td>{grade.passMark}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {formState.isOpen && (
              <GradeForm
                formValue={formState.data}
                onClose={onFormClose}
                onFormSubmit={onFormSubmit}
                subjects={subjects}
              />
            )}
          </>
        )}
      </ListPage>
    </Layout>
  );
};

export const getServerSideProps = securePage(async () => {
  const years = await prisma.fiscalYear.findMany();
  const exams = await prisma.exam.findMany();
  const classGroups = await prisma.classGroup.findMany();
  const subjects = await prisma.subject.findMany();

  return {
    years,
    exams,
    classGroups,
    subjects,
  };
});

export default GradeSettings;

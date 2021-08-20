import React, { ChangeEventHandler } from 'react';
import { Col, Input, Label, Row, Table } from 'reactstrap';
import Layout from '~/components/Layout';
import ListPage from '~/components/ListPage';
import { Grade } from '~/database/entities/Grades';
import { FiscalYear } from '~/database/entities/FiscalYear';
import { Exam } from '~/database/entities/Exam';
import { Class } from '~/database/entities/Class';
import { Subject } from '~/database/entities/Subject';
import { securePage } from '~/lib/securePage';
import { useState } from 'react';
import { stringify } from 'querystring';
import GradeForm from '~/components/GradeForm';
import { FormState } from '~/types/FormMode';
import axios from 'axios';
import { mutate } from 'swr';

type QueryState = {
  year?: FiscalYear;
  exam?: Exam;
  class?: Class;
  subject?: Subject;
};

const GRADE_ENDPOINT = '/api/grades';
const GradeSettings = ({ user, years, exams, classes, subjects }) => {
  const [query, setQuery] = useState<QueryState>({
    year: null,
    exam: null,
    class: null,
    subject: null,
  });

  const params = {
    yearId: query.year?.id,
    examId: query.exam?.id,
    classId: query.class?.id,
    subjectId: query.subject?.id,
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
      if (state.mode === 'EDIT' && id) {
        await axios.put(`${GRADE_ENDPOINT}/${id}`, payload);
      } else {
        await axios.post(GRADE_ENDPOINT, payload);
      }
      mutate(`${GRADE_ENDPOINT}?${stringify(params)}`);
      return true;
    } catch (err) {
      console.error('Handle error', err); // TODO
      return false;
    }
  };

  const handleParamsChange =
    (
      paramKey: string,
      items: Array<FiscalYear | Exam | Class | Subject>
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
            value={query.year?.id}
            onChange={handleParamsChange('year', years)}
          >
            <option></option>
            {years.map(({ id, name }) => (
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
            onChange={handleParamsChange('exam', exams)}
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
            onChange={handleParamsChange('class', classes)}
          >
            <option></option>
            {classes.map(({ id, name }) => (
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
            value={query.subject?.id}
            onChange={handleParamsChange('subject', subjects)}
          >
            <option></option>
            {subjects.map(({ id, name }) => (
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
        initialFormData={query}
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
                        {grade.gradeType}
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
              />
            )}
          </>
        )}
      </ListPage>
    </Layout>
  );
};

export const getServerSideProps = securePage(async () => {
  const years = await FiscalYear.find();
  const exams = await Exam.find();
  const classes = await Class.find();
  const subjects = await Subject.find();

  return {
    years,
    exams,
    classes,
    subjects,
  };
});

export default GradeSettings;

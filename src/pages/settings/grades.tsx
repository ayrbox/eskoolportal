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

const GRADE_ENDPOINT = '/api/grades';
const GradeSettings = ({ user, years, exams, classes, subjects }) => {
  const [params, setParams] = useState({
    yearId: '',
    examId: '',
    classId: '',
    subjectId: '',
  });

  const handleFormSubmit = async () => true;

  const handleParamsChange =
    (parmKey: string): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      setParams((prev) => ({
        ...prev,
        [parmKey]: e.target.value,
      }));
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
            value={params.yearId}
            onChange={handleParamsChange('yearId')}
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
            value={params.examId}
            onChange={handleParamsChange('examId')}
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
            value={params.classId}
            onChange={handleParamsChange('classId')}
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
            value={params.subjectId}
            onChange={handleParamsChange('subjectId')}
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
              <>
                <h1>TODO</h1>
                {/* <ExamForm
                  values={formState.data}
                  onClose={onFormClose}
                  onFormSubmit={onFormSubmit}
                /> */}
              </>
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

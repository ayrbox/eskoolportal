import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import Layout from '~/components/Layout';
import { securePage } from '~/lib/securePage';
import { ClassGroup, Exam, FiscalYear, Section, Subject } from '@prisma/client';
import { PagePropsWithUser } from '~/types/PagePropsWithUser';
import prisma from '~/lib/prisma';
import axios from 'axios';
import * as yup from 'yup';
import {
  ObtainedMarksQueryParams,
  ObtainedMarksWithStudentDetail,
} from '~/types/Marks';
import MarksEntryForm from '~/components/MarksEntryForm';

interface MarksEntryProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
  classGroups: ClassGroup[];
  sections: Section[];
  subjects: Subject[];
}

const formValueValidation = yup.object().shape({
  examId: yup.string().required(),
  classGroupId: yup.string().required(),
  sectionId: yup.string().required(),
  subjectId: yup.string().required(),
  examType: yup.string().nullable(),
});

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
  const [formValue, setFormValue] = useState<Partial<ObtainedMarksQueryParams>>(
    {
      classGroupId: '',
      examId: '',
      sectionId: '',
      subjectId: '',
      examType: undefined,
    }
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [obtainedMarks, setObtainedMarks] =
    useState<ObtainedMarksWithStudentDetail[]>();

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
        const { data } = await axios.get<ObtainedMarksWithStudentDetail[]>(
          '/api/marks',
          { params: formValue }
        );
        setObtainedMarks(data);
      } catch {
        /* DO NOTHING */
      }
    }

    fetchMarks();
  }, [formValue]);

  const handleFormChange =
    (
      key: keyof ObtainedMarksQueryParams
    ): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setFormValue((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleToggleForm =
    (state: boolean): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();
      setOpenDialog(state);
    };

  const handleCloseForm = () => setOpenDialog(false);
  const handleSubmission = async () => {
    try {
      await formValueValidation.validate(formValue);
      const { data } = await axios.get<ObtainedMarksWithStudentDetail[]>(
        '/api/marks',
        { params: formValue }
      );
      setObtainedMarks(data);
    } catch {
      /* DO NOTHING */
    }
  };

  return (
    <Layout user={user} title="Marks Entry">
      <>
        <div>
          <div>
            <div>Year: </div>
            <input
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
            </input>
          </div>
          <div>
            <div>Exam: </div>
            <input
              type="select"
              name="exam"
              id="exam"
              value={formValue.examId}
              onChange={handleFormChange('examId')}
            >
              <option></option>
              {examList.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </input>
          </div>
        </div>
        <div>
          <div>
            <div>Class: </div>
            <input
              type="select"
              name="classGroup"
              id="classGroup"
              value={formValue.classGroupId}
              onChange={handleFormChange('classGroupId')}
            >
              <option></option>
              {classGroups.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </input>
          </div>
          <div>
            <div>Section: </div>
            <input
              type="select"
              name="section"
              id="section"
              value={formValue.sectionId}
              onChange={handleFormChange('sectionId')}
            >
              <option></option>
              {sections.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </input>
          </div>
          <div>
            <div>Subject: </div>
            <input
              type="select"
              name="subject"
              id="subject"
              value={formValue.subjectId}
              onChange={handleFormChange('subjectId')}
            >
              <option></option>
              {subjects.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </input>
          </div>
          <div>
            <div>Exam Type:</div>
            <input
              type="select"
              name="examType"
              id="examType"
              value={formValue.examType as string | undefined}
              onChange={handleFormChange('examType')}
            >
              <option></option>
              <option>Theory</option>
              <option>Practical</option>
            </input>
          </div>
        </div>
        <div className="d-flex justify-content-end py-3">
          <button
            color="primary"
            className="mr-3"
            onClick={handleToggleForm(true)}
          >
            Enter Marks
          </button>
        </div>
        {obtainedMarks && (
          <table>
            <thead>
              <tr>
                <th>Student Code</th>
                <th>Student</th>
                <th>Exam Type</th>
                <th>Full Marks</th>
                <th>Pass Marks</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {obtainedMarks.map((marks) => (
                <tr key={marks.id}>
                  <td>{marks.student.referenceCode}</td>
                  <td>{marks.student.name}</td>
                  <td>{marks.examType}</td>
                  <td>{marks.fullMark}</td>
                  <td>{marks.passMark}</td>
                  <td>{marks.obtainedMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {openDialog && (
          <MarksEntryForm
            formValue={formValue as ObtainedMarksQueryParams}
            onClose={handleCloseForm}
            onSubmitted={handleSubmission}
          />
        )}
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

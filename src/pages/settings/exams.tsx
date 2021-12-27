import axios from "axios";
import React, { useCallback } from "react";
import { Table } from "reactstrap";
import { mutate } from "swr";
import ExamForm from "~/components/ExamForm";
import Layout from "~/components/Layout";
import ListPage from "~/components/ListPage";
import { securePage } from "~/lib/securePage";
import { FormState } from "~/types/FormMode";
import { Prisma, Exam, FiscalYear, ExamName } from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";

import prisma from "~/lib/prisma";

const EXAM_ENDPOINT = "/api/exams";

export type ExamWithFiscalYear = Exam & {
  fiscalYear: FiscalYear;
};

interface ExamSettingProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
  examNames: ExamName[];
}

const ExamSettings = ({ user, fiscalYears, examNames }: ExamSettingProps) => {
  const handleFormSubmit = async (
    state: FormState<Exam | Prisma.ExamCreateInput>
  ) => {
    try {
      if (state.mode === "EDIT" && state.data.id) {
        await axios.put(`${EXAM_ENDPOINT}/${state.data.id}`, state.data);
      } else {
        await axios.post(EXAM_ENDPOINT, state.data);
      }
      mutate(EXAM_ENDPOINT);
      return true;
    } catch (err) {
      console.error("Handle error gracefully", err);
      return false;
    }
  };

  return (
    <Layout user={user} title="Exams">
      <ListPage<ExamWithFiscalYear>
        url={EXAM_ENDPOINT}
        onFormSubmit={handleFormSubmit}
        initialFormData={undefined}
      >
        {({ items, onItemClick, formState, onFormClose, onFormSubmit }) => (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Fiscal Year</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Dates</th>
                </tr>
              </thead>
              <tbody>
                {items.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.fiscalYear.name}</td>
                    <td>
                      <a href="#" onClick={onItemClick(exam)}>
                        {exam.name}
                      </a>
                    </td>
                    <td> {exam.description} </td>
                    <td>
                      {exam.startDate} - {exam.endDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {formState.isOpen && (
              <ExamForm
                values={formState.data}
                onClose={onFormClose}
                fiscalYears={fiscalYears}
                examNames={examNames}
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
  const fiscalYears = await prisma.fiscalYear.findMany({
    orderBy: { id: "desc" },
  });

  const examNames = await prisma.examName.findMany();

  return {
    fiscalYears,
    examNames,
  };
});

export default ExamSettings;

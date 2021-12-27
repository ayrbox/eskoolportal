import axios from "axios";
import React, { useCallback } from "react";
import { Table } from "reactstrap";
import { mutate } from "swr";
import ExamForm from "~/components/ExamForm";
import Layout from "~/components/Layout";
import ListPage from "~/components/ListPage";
import { securePage } from "~/lib/securePage";
import { FormState } from "~/types/FormMode";
import { Prisma, Exam, FiscalYear } from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";

const EXAM_ENDPOINT = "/api/exams";

export type ExamWithFiscalYear = Exam & {
  fiscalYear: FiscalYear;
};

const ExamSettings = ({ user }: PagePropsWithUser) => {
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

            {/* {formState.isOpen && (
              <ExamForm
                values={formState.data}
                onClose={onFormClose}
                onFormSubmit={onFormSubmit}
              />
            )} */}
          </>
        )}
      </ListPage>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default ExamSettings;

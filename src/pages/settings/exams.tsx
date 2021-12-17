import axios from "axios";
import React from "react";
import { Table } from "reactstrap";
import { mutate } from "swr";
import ExamForm from "~/components/ExamForm";
import Layout from "~/components/Layout";
import ListPage from "~/components/ListPage";
import { securePage } from "~/lib/securePage";
import { FormState } from "~/types/FormMode";
import { Prisma, ExamName, User } from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";

const EXAM_ENDPOINT = "/api/exams";
const ExamSettings = ({ user }: PagePropsWithUser) => {
  const handleFormSubmit = async (
    state: FormState<ExamName | Prisma.ExamNameCreateInput>
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
      <ListPage<ExamName | Prisma.ExamNameCreateInput>
        url={EXAM_ENDPOINT}
        onFormSubmit={handleFormSubmit}
        initialFormData={{
          name: "",
        }}
      >
        {({ items, onItemClick, formState, onFormClose, onFormSubmit }) => (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {items.map((exam) => (
                  <tr key={exam.id}>
                    <td>
                      <a href="#" onClick={onItemClick(exam)}>
                        {exam.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {formState.isOpen && (
              <ExamForm
                values={formState.data}
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

export const getServerSideProps = securePage();

export default ExamSettings;

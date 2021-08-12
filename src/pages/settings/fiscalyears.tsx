import Layout from '~/components/Layout';
import useSwr, { mutate } from 'swr';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import { securePage } from '~/lib/securePage';
import { FiscalYear } from '~/database/entities/FiscalYear';
import FiscalYearForm from '~/components/FiscalYearForm';
import { MouseEventHandler, useState } from 'react';
import type { FormState } from '~/types/FormMode';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import ListPage from '~/components/ListPage';

const ENDPOINT_FISCALYEAR = '/api/fiscalyears';

const FiscalYearIndex = ({ user }) => {
  /**
   * Create/Update handler
   */
  const handleFormSubmit = async (state: FormState<FiscalYear>) => {
    try {
      if (state.mode === 'EDIT' && state.data.id) {
        await axios.put(`/api/fiscalyears/${state.data.id}`, state.data);
        mutate(ENDPOINT_FISCALYEAR);
      } else {
        await axios.post('/api/fiscalyears', state.data);
        mutate(ENDPOINT_FISCALYEAR);
      }
      return true;
    } catch (err) {
      console.error('Handle Error here', err);
      return false;
    }
  };

  return (
    <Layout user={user} title="Fiscal Year">
      <ListPage<FiscalYear>
        url={ENDPOINT_FISCALYEAR}
        onFormSubmit={handleFormSubmit}
      >
        {({ items, formState, onFormClose, onFormSubmit, onItemClick }) => (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Fiscal Year</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((fiscalYear) => (
                  <tr key={fiscalYear.id}>
                    <td>
                      <a href="#" onClick={onItemClick(fiscalYear)}>
                        {fiscalYear.name}
                      </a>
                    </td>
                    <td>{fiscalYear.startDate}</td>
                    <td>{fiscalYear.endDate}</td>
                    <td>
                      <a href="#" className="btn disabled">
                        <FaTrash />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {formState.isOpen && (
              <FiscalYearForm
                onFormSubmit={onFormSubmit}
                formValue={formState.data}
                onClose={onFormClose}
              />
            )}
          </>
        )}
      </ListPage>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default FiscalYearIndex;

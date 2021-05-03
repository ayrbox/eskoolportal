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

const ENDPOINT_FISCALYEAR = '/api/fiscalyears';

const FiscalYearIndex = ({ user }) => {
  const [formState, setFormState] = useState<FormState<Partial<FiscalYear>>>({
    isOpen: false,
    mode: 'ADD',
    data: {},
  });

  const { data } = useSwr<FiscalYear[], unknown>(ENDPOINT_FISCALYEAR);

  const handleClose = () => {
    setFormState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleNewFiscalYear = () => {
    setFormState({
      isOpen: true,
      mode: 'ADD',
      data: {},
    });
  };

  const handleEdit = (
    fiscalYear: FiscalYear
  ): MouseEventHandler<HTMLAnchorElement> => e => {
    e.preventDefault();

    setFormState({
      isOpen: true,
      mode: 'EDIT',
      data: fiscalYear,
    });
  };

  /**
   * Delete handler
   */
  const handleDelete = (
    fiscalYear: FiscalYear
  ): MouseEventHandler<HTMLAnchorElement> => async e => {
    e.preventDefault();

    //TODO: Confirmatin modal
    await axios.delete(`/api/fiscalyears/${fiscalYear.id}`);
    mutate(ENDPOINT_FISCALYEAR);
  };

  /**
   * Create/Update handler
   */
  const handleFormSubmit = async (fiscalYear: FiscalYear) => {
    try {
      if (formState.mode === 'EDIT' && fiscalYear.id) {
        await axios.put(`/api/fiscalyears/${fiscalYear.id}`, fiscalYear);
        mutate(ENDPOINT_FISCALYEAR);
      } else {
        await axios.post('/api/fiscalyears', fiscalYear);
        mutate(ENDPOINT_FISCALYEAR);
      }
      handleClose();
      return true;
    } catch (err) {
      console.error('Handle Error here', err);
    }
  };

  if (!data) return <h1>Loading....</h1>;

  return (
    <Layout user={user} title="Fiscal Year">
      <div className="d-flex justify-content-end my-3">
        <Button type="button" onClick={handleNewFiscalYear} color="primary">
          New Fiscal Year
        </Button>
      </div>

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
          {data.map(fiscalYear => (
            <tr key={fiscalYear.id}>
              <td>
                <a href="#" onClick={handleEdit(fiscalYear)}>
                  {fiscalYear.name}
                </a>
              </td>
              <td>{fiscalYear.startDate}</td>
              <td>{fiscalYear.endDate}</td>
              <td>
                <a href="#" onClick={handleEdit(fiscalYear)} className="mr-3">
                  <FaPencilAlt />
                </a>
                <a
                  href="#"
                  className="text-danger"
                  onClick={handleDelete(fiscalYear)}
                >
                  <FaTrash />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {formState.isOpen && (
        <FiscalYearForm
          onFormSubmit={handleFormSubmit}
          formValue={formState.data}
          open
          onClose={handleClose}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default FiscalYearIndex;

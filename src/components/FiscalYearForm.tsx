import { FunctionComponent } from 'react';
import Overlay from './Overlay';
import { Form, Button, FormGroup, Col } from 'reactstrap';
import { Formik } from 'formik';
import FormItem from './form/FormItem';
import FormDate from './form/FormDate';
import type { FiscalYear } from '~/database/entities/FiscalYear';
import Panel from './Panel';
import { fiscalYearSchema } from '~/lib/validations';

export interface FiscalYearFormProps {
  formValue: Partial<FiscalYear>;
  onFormSubmit: (value: FiscalYear) => void;
  open?: boolean;
  onClose?: () => void;
}

const FiscalYearForm: FunctionComponent<FiscalYearFormProps> = ({
  formValue,
  onFormSubmit,
  open,
  onClose,
}: FiscalYearFormProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Overlay open={open} onClose={handleClose} light>
      <Formik
        initialValues={formValue}
        onSubmit={onFormSubmit}
        validationSchema={fiscalYearSchema}
      >
        {({ handleSubmit, isSubmitting, isValidating, values }) => (
          <Panel className="shadow-lg">
            <Form onSubmit={handleSubmit} className="p-5">
              <h2>Fiscal Year - {values.name}</h2>

              <FormItem label="Fiscal Year" name="name" colSize={8} />
              <FormDate label="Start Date" name="startDate" colSize={8} />
              <FormDate label="End Date" name="endDate" colSize={8} />
              <FormGroup row>
                <Col sm={{ size: 8, offset: 4 }}>
                  <Button
                    type="submit"
                    color="primary"
                    className="mr-3"
                    disabled={isSubmitting || isValidating}
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    onClick={handleClose}
                    outline
                    color="primary"
                  >
                    Cancel
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        )}
      </Formik>
    </Overlay>
  );
};

export default FiscalYearForm;

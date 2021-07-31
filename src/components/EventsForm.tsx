import { FunctionComponent, useRef } from 'react';
import Overlay from './Overlay';
import { Form, Button, FormGroup, Col } from 'reactstrap';
import { Formik } from 'formik';
import FormItem from './form/FormItem';
import FormDate from './form/FormDate';
import type { Event } from '~/database/entities/Event';
import Panel from './Panel';
import { eventSchema } from '~/lib/validations';
import { useEffect } from 'react';

export interface EventsFormProps {
  formValue: Partial<Event>;
  onFormSubmit: (value: Event) => void;
  onClose?: () => void;
}

const EventsForm: FunctionComponent<EventsFormProps> = ({
  formValue,
  onFormSubmit,
  onClose,
}: EventsFormProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [nameInputRef.current]);

  return (
    <Overlay open onClose={handleClose} light>
      <Formik
        initialValues={formValue}
        onSubmit={onFormSubmit}
        validationSchema={eventSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, isSubmitting, isValidating, values }) => (
          <Panel className="shadow-lg">
            <Form onSubmit={handleSubmit} className="p-5">
              <h2>Events - {values.name}</h2>

              <FormItem
                label="Event Name"
                name="name"
                colSize={8}
                innerRef={nameInputRef}
              />
              <FormDate label="Start Date" name="fromDate" colSize={8} />
              <FormDate label="End Date" name="endDate" colSize={8} />
              <FormItem label="Description" name="description" colSize={8} />
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

export default EventsForm;

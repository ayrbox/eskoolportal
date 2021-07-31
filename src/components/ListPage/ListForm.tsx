import React, { MutableRefObject, useRef } from 'react';
import Overlay from '~/components/Overlay';
import { Formik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import Panel from '~/components/Panel';
import { Button, Col, Form, FormGroup } from 'reactstrap';

export interface ListFormProps<T> {
  values: Partial<T>;
  validation: unknown;
  onFormSubmit: (value: T) => void;
  onClose?: () => void;
  children: (
    props: FormikProps<Partial<T>> & { autoFocusRef: MutableRefObject<any> }
  ) => ReactElement;
}

function EventsForm<T>(props: ListFormProps<T>) {
  const { values, onFormSubmit, onClose, validation } = props;
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const autoFocusRef = useRef(null);
  useEffect(() => {
    if (autoFocusRef.current) {
      autoFocusRef.current.focus();
    }
  }, [autoFocusRef.current]);

  return (
    <Overlay open onClose={handleClose}>
      <Formik
        initialValues={values}
        onSubmit={onFormSubmit}
        validationSchema={validation}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(formikProps) => (
          <Panel className="shadow-lg">
            <Form onSubmit={formikProps.handleSubmit} className="p-5">
              {props.children({ ...formikProps, autoFocusRef })}
              <FormGroup row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={
                      formikProps.isSubmitting || formikProps.isValidating
                    }
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    onClick={onClose}
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
}

export default EventsForm;

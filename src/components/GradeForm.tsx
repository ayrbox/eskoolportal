import { Formik } from 'formik';
import React, { FC } from 'react';
import { Button, Col, Form, FormGroup } from 'reactstrap';
import { Grade } from '~/database/entities/Grades';
import FormItem from './form/FormItem';
import Overlay from './Overlay';
import Panel from './Panel';

export interface GradeFormProps {
  formValue: Partial<Grade>;
  onFormSubmit: (value: Grade) => void;
  onClose?: () => void;
}

const GradeForm: FC<GradeFormProps> = ({
  formValue,
  onFormSubmit,
  onClose,
}: GradeFormProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Overlay open onClose={handleClose} light>
      <Formik
        initialValues={formValue}
        onSubmit={onFormSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize
      >
        {({ handleSubmit, isSubmitting, isValidating }) => (
          <Panel className="shadow-lg">
            <Form onSubmit={handleSubmit} className="p-5">
              <h2>Grades</h2>

              <FormItem label="Year" name="year.name" disabled />
              <FormItem label="Exam" name="exam.name" disabled />
              <FormItem label="Class" name="class.name" disabled />
              <FormItem label="Subject" name="subject.name" disabled />

              <FormItem label="Grade Type" name="gradeType" />
              <FormItem label="Full Mark" name="fullMark" />
              <FormItem label="Pass Mark" name="passMark" />
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

export default GradeForm;

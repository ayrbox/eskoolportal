import { Formik } from "formik";
import React, { FC } from "react";
import { Button, Col, Form, FormGroup } from "reactstrap";
import FormItem from "./form/FormItem";
import Overlay from "./Overlay";
import Panel from "./Panel";
import FormSelect, { FormSelectOption } from "./form/FormSelect";

import type { Subject } from "@prisma/client";

type Grade = any;

export interface GradeFormProps {
  formValue: Grade;
  onFormSubmit: (value: Grade) => void;
  onClose?: () => void;
  subjects: Subject[];
}

const GradeForm: FC<GradeFormProps> = ({
  formValue,
  onFormSubmit,
  onClose,
  subjects,
}: GradeFormProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const subjectOptions: FormSelectOption[] = [
    { label: " -- select --", value: "" },
    ...subjects.map(({ id, name }) => ({
      label: name,
      value: id,
    })),
  ];

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
              <FormSelect
                label="Subject"
                name="subject.id"
                options={subjectOptions}
              />

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

GradeForm.defaultProps = {
  subjects: [],
};

export default GradeForm;

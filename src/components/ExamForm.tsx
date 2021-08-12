import React, { FunctionComponent, useRef } from 'react';
import FormItem from './form/FormItem';
import FormDate from './form/FormDate';
import { examSchema } from '~/lib/validations';
import ListForm from './ListPage/ListForm';
import type { Exam } from '~/database/entities/Exam';

export interface ExamFormProps {
  values: Partial<Exam>;
  onFormSubmit: (value: Exam) => void;
  onClose?: () => void;
}

const ExamForm: FunctionComponent<ExamFormProps> = (props: ExamFormProps) => (
  <ListForm<Exam> validation={examSchema} {...props}>
    {({ autoFocusRef }) => (
      <>
        <h2>Exam</h2>
        <FormItem
          label="Exam Name"
          name="name"
          colSize={8}
          innerRef={autoFocusRef}
        />
        <FormItem label="Description" name="description" colSize={8} />
      </>
    )}
  </ListForm>
);

export default ExamForm;

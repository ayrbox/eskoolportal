import React, { FunctionComponent } from "react";
import FormItem from "./form/FormItem";
import { examNameSchema } from "~/lib/validations";
import ListForm from "./ListPage/ListForm";
import type { ExamName, Prisma } from "@prisma/client";

export interface ExamFormProps {
  values: ExamName | Prisma.ExamNameCreateInput;
  onFormSubmit: (value: ExamName | Prisma.ExamNameCreateInput) => void;
  onClose?: () => void;
}

const ExamForm: FunctionComponent<ExamFormProps> = (props: ExamFormProps) => (
  <ListForm<ExamName | Prisma.ExamNameCreateInput>
    validation={examNameSchema}
    {...props}
  >
    {({ autoFocusRef }) => (
      <>
        <h2>Exam</h2>
        <FormItem
          label="Exam Name"
          name="name"
          colSize={8}
          innerRef={autoFocusRef}
        />
      </>
    )}
  </ListForm>
);

export default ExamForm;

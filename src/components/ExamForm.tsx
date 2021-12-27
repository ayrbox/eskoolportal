import React, { FunctionComponent } from "react";
import FormItem from "./form/FormItem";
import { examNameSchema } from "~/lib/validations";
import ListForm from "./ListPage/ListForm";
import type { Exam, ExamName, FiscalYear, Prisma } from "@prisma/client";
import FormSelect from "./form/FormSelect";

export interface ExamFormProps {
  values: Exam | Prisma.ExamCreateInput;
  fiscalYears: FiscalYear[];
  examNames: ExamName[];
  onFormSubmit: (value: Exam | Prisma.ExamCreateInput) => void;
  onClose?: () => void;
}

const ExamForm: FunctionComponent<ExamFormProps> = (props: ExamFormProps) => (
  <ListForm<Exam | Prisma.ExamCreateInput>
    validation={examNameSchema}
    {...props}
  >
    {({ autoFocusRef }) => (
      <>
        <h2>Exam</h2>
        <FormSelect
          label="Exam Name"
          name="name"
          colSize={8}
          innerRef={autoFocusRef}
          options={props.examNames?.map(({ name }) => ({
            label: name,
            value: name,
          }))}
        />

        <FormSelect
          label="Fiscal Year"
          name="fiscalYearId"
          colSize={8}
          options={props.fiscalYears?.map(({ id: value, name: label }) => ({
            value,
            label,
          }))}
        />

        <FormItem
          label="Description"
          name="description"
          colSize={8}
          type="textarea"
        />
      </>
    )}
  </ListForm>
);

export default ExamForm;

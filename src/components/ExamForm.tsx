import React, { FunctionComponent } from "react";
import FormItem from "./form/FormItem";
import { examSchema } from "~/lib/validations";
import ListForm from "./ListPage/ListForm";
import type { Exam, ExamName, FiscalYear, Prisma } from "@prisma/client";
import FormSelect from "./form/FormSelect";
import FormDate from "./form/FormDate";

export interface ExamFormProps {
  values: Exam | Prisma.ExamUncheckedCreateInput;
  fiscalYears: FiscalYear[];
  examNames: ExamName[];
  onFormSubmit: (value: Exam | Prisma.ExamUncheckedCreateInput) => void;
  onClose?: () => void;
}

const ExamForm: FunctionComponent<ExamFormProps> = (props: ExamFormProps) => (
  <ListForm<Exam | Prisma.ExamUncheckedCreateInput>
    validation={examSchema}
    {...props}
  >
    {({ autoFocusRef, isValid, values, errors }) => (
      <>
        <h2>Exam</h2>

        <pre>{JSON.stringify(values, null, 2)}</pre>

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

        <FormDate label="Start" name="startDate" colSize={8} />
        <FormDate label="End" name="endDate" colSize={8} />
      </>
    )}
  </ListForm>
);

export default ExamForm;

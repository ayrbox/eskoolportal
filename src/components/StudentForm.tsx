import { Col, Button, Form, FormGroup, Alert } from "reactstrap";
import { Formik } from "formik";
import FormItem from "~/components/form/FormItem";
import FormSelect, { FormSelectOption } from "~/components/form/FormSelect";
import FormDate from "~/components/form/FormDate";
import { FC } from "react";
import isEmpty from "lodash/isEmpty";
import { studentSchema } from "~/lib/validations";
import { Student, ClassGroup, Section } from "@prisma/client";

export interface StudentFormProps {
  initialValues: Student;
  classes: ClassGroup[];
  sections: Section[];
  onFormSubmit: (values: Student) => void;
  formMode: "ADD" | "EDIT";
}

const StudentForm: FC<StudentFormProps> = ({
  initialValues,
  classes,
  sections,
  onFormSubmit,
  formMode,
}: StudentFormProps) => {
  const listOfClass = classes.map(
    ({ id: value, name: label }) => ({ label, value } as FormSelectOption)
  );

  const listOfSection = sections.map(
    ({ id: value, name: label }) => ({ label, value } as FormSelectOption)
  );

  const listOfGender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ] as FormSelectOption[];

  return (
    <Formik
      validationSchema={studentSchema}
      initialValues={initialValues}
      onSubmit={onFormSubmit}
    >
      {({ handleSubmit, isSubmitting, isValidating, errors }) => (
        <Form onSubmit={handleSubmit}>
          {!isEmpty(errors) && (
            <Alert color="danger">
              <span>Please fill all required field.</span>
              <ul>
                {Object.entries(errors).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
              </ul>
            </Alert>
          )}

          <FormItem
            id="referenceCode"
            name="referenceCode"
            label="ReferenceCode"
          />
          <FormItem name="name" label="Name" />
          <FormItem name="email" label="Email" type="email" />
          <FormSelect name="gender" label="Gender" options={listOfGender} />
          <FormDate name="dateOfBirth" label="Date Of Birth" />
          <FormSelect name="classId" label="Class" options={listOfClass} />
          <FormSelect
            name="sectionId"
            label="Section"
            options={listOfSection}
          />
          <FormItem name="rollNo" label="Roll No" type="number" />
          <FormItem name="address" label="Address" type="textarea" />
          <FormItem name="contactNo" label="Contact No" />
          <FormDate name="joinDate" label="Joined Date" />

          {formMode === "EDIT" && (
            <>
              <FormItem name="createdAt" label="Created" readOnly />
              <FormItem name="updatedAt" label="Updated" readOnly />
            </>
          )}
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting || isValidating}
              >
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default StudentForm;

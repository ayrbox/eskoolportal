import FormItem from "~/components/form/FormItem";
import { object, string } from "yup";
import { FC } from "react";
import ListForm from "~/components/ListPage/ListForm";
import { Subject } from "@prisma/client";

const subjectSchema = object().shape({
  name: string().min(3).required("Subject name is required."),
  description: string().nullable().max(200, "Max 200 character is allowed."),
});

export interface SubjectFormProps {
  values: Subject;
  onFormSubmit: (values: Subject) => void;
  onClose?: () => void;
}

const SubjectForm: FC<SubjectFormProps> = ({
  values,
  onFormSubmit,
  onClose,
}: SubjectFormProps) => {
  return (
    <ListForm<Subject>
      values={values}
      validation={subjectSchema}
      onFormSubmit={onFormSubmit}
      onClose={onClose}
    >
      {({ autoFocusRef }) => (
        <>
          <h2>Events</h2>
          <FormItem
            id="name"
            name="name"
            label="Name"
            innerRef={autoFocusRef}
          />
          <FormItem id="description" name="description" label="Description" />
        </>
      )}
    </ListForm>
  );
};

export default SubjectForm;

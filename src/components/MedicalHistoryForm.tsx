import FormItem from '~/components/form/FormItem';
import { object, string } from 'yup';
import type { MedicalHistory } from '~/database/entities/MedicalHistory';
import { FC } from 'react';
import ListForm from '~/components/ListPage/ListForm';

const subjectSchema = object().shape({
  description: string().nullable().max(200, 'Max 200 character is allowed.'),
  severity: string(),
  triageNote: string(),
});

export interface MedicalHistoryFormProps {
  values: Partial<MedicalHistory>;
  onFormSubmit: (values: MedicalHistory) => void;
  onClose?: () => void;
}

const MedicalHistoryForm: FC<MedicalHistoryFormProps> = ({
  values,
  onFormSubmit,
  onClose,
}: MedicalHistoryFormProps) => {
  return (
    <ListForm<MedicalHistory>
      values={values}
      validation={subjectSchema}
      onFormSubmit={onFormSubmit}
      onClose={onClose}
    >
      {({ autoFocusRef }) => (
        <>
          <h2>Medical History</h2>
          <FormItem
            id="description"
            name="description"
            label="Description"
            innerRef={autoFocusRef}
          />
          <FormItem id="severity" name="severity" label="Severity" />
          <FormItem id="triageNote" name="triageNote" label="Triage Note" />
        </>
      )}
    </ListForm>
  );
};

export default MedicalHistoryForm;

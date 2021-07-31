import { Formik } from 'formik';
import { Form, Col, FormGroup, Button } from 'reactstrap';
import FormItem from '~/components/form/FormItem';
import { object, string } from 'yup';
import type { Subject } from '~/database/entities/Subject';
import { FC, useRef } from 'react';
import { useEffect } from 'react';

const subjectSchema = object().shape({
  name: string().min(3).required('Subject name is required.'),
  description: string().nullable().max(200, 'Max 200 character is allowed.'),
});

export interface SubjectFormProps {
  initialValues: Subject;
  onFormSubmit: (values: Subject) => void;
  formMode?: 'ADD' | 'EDIT';
}

const SubjectForm: FC<SubjectFormProps> = ({
  initialValues,
  formMode,
  onFormSubmit,
}: SubjectFormProps) => {
  const nameRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameRef.current]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={subjectSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit, isSubmitting, isValidating }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem id="name" name="name" label="Name" innerRef={nameRef} />
          <FormItem id="description" name="description" label="Description" />
          {formMode === 'EDIT' && (
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

SubjectForm.defaultProps = {
  formMode: 'ADD',
};

export default SubjectForm;

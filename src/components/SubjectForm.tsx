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
  initialValues: Partial<Subject>;
  onFormSubmit: (values: Subject) => void;
  onClose?: () => void;
}

const SubjectForm: FC<SubjectFormProps> = ({
  initialValues,
  onFormSubmit,
  onClose,
}: SubjectFormProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const nameRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameRef.current]);

  // initial focus
  // close handling
  // modal display

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
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                type="submit"
                color="primary"
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
      )}
    </Formik>
  );
};

export default SubjectForm;

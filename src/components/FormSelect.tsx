import { useState, useEffect, FC } from 'react';
import {
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  FormFeedback,
} from 'reactstrap';
import { useField } from 'formik';

const TOTAL_COLUMS = 12;

interface FormItemProps extends Record<string, unknown> {
  name: string;
  label: string;
  helpText?: string;
  colSize?: number;
}

const FormSelect: FC<FormItemProps> = ({
  label,
  helpText,
  colSize = 10,
  children,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const [didFocus, setDidFocus] = useState(false);

  const [itemColSize, setItemColSize] = useState(10);
  const [labelColSize, setLabelColSize] = useState(2);

  useEffect(() => {
    setItemColSize(colSize);
    setLabelColSize(TOTAL_COLUMS - colSize);
  }, [colSize]);

  const handleFocus = () => setDidFocus(true);

  const showFeedback =
    (!!didFocus && field.value?.trim().length > 2) || meta.touched;

  return (
    <FormGroup row>
      <Label for={props.name} sm={labelColSize}>
        {label}:
      </Label>
      <Col sm={itemColSize}>
        <Input
          {...field}
          bsSize="sm"
          invalid={meta.error && showFeedback}
          valid={!meta.error && showFeedback}
          onFocus={handleFocus}
          type="select"
        >
          {children}
        </Input>
        {helpText && <FormText>{helpText}</FormText>}
        <FormFeedback valid={!meta.error && showFeedback}>
          {meta.error}
        </FormFeedback>
      </Col>
    </FormGroup>
  );
};

export default FormSelect;

import { useState, useEffect, FC } from "react";
import {
  FormGroup,
  Label,
  Col,
  FormText,
  FormFeedback,
  InputProps,
  Input,
} from "reactstrap";
import { useField } from "formik";

const TOTAL_COLUMS = 12;

interface FormItemProps extends InputProps {
  name: string;
  label: string;
  helpText?: string;
  colSize?: number;
  readonly?: boolean;
}

const FormItem: FC<FormItemProps> = ({
  label,
  helpText,
  colSize = 10,
  readonly,
  ...props
}) => {
  const [field, meta, helpers] = useField<number>(props.name);
  const [didFocus, setDidFocus] = useState(false);

  const [itemColSize, setItemColSize] = useState(10);
  const [labelColSize, setLabelColSize] = useState(2);

  useEffect(() => {
    setItemColSize(colSize);
    setLabelColSize(TOTAL_COLUMS - colSize);
  }, [colSize]);

  const handleFocus = () => setDidFocus(true);

  const showFeedback = !!didFocus || meta.touched;

  return (
    <FormGroup row>
      <Label for={props.name} sm={labelColSize}>
        {label}:
      </Label>
      <Col sm={itemColSize}>
        <Input
          {...field}
          bsSize="sm"
          invalid={!!meta.error && showFeedback}
          valid={!meta.error && showFeedback}
          onFocus={handleFocus}
          type="date"
        />
        {helpText && <FormText>{helpText}</FormText>}
        <FormFeedback valid={!meta.error && showFeedback}>
          {meta.error}
        </FormFeedback>
      </Col>
    </FormGroup>
  );
};

export default FormItem;

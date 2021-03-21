import { useState, useEffect, FC } from "react";
import {
  FormGroup,
  Label,
  Col,
  FormText,
  FormFeedback,
  InputProps,
} from "reactstrap";
import { useField } from "formik";
import DatePicker from "reactstrap-date-picker";

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
  const [field, meta, helpers] = useField<string>(props.name);
  const [didFocus, setDidFocus] = useState(false);

  const [itemColSize, setItemColSize] = useState(10);
  const [labelColSize, setLabelColSize] = useState(2);

  useEffect(() => {
    setItemColSize(colSize);
    setLabelColSize(TOTAL_COLUMS - colSize);
  }, [colSize]);

  const handleFocus = () => setDidFocus(true);

  const showFeedback = !!didFocus || meta.touched;

  const handleChange = (v, f) => {
    console.log(">>>>>>>>>", v, f);
    helpers.setValue(f);
  };

  return (
    <FormGroup row>
      <Label for={props.name} sm={labelColSize}>
        {label}:
      </Label>
      <Col sm={itemColSize}>
        <DatePicker
          {...field}
          dateFormat="YYYY-MM-DD"
          onChange={handleChange}
          bsSize="sm"
          invalid={meta.error && showFeedback}
          valid={!meta.error && showFeedback}
          onFocus={handleFocus}
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

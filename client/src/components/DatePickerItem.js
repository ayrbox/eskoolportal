import React from "react";
import PropTypes from "prop-types";
import { Form, DatePicker } from "antd";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};

const DatePickerItem = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  defaultValue
}) => {
  return (
    <FormItem
      label={label}
      {...formItemLayout}
      validateStatus={error ? "error" : undefined}
      help={error}
    >
      <DatePicker
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </FormItem>
  );
};

DatePickerItem.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  options: PropTypes.array.isRequired
};

DatePickerItem.defaultProps = {
  type: "text"
};

export default DatePickerItem;

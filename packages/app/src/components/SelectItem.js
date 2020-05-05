import React from "react";
import PropTypes from "prop-types";
import { Form, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};

const SelectItem = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  defaultValue,
  options
}) => {
  return (
    <FormItem
      label={label}
      {...formItemLayout}
      validateStatus={error ? "error" : undefined}
      help={error}
    >
      <Select
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map(o => <Option value={o.value}>{o.text}</Option>)}
      </Select>
    </FormItem>
  );
};

SelectItem.propTypes = {
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

SelectItem.defaultProps = {
  type: "text"
};

export default SelectItem;

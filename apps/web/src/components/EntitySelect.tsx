import { ChangeEventHandler, useMemo } from "react";
import { Input } from "reactstrap";

export type FormSelectOption = {
  label: string;
  value: string;
};

export interface EntitySelectProps<T> {
  name: string;
  items: T[];
  onSelect: (name: string, value: T) => void;
  optionTransformer: (item: T) => FormSelectOption;
}

export type EntityType = {
  id: string;
};

// export default function EventsForm<T>(rest: ListFormProps<T>)
export default function EntitySelect<T extends EntityType>(
  props: EntitySelectProps<T>
) {
  const { name, optionTransformer, onSelect, items } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const item = items.find(({ id }) => id === e.target.value);
    if (item) onSelect(name, item);
  };
  const options = useMemo(() => items.map(optionTransformer), items);

  return (
    <Input type="select" onChange={handleChange}>
      <option></option>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Input>
  );
}

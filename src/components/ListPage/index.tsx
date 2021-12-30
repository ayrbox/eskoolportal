import { MouseEventHandler, ReactElement } from "react";
import { useState } from "react";
import useSWR from "swr";
import { FormState } from "~/types/FormMode";
import { Button } from "reactstrap";

export type ListPageChildrenProps<T, I> = {
  items: Array<T>;
  onItemClick: (item: T) => MouseEventHandler;
  formState: FormState<T | I>;
  onFormClose: () => void;
  onFormSubmit: (values: T | I) => Promise<boolean> | boolean;
  onDelete?: (item: T) => MouseEventHandler;
};

export interface ListPageProps<T, I> {
  url: string;
  onFormSubmit: (values: FormState<T | I>) => Promise<boolean>;
  children: (childProps: ListPageChildrenProps<T, I>) => ReactElement;
  onDelete?: (item: T) => Promise<boolean>;
  initialFormData: I;
}

function ListPage<T, I>(props: ListPageProps<T, I>) {
  const { url, onFormSubmit, onDelete, initialFormData } = props;

  const [formState, setFormState] = useState<FormState<T | I>>({
    isOpen: false,
    mode: "ADD",
    data: initialFormData,
  });

  const onItemClick =
    (item: T): MouseEventHandler =>
    (e): void => {
      e.preventDefault();
      setFormState({
        isOpen: true,
        mode: "EDIT",
        data: item,
      });
    };

  const handleFormClose = () => {
    setFormState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleNewItem: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setFormState({
      isOpen: true,
      mode: "ADD",
      data: initialFormData,
    });
  };

  const handleFormSubmit = async (values: T | I): Promise<boolean> => {
    const state = {
      ...formState,
      data: values,
    };

    const formSubmitted = await onFormSubmit(state);

    if (formSubmitted) {
      handleFormClose();
    }

    return formSubmitted;
  };

  const handleDelete =
    (item: T): MouseEventHandler =>
    async (e): Promise<boolean> => {
      e.preventDefault();
      if (onDelete) {
        return await onDelete(item);
      }
      return false;
    };

  const { data: items } = useSWR<T[], unknown>(url);

  if (!items) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="d-flex justify-content-end my-3">
        <Button type="button" onClick={handleNewItem} color="primary">
          New
        </Button>
      </div>
      {props.children({
        items,
        onItemClick,
        formState,
        onFormClose: handleFormClose,
        onFormSubmit: handleFormSubmit,
        onDelete: handleDelete,
      })}
    </div>
  );
}

ListPage.defaultProps = {
  initialFormData: {},
};

export default ListPage;

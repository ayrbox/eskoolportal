import { MouseEventHandler, ReactElement } from "react";
import { useState } from "react";
import useSWR from "swr";
import { FormState } from "~/types/FormMode";
import { Button } from "reactstrap";

export interface ListPageProps<T> {
  url: string;
  onFormSubmit: (values: FormState<T>) => Promise<boolean>;
  children: (
    values: Array<T>,
    onItemClick: (item: T) => void,
    form: FormState<Partial<T>>,
    onFormClose: () => void,
    onFormSubmit: (values: T) => Promise<boolean>
  ) => ReactElement;
}

function ListPage<T>(props: ListPageProps<T>) {
  const { url, onFormSubmit } = props;

  const [formState, setFormState] = useState<FormState<Partial<T>>>({
    isOpen: false,
    mode: "ADD",
    data: {},
  });

  const onItemClick = (item: T) => {
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
      data: {},
    });
  };

  const handleFormSubmit = async (values: T): Promise<boolean> => {
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

  const { data } = useSWR<T[], unknown>(url);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="d-flex justify-content-end my-3">
        <Button type="button" onClick={handleNewItem} color="primary">
          New
        </Button>
      </div>
      {props.children(
        data,
        onItemClick,
        formState,
        handleFormClose,
        handleFormSubmit
      )}
    </div>
  );
}

export default ListPage;

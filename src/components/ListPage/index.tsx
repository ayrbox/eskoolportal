import { MouseEventHandler, ReactElement } from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import { FormState } from '~/types/FormMode';
import { Button } from 'reactstrap';

export type ListPageChildrenProps<T> = {
  items: Array<T>;
  onItemClick: (item: T) => void;
  formState: FormState<Partial<T>>;
  onFormClose: () => void;
  onFormSubmit: (values: T) => Promise<boolean>;
  onDelete?: (item: T) => Promise<boolean>;
};

export interface ListPageProps<T> {
  url: string;
  onFormSubmit: (values: FormState<T>) => Promise<boolean>;
  children: (childProps: ListPageChildrenProps<T>) => ReactElement;
  onDelete?: (item: T) => Promise<boolean>;
}

function ListPage<T>(props: ListPageProps<T>) {
  const { url, onFormSubmit, onDelete } = props;

  const [formState, setFormState] = useState<FormState<Partial<T>>>({
    isOpen: false,
    mode: 'ADD',
    data: {},
  });

  const onItemClick = (item: T) => {
    setFormState({
      isOpen: true,
      mode: 'EDIT',
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
      mode: 'ADD',
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

  const handleDelete = async (item: T): Promise<boolean> => {
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

export default ListPage;

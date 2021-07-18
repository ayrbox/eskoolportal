import { MouseEventHandler, ReactElement } from "react";
import { useState } from "react";
import useSWR from "swr";
import { FormState } from "~/types/FormMode";
import { Button } from "reactstrap";

export interface ListPageProps<T> {
  url: string;
  children: (
    values: Array<T>,
    onItemClick: (item: T) => void,
    form: FormState<Partial<T>>,
    onFormClose: () => void
  ) => ReactElement;
}

function ListPage<T>(props: ListPageProps<T>) {
  const { url } = props;

  const [formState, setFormState] = useState<FormState<Partial<T>>>({
    isOpen: false,
    mode: "ADD",
    data: {},
  });

  const onItemClick = (item: T) => {
    console.log(`hmmm you clicked ${JSON.stringify(item)}`);
    setFormState({
      isOpen: true,
      mode: "EDIT",
      data: item,
    });
  };

  const onFormClose = () => {
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

  const { data } = useSWR<T[], unknown>(url);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="d-flex justify-content-end my-3">
        <Button type="button" onClick={handleNewItem} color="primary">
          New
        </Button>
      </div>
      <pre>{JSON.stringify(formState, null, 2)}</pre>

      {props.children(data, onItemClick, formState, onFormClose)}
    </div>
  );
}

export default ListPage;

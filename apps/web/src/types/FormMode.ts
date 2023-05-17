export type FormMode = "ADD" | "EDIT" | "DELETE";

export type FormState<T> = {
  isOpen: boolean;
  mode: FormMode;
  data: T;
};

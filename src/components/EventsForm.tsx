import React, { FunctionComponent, useRef } from "react";
import FormItem from "./form/FormItem";
import FormDate from "./form/FormDate";
import type { Event } from "~/database/entities/Event";
import { eventSchema } from "~/lib/validations";
import ListForm from "./ListPage/ListForm";
export interface EventsFormProps {
  values: Event;
  onFormSubmit: (value: Event) => void;
  onClose?: () => void;
}

const EventsForm: FunctionComponent<EventsFormProps> = (
  props: EventsFormProps
) => (
  <ListForm<Event> validation={eventSchema} {...props}>
    {({ autoFocusRef }) => (
      <>
        <h2>Events</h2>
        <FormItem
          label="Event Name"
          name="name"
          colSize={8}
          innerRef={autoFocusRef}
        />
        <FormDate label="Start Date" name="fromDate" colSize={8} />
        <FormDate label="End Date" name="endDate" colSize={8} />
        <FormItem label="Description" name="description" colSize={8} />
      </>
    )}
  </ListForm>
);

export default EventsForm;

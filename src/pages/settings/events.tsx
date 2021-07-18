import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import useSWR from "swr";
import Layout from "~/components/Layout";
import { securePage } from "~/lib/securePage";
import type { Event } from "~/database/entities/Event";
import type { FormState } from "~/types/FormMode";

const EventIndex = ({ user }) => {
  const [formState, setFormState] = useState<FormState<Partial<Event>>>({
    isOpen: false,
    mode: "ADD",
    data: {},
  });

  const { data } = useSWR<Event[], unknown>("/api/events");

  const handleNewEvent = () => {
    setFormState({ isOpen: true, mode: "ADD", data: {} });
  };

  if (!data) return <h1>Loading....</h1>;

  return (
    <Layout user={user} title="Events">
      <div className="d-flex justify-content-end my-3">
        {" "}
        <Button type="button" color="primary" onClick={handleNewEvent}>
          New Event
        </Button>
      </div>

      <Table striped border>
        <thead>
          <th>Name</th>
          <th>Date</th>
          <th>Description</th>
        </thead>
        <tbody>
          {data.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>
                {event.fromDate} -{event.endDate}{" "}
              </td>
              <td>{event.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default EventIndex;

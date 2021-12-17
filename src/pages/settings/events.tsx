import { Table } from "reactstrap";
import Layout from "~/components/Layout";
import { securePage } from "~/lib/securePage";
import type { Event } from "~/database/entities/Event";
import ListPage from "~/components/ListPage";
import EventsForm from "~/components/EventsForm";
import { FormState } from "~/types/FormMode";
import axios from "axios";
import { mutate } from "swr";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";

const EVENTS_ENDPOINT = "/api/events";

const EventsPage = ({ user }: PagePropsWithUser) => {
  const handleFormSubmit = async (state: FormState<Event>) => {
    try {
      if (state.mode === "EDIT" && state.data.id) {
        await axios.put(`${EVENTS_ENDPOINT}/${state.data.id}`, state.data);
      } else {
        await axios.post(EVENTS_ENDPOINT, state.data);
      }
      mutate(EVENTS_ENDPOINT);
      return true;
    } catch (err) {
      console.error("Handle error gracefully", err);
      return false;
    }
  };

  return (
    <Layout user={user} title="Events">
      <ListPage<Event> url="/api/events" onFormSubmit={handleFormSubmit}>
        {({ items, onItemClick, formState, onFormClose, onFormSubmit }) => (
          <>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {items.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <a href="#" onClick={onItemClick(event)}>
                        {event.name}
                      </a>
                    </td>
                    <td>
                      {event.fromDate}-{event.endDate}{" "}
                    </td>
                    <td>{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {formState.isOpen && (
              <EventsForm
                values={formState.data}
                onClose={onFormClose}
                onFormSubmit={onFormSubmit}
              />
            )}
          </>
        )}
      </ListPage>
    </Layout>
  );
};

export const getServerSideProps = securePage();

export default EventsPage;

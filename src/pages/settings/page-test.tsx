import React, { useState } from "react";
import { Container, Table } from "reactstrap";
import useSWR from "swr";
import Layout from "~/components/Layout";
import { securePage } from "~/lib/securePage";
import type { Event } from "~/database/entities/Event";
import type { FormState } from "~/types/FormMode";
import ListPage from "~/components/ListPage";

const PageTest = ({ user }) => (
  <Layout user={user} title="Events">
    <ListPage<Event> url="/api/events">
      {(data, onItemClick, form, onFormClose) => (
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
              {data.map((event) => (
                <tr key={event.id}>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onItemClick(event);
                      }}
                    >
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

          {form.isOpen && (
            <Container style={{ backgroundColor: "red" }}>
              <h1>Open the form</h1>
              <button onClick={onFormClose}>x</button>
            </Container>
          )}
        </>
      )}
    </ListPage>
  </Layout>
);

export const getServerSideProps = securePage();

export default PageTest;

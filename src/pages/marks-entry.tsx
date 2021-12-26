import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import EntitySelect from "~/components/EntitySelect";
import Layout from "~/components/Layout";

import { securePage } from "~/lib/securePage";

import { ClassGroup, Exam, FiscalYear, Subject } from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import prisma from "~/lib/prisma";
import axios from "axios";

interface MarksEntryProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
}

const MarksEntry = ({ user, fiscalYears }: MarksEntryProps) => {
  const [fiscalYear, setFiscalYear] = useState<FiscalYear>();

  const [examList, setExamList] = useState<Exam[]>([]);

  useEffect(() => {
    async function fetchExamList() {
      const { data } = await axios.get<Exam[]>(
        `/api/exams?fiscalYear=${fiscalYear?.id}`
      );
      setExamList(data);
    }
    if (fiscalYear) fetchExamList();
  }, [fiscalYear]);

  const handleFiscalYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const fiscalYearId = e.target.value;
    setFiscalYear(fiscalYears.find(({ id }) => fiscalYearId == id));
  };

  return (
    <Layout user={user} title="Marks Entry">
      <Row>
        <Col sm={3}>
          <Label>Year: </Label>
          <Input
            type="select"
            name="fiscalYear"
            id="fiscalYear"
            onChange={handleFiscalYearChange}
          >
            <option></option>
            {fiscalYears.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
        <Col sm={3}>
          <Label>Exam: </Label>
          <Input type="select" name="exam" id="exam">
            <option></option>
            {examList.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
      </Row>
    </Layout>
  );
};

export const getServerSideProps = securePage(async () => {
  const fiscalYears = await prisma.fiscalYear.findMany();

  return {
    fiscalYears,
  };
});

export default MarksEntry;

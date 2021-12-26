import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import EntitySelect from "~/components/EntitySelect";
import Layout from "~/components/Layout";

import { securePage } from "~/lib/securePage";

import { ClassGroup, Exam, FiscalYear, Subject } from "@prisma/client";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import prisma from "~/lib/prisma";

type QueryState = {
  fiscalYear?: FiscalYear;
  exam?: Exam;
  class?: ClassGroup;
  subject?: Subject;
};

interface MarksEntryProps extends PagePropsWithUser {
  fiscalYears: FiscalYear[];
  classGroups: ClassGroup[];
  exams: Exam[];
  subjects: Subject[];
}

const MarksEntry = ({
  user,
  fiscalYears,
  exams,
  classGroups,
  subjects,
}: MarksEntryProps) => {
  const [query, setQuery] = useState<QueryState>({});
  const handleParamsChange =
    (
      paramKey: string,
      items: Array<FiscalYear | Exam | ClassGroup | Subject>
    ): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();

      setQuery((prev) => {
        const id = e.target.value;
        const item = items.find(({ id: id_ }) => id_ === id);
        return {
          ...prev,
          [paramKey]: item,
        };
      });
    };

  const handleParamsChange1 = (
    paramKey: string,
    item: FiscalYear | ClassGroup | Subject | Exam
  ) => {
    setQuery((prev) => {
      return {
        ...prev,
        [paramKey]: item,
      };
    });
  };

  const optionTransformer = ({
    id,
    name,
  }: FiscalYear | ClassGroup | Subject | Exam) => ({
    label: name,
    value: id,
  });

  const fetchMarks = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
  };

  useEffect(() => {
    const { fiscalYear, exam, class: clazz, subject } = query;

    if (fiscalYear && exam && clazz && subject) fetchMarks();
  }, [query]);

  return (
    <Layout user={user} title="Marks Entry">
      <Row>
        <Col sm={3}>
          <Label>Year: </Label>
          <EntitySelect<FiscalYear>
            name="year"
            items={fiscalYears}
            optionTransformer={optionTransformer}
            onSelect={handleParamsChange1}
          />
        </Col>
        <Col sm={3}>
          <Label>Exam: </Label>
          <EntitySelect<Exam>
            name="exam"
            items={exams}
            optionTransformer={optionTransformer}
            onSelect={handleParamsChange1}
          />
        </Col>
        <Col sm={3}>
          <Label>Class: </Label>
          <Input
            type="select"
            name="class"
            id="class"
            onChange={handleParamsChange("class", classGroups)}
          >
            <option></option>
            {classGroups.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
        <Col sm={3}>
          <Label>Subject: </Label>
          <Input
            type="select"
            name="subject"
            id="subject"
            onChange={handleParamsChange("subject", subjects)}
          >
            <option></option>
            {subjects.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
        </Col>
      </Row>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </Layout>
  );
};

export const getServerSideProps = securePage(async () => {
  const years = await prisma.fiscalYear.findMany();
  const exams = await prisma.exam.findMany();
  const classGroups = await prisma.classGroup.findMany();
  const subjects = await prisma.subject.findMany();

  return {
    years,
    exams,
    classGroups,
    subjects,
  };
});

export default MarksEntry;

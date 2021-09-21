import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import EntitySelect from "~/components/EntitySelect";
import Layout from "~/components/Layout";
import { Class } from "~/database/entities/Class";
import { Exam } from "~/database/entities/Exam";
import { FiscalYear } from "~/database/entities/FiscalYear";
import { Subject } from "~/database/entities/Subject";
import { securePage } from "~/lib/securePage";

type QueryState = {
  year?: FiscalYear;
  exam?: Exam;
  class?: Class;
  subject?: Subject;
};

const MarksEntry = ({ user, years, exams, classes, subjects }) => {
  const [query, setQuery] = useState<QueryState>({
    year: null,
    exam: null,
    class: null,
  });
  const handleParamsChange =
    (
      paramKey: string,
      items: Array<FiscalYear | Exam | Class | Subject>
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
    item: FiscalYear | Class | Subject | Exam
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
  }: FiscalYear | Class | Subject | Exam) => ({
    label: name,
    value: id,
  });

  const fetchMarks = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
  };

  useEffect(() => {
    const { year, exam, class: clazz, subject } = query;

    if (year && exam && clazz && subject) fetchMarks();
  }, [query]);

  return (
    <Layout user={user} title="Marks Entry">
      <Row>
        <Col sm={3}>
          <Label>Year: </Label>
          <EntitySelect<FiscalYear>
            name="year"
            items={years}
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
            onChange={handleParamsChange("class", classes)}
          >
            <option></option>
            {classes.map(({ id, name }) => (
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
  const years = await FiscalYear.find();
  const exams = await Exam.find();
  const classes = await Class.find();
  const subjects = await Subject.find();

  return {
    years,
    exams,
    classes,
    subjects,
  };
});

export default MarksEntry;

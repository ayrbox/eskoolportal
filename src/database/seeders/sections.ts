const SECTIONS = ["A", "B", "C"];
const { v4: uuidv4 } = require("uuid");

import { BaseEntity } from "typeorm";
import { Section } from "../entities/Section";

export default function (): Promise<BaseEntity[]> {
  const sections = SECTIONS.map((name, idx) => ({
    id: uuidv4(),
    name,
    order: idx,
  })) as Section[];

  return Section.save(sections);
}

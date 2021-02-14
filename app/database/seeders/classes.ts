const CLASSES: string[] = [
  'Nursery',
  'JKG',
  'SKG',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];
const { v4: uuidv4 } = require('uuid');

import { BaseEntity } from 'typeorm';
import { Class } from '../entities/Class';

export default function (): Promise<BaseEntity[]> {
  const classes = CLASSES.map((name, idx) => ({
    id: uuidv4(),
    name,
    order: idx,
  })) as Class[];
  return Class.save(classes);
}

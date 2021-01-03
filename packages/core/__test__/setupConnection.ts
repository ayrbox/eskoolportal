import { createConnection, getConnection } from 'typeorm';
import entities from '../src/entities';

const url = 'postgresql://eskuser:eskpassword@localhost:5466/test_eskoolportal'; // TODO read from some config

const connect = async (): Promise<void> => {
  console.log('Setting up test connection');
  // try {
  //   getConnection();
  // } catch {
  //   await createConnection({
  //     type: 'postgres',
  //     url,
  //     logging: true,
  //     entities,
  //   });
  //   console.log('DB connected');
  // }
};

connect()
  .then(() => console.log('Database connected..'))
  .catch((err) => console.error('Error connecting', err));

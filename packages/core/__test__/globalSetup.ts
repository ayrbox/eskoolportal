import { seederIndex } from '../src/seeders';

export default async function (): Promise<void> {
  console.log('Setting up database for testing....');
  // await seederIndex();
  console.log('Seeding of database completed...');
  console.log('Global Setup complete');
}

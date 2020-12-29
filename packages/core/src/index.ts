import path from 'path';
import { createConnection } from 'typeorm';

import entities, { Class, Student } from './entities';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: 'postgresql://eskuser:eskpassword@localhost:5466/eskoolportal',
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities,
  });
  // await conn.runMigrations();
  // await Post.delete({});

  const a = await Class.findOne();

  if (a) {
    const studentsInClass = await a.students;
    console.log('Students - >>>>>>>>>>>>', studentsInClass);
  }

  // const s = await Student.findOne({ where: { name: 'Sabin' } });
  // console.log('.>>>>>>>>>>>>>>>', s!.class, s!.section);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
  });

/**
 * Issue with Typeorm migrations and nextJs :(
 *
 * Issue:
 *   Typeorm uses typescript commonjs module to run migrations but nextjs requires esnext.
 *   So when we run migrations with esnext module in tsconfig.json, it throws
 *     ```
 *     SyntaxError: Cannot use import statement outside a module
 *     ```
 * Solution:
 *   Explicitly importing migrations classes gets files compiled before migration run
 *
 *
 * Pros:
 *   - With this approach we can determine which migrations are to include to get auto run instead everything.
 *
 * Cons:
 *   - For each migrations would need import and export in default array.  ¯\_(ツ)_/¯
 */
import { InitialMigration1615164241177 } from "./1615164241177-InitialMigration";
import { classSubject1616968264288 } from "./1616968264288-classSubject";
import { fiscalyear1619827491114 } from "./1619827491114-fiscalyear";
import { entitySoftdelete1620077998064 } from "./1620077998064-entity_softdelete";
import { studentMedicalHistory1620598561987 } from "./1620598561987-student_medical_history";

export default [
  InitialMigration1615164241177,
  classSubject1616968264288,
  fiscalyear1619827491114,
  entitySoftdelete1620077998064,
  studentMedicalHistory1620598561987,
];

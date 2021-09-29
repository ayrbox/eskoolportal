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
import { events1625014110835 } from "./1625014110835-events";
import { exam1628730042401 } from "./1628730042401-exam";
import { grades1629158997723 } from "./1629158997723-grades";
import { examNames1632957021579 } from "./1632957021579-exam_names";
import { examSettings1632958890284 } from "./1632958890284-exam_settings";
import { examSettingsAddClass1632959198909 } from "./1632959198909-exam_settings_add_class";

export default [
  InitialMigration1615164241177,
  classSubject1616968264288,
  fiscalyear1619827491114,
  entitySoftdelete1620077998064,
  studentMedicalHistory1620598561987,
  events1625014110835,
  exam1628730042401,
  grades1629158997723,
  examNames1632957021579,
  examSettings1632958890284,
  examSettingsAddClass1632959198909,
];

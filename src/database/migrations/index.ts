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
import { InitialMigration1615164241177 } from './1615164241177-InitialMigration';

export default [InitialMigration1615164241177];

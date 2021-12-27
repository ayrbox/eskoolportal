## Migration

Generates migrations for any changes in database.

```
yarn generate:migration -n <MigrationName>
```

## Seeding

```
yarn seed:db
```

# Tasks

1. Prisma: StudentGrade to ObtainedMarks
2. Add Exam Setting Page with (Marks Name Dialog box)
3. Marks Entry Page
   Steps:

   - Select Fiscal Year (Always select current fiscal year)
   - List exams for current fiscal year
   - Select subject
   - Enter Student Code (display studnet details, fullmarks, pass marks and focus on marks entry)
   - Repeat

4. Evalute/Print Student List for manual marks entry.
   Steps:

   - Select Fiscal Year, Exam, Class, Section, Subject
   - List all the students with marks obtained (if entered) else blank page.
   - Print

5. Integrate Nepali Calendar and component that select current fiscal year.

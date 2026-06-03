# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- easy: Straightforward implementation, trivial bug fix or feature
- medium: Moderate complexity, some edge cases or caveats to consider
- hard: Complex logic, many caveats, architectural considerations, or high-risk changes

Create a technical specification for the task that is appropriate for the complexity level:

- Review the existing codebase architecture and identify reusable components.
- Define the implementation approach based on established patterns in the project.
- Identify all source code files that will be created or modified.
- Define any necessary data model, API, or interface changes.
- Describe verification steps using the project's test and lint commands.

Save the output to `d:\project\travelita-next\.zencoder\chats\c5e280e9-5b68-4f9c-9ceb-7b1c7553346f/spec.md`.

---

### [x] Step 1: Update Prisma Schema
- Modify `prisma/schema.prisma` to include `ServiceContent`, `ServicePackage`, and `ServiceFaq`.
- Fix `Booking` model relations.
- Run `npx prisma generate` and `npx prisma db push` (or create migration).

### [x] Step 2: Implement Server Actions
- Create `app/actions/content.ts`.
- Implement `getServiceContent` and `updateServiceContent`.
- Add Zod validation for content input.

### [x] Step 3: Update AdminContentTemplate
- Integrate server actions into `AdminContentTemplate.tsx`.
- Handle success/error feedback for the save operation.

### [x] Step 4: Refactor Content Pages
- Update `app/admin/(pages)/content/*/page.tsx` to fetch data from the database.
- Handle the case where no data exists (show initial hardcoded data as default).

### [x] Step 5: Verification & Cleanup
- Run lint and type checks.
- Verify all content pages work as expected.
- Write report to `report.md`.

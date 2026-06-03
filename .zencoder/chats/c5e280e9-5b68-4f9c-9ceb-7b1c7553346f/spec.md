# Technical Specification: Dynamic Content Management for Admin

This specification outlines the changes required to make the service content (General Info, Packages, FAQs) dynamic and manageable via the Admin dashboard. It also includes fixes for database relations in the `Booking` model.

## Technical Context
- **Framework**: Next.js (App Router)
- **Database**: Prisma with MySQL
- **State Management**: React `useState` (for local form state)
- **Data Validation**: Zod
- **Authentication**: NextAuth.js

## Implementation Approach

### 1. Database Schema Changes (`prisma/schema.prisma`)
- **Fix `Booking` Relation**: Correct the `user` relation in the `Booking` model to use `@relation` properly.
- **Add `ServiceContent` Model**: Store hero/general information for each service.
- **Add `ServicePackage` Model**: Store package details related to a service.
- **Add `ServiceFaq` Model**: Store FAQs related to a service.
- **Sync `BookingType`**: Ensure `BookingType` enum values match the services (consider renaming `SPEAR_CAR` to `SPEAR_FISHING` if appropriate, but keep it for now if it affects existing data).

### 2. Server Actions
- `getServiceContent(serviceType: BookingType)`: Fetches the content, packages, and FAQs for a specific service.
- `updateServiceContent(serviceType: BookingType, data: ContentInput)`: Upserts the content and replaces/updates packages and FAQs.

### 3. Frontend Changes
- **`AdminContentTemplate.tsx`**:
    - Add a `onSave` prop or internal logic to call the `updateServiceContent` action.
    - Show loading states during save.
- **Admin Pages (`app/admin/(pages)/content/*/page.tsx`)**:
    - Convert to async Server Components.
    - Fetch initial data using `getServiceContent`.
    - Pass fetched data to `AdminContentTemplate`.

## Source Code Structure Changes

- `prisma/schema.prisma`: Modified to include new models and fix relations.
- `app/actions/content.ts`: New file for content management actions.
- `app/components/admin/templates/AdminContentTemplate.tsx`: Updated to handle persistence.
- `app/admin/(pages)/content/*/page.tsx`: Updated to fetch data dynamically.

## Data Model Changes

### New Models:
- `ServiceContent`: `id`, `serviceType` (unique), `badge`, `title`, `subtitle`, `description`, `ctaPrimary`, `ctaSecondary`.
- `ServicePackage`: `id`, `contentId`, `name`, `description`, `price`, `features` (String), `badge`, `highlighted` (Boolean).
- `ServiceFaq`: `id`, `contentId`, `question`, `answer`.

### Relation Fix:
- `Booking.user`: From `User[]` to `User @relation(...)`.

## Verification Approach
- **Prisma**: Run `npx prisma validate` and `npx prisma generate`.
- **Manual**: Verify that saving changes in the Admin dashboard persists the data and reflects on the pages after refresh.
- **Lint**: Run `npm run lint` to ensure no regressions.

# Component Tests

Component tests have been temporarily disabled due to React 19 compatibility issues with React Testing Library.

The following test files need to be updated for React 19:

- UploadPage.test.tsx
- ParsingPage.test.tsx

They use `React.act` which is not compatible with the current testing library version.

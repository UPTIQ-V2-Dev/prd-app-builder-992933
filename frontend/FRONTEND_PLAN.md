# Treasury Solutions Agent - Frontend Implementation Plan

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn/UI with Tailwind CSS v4
- **State Management**: Zustand
- **API Client**: TanStack Query (React Query)
- **Charts**: Recharts
- **File Upload**: React Dropzone
- **Testing**: Vitest + React Testing Library + MSW

## Page-by-Page Implementation Plan

### 1. Landing/Upload Page (`/`)

**Components:**

- `UploadZone` - Drag & drop file upload with progress
- `ConnectBankModal` - API connection modal
- `FilePreview` - Show uploaded file info
- `UploadProgress` - Progress indicator

**Utils:**

- `fileValidation.ts` - Validate PDF/CSV files
- `uploadApi.ts` - Handle file uploads

**Types:**

- `FileUpload` - File upload state
- `BankConnection` - Bank API connection data

**API Endpoints:**

- `POST /api/upload` - Upload bank statements
- `POST /api/connect-bank` - Connect bank API

### 2. Data Parsing Screen (`/parsing`)

**Components:**

- `ParsingProgress` - Animated parsing visualization
- `ParsedSummary` - Summary table of extracted data
- `ErrorHandler` - Handle parsing errors

**Utils:**

- `parseStatusPoller.ts` - Poll parsing status
- `transactionFormatter.ts` - Format parsed transactions

**Types:**

- `ParseStatus` - Parsing progress state
- `Transaction` - Transaction data model

**API Endpoints:**

- `GET /api/parsing-status/:id` - Check parsing progress
- `GET /api/parsed-data/:id` - Get parsed results

### 3. Analysis Dashboard (`/dashboard`)

**Components:**

- `DashboardCards` - Key metrics display
- `TransactionChart` - Inflow/outflow visualization
- `LiquidityHeatmap` - Cash flow patterns
- `DateFilter` - Filter transactions by date
- `CategoryFilter` - Filter by transaction type

**Utils:**

- `chartUtils.ts` - Chart data transformations
- `metricsCalculator.ts` - Calculate financial metrics
- `dateUtils.ts` - Date filtering logic

**Types:**

- `DashboardMetrics` - Dashboard data structure
- `ChartData` - Chart visualization data
- `FilterState` - Filter configuration

**API Endpoints:**

- `GET /api/dashboard/:clientId` - Dashboard data
- `GET /api/transactions/:clientId` - Transaction history

### 4. Recommendations Page (`/recommendations`)

**Components:**

- `RecommendationCard` - Individual product recommendation
- `ProductDetails` - Detailed product information
- `BenefitCalculator` - Show estimated benefits
- `ApprovalWorkflow` - Admin review/approval

**Utils:**

- `recommendationEngine.ts` - Process recommendations
- `benefitCalculator.ts` - Calculate financial benefits
- `priorityUtils.ts` - Sort recommendations by priority

**Types:**

- `Recommendation` - Recommendation data model
- `Product` - Treasury product details
- `BenefitEstimate` - Financial impact calculation

**API Endpoints:**

- `GET /api/recommendations/:clientId` - Get recommendations
- `POST /api/recommendations/approve` - Approve recommendations
- `GET /api/products` - Product catalog

### 5. Reports/Summary Page (`/reports`)

**Components:**

- `ReportPreview` - Preview generated report
- `DownloadButton` - Generate and download PDF
- `ReportSettings` - Customize report content
- `ShareOptions` - Share report via email

**Utils:**

- `reportGenerator.ts` - Generate report content
- `pdfExporter.ts` - Export to PDF format
- `emailUtils.ts` - Send reports via email

**Types:**

- `ReportConfig` - Report generation settings
- `ReportData` - Report content structure

**API Endpoints:**

- `POST /api/reports/generate` - Generate report
- `GET /api/reports/:id` - Download report
- `POST /api/reports/share` - Share report

## Common Components & Layout

### Layout Components

- `AppLayout` - Main application layout
- `Header` - Navigation header with step indicator
- `Sidebar` - Navigation sidebar (admin features)
- `Footer` - Application footer
- `StepIndicator` - Progress through workflow

### Shared Components

- `LoadingSpinner` - Loading states
- `ErrorBoundary` - Error handling
- `Toast` - Notifications
- `Modal` - Reusable modal wrapper
- `DataTable` - Transaction/data display
- `Button` - Custom button variants
- `Card` - Content containers
- `Badge` - Status indicators
- `Tooltip` - Help text

### Utils & Services

- `api.ts` - Base API configuration
- `auth.ts` - Authentication logic
- `storage.ts` - Local storage utilities
- `validation.ts` - Form validation schemas
- `constants.ts` - Application constants
- `formatters.ts` - Data formatting utilities
- `permissions.ts` - Role-based access control

### Types & Interfaces

- `User` - User data model
- `Client` - Client information
- `ApiResponse` - Standard API response
- `Permission` - User permissions
- `Theme` - Dark/light mode types

### State Management (Zustand)

- `useAuthStore` - Authentication state
- `useUploadStore` - File upload state
- `useDashboardStore` - Dashboard data
- `useRecommendationsStore` - Recommendations data
- `useUIStore` - UI state (modals, toasts)

## Testing Strategy

### Testing Framework Setup

- **Vitest** - Unit test runner with React 19 support
- **React Testing Library** - Component testing utilities
- **MSW (Mock Service Worker)** - API mocking
- **@testing-library/user-event** - User interaction simulation

### Test Organization

```
src/
├── __tests__/           # Global test utilities
├── components/
│   └── __tests__/       # Component tests
├── pages/
│   └── __tests__/       # Page tests
├── utils/
│   └── __tests__/       # Utility tests
└── services/
    └── __tests__/       # Service tests
```

### Test Files & Naming Convention

- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utility tests: `utilityName.test.ts`
- Page tests: `PageName.test.tsx`
- Integration tests: `feature.integration.test.tsx`

### Key Test Utilities

**Setup Files:**

- `src/setupTests.ts` - Global test configuration
- `src/test-utils.tsx` - Custom render with providers
- `src/mocks/handlers.ts` - MSW API handlers
- `src/mocks/server.ts` - MSW server setup

**Test Utilities:**

```typescript
// src/test-utils.tsx
export const renderWithProviders = (ui, options) => {
  // Wrapper with QueryClient, Zustand stores, etc.
}

export const createMockUser = () => ({ ... })
export const createMockTransaction = () => ({ ... })
```

### Testing Coverage by Feature

#### 1. Upload Page Tests

- File drop zone functionality
- File validation (PDF/CSV only)
- Upload progress tracking
- Bank connection modal
- Error handling (file size, format)

#### 2. Parsing Screen Tests

- Progress indicator updates
- Polling mechanism for parse status
- Error state handling
- Data preview rendering

#### 3. Dashboard Tests

- Metrics calculation accuracy
- Chart data transformation
- Filter functionality (date, category)
- Responsive layout
- Loading states

#### 4. Recommendations Tests

- Recommendation card rendering
- Benefit calculation display
- Approval workflow (admin users)
- Product details modal

#### 5. Reports Tests

- Report generation
- PDF download functionality
- Email sharing
- Report customization options

### Service/API Testing with MSW

```typescript
// Mock handlers for each API endpoint
export const handlers = [
  rest.post('/api/upload', (req, res, ctx) => { ... }),
  rest.get('/api/dashboard/:clientId', (req, res, ctx) => { ... }),
  rest.get('/api/recommendations/:clientId', (req, res, ctx) => { ... }),
]
```

### Critical Test Scenarios

1. **Form Validation**: File upload constraints, required fields
2. **State Transitions**: Upload → Parsing → Dashboard → Recommendations
3. **Error Handling**: Network failures, parsing errors, invalid data
4. **Permission Testing**: Role-based access (RM, Admin, Viewer)
5. **Data Flow**: API responses to UI state updates
6. **User Interactions**: Drag & drop, filtering, modal operations

### Component Test Patterns

```typescript
// Component test example
describe('UploadZone', () => {
    it('accepts valid file uploads', async () => {
        const file = new File(['content'], 'statement.pdf', { type: 'application/pdf' });
        // Test drag & drop, validation, upload trigger
    });
});

// Hook test example
describe('useUploadStore', () => {
    it('manages upload state correctly', () => {
        // Test state mutations, async actions
    });
});

// Integration test example
describe('Upload Flow', () => {
    it('completes full upload to parsing flow', async () => {
        // Test end-to-end user journey
    });
});
```

### Performance Testing

- Bundle size analysis with Vite Bundle Analyzer
- Component rendering performance
- API response time validation
- Memory leak detection in long-running sessions

### Accessibility Testing

- Screen reader compatibility
- Keyboard navigation
- Color contrast validation
- ARIA attributes testing

### Test Coverage Goals

- **Unit Tests**: 90%+ coverage for utilities and services
- **Component Tests**: 85%+ coverage for UI components
- **Integration Tests**: Key user flows and API interactions
- **E2E Tests**: Critical business workflows

This comprehensive plan ensures robust testing coverage while maintaining development velocity and code quality standards for the Treasury Solutions Agent application.

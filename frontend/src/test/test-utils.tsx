import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { mockClient, mockTransactions, mockRecommendations } from '@/data/treasuryMockData';
import type { Client, Transaction, Recommendation, Product } from '@/types/treasury';

// Create a custom render function that includes providers
const createTestQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Don't retry failed requests in tests
                gcTime: 0 // Disable caching in tests
            },
            mutations: {
                retry: false
            }
        }
    });
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    queryClient?: QueryClient;
    initialRoute?: string;
}

export const renderWithProviders = (ui: ReactElement, options: CustomRenderOptions = {}) => {
    const { queryClient = createTestQueryClient(), initialRoute = '/', ...renderOptions } = options;

    // Set initial route if provided
    if (initialRoute !== '/') {
        window.history.pushState({}, 'Test page', initialRoute);
    }

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        return (
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{children}</BrowserRouter>
            </QueryClientProvider>
        );
    };

    return {
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
        queryClient
    };
};

// Mock data creators for tests
export const createMockClient = (overrides?: Partial<Client>): Client => ({
    ...mockClient,
    ...overrides
});

export const createMockTransaction = (overrides?: Partial<Transaction>): Transaction => ({
    ...mockTransactions[0],
    id: `txn-${Date.now()}-${Math.random()}`,
    ...overrides
});

export const createMockRecommendation = (overrides?: Partial<Recommendation>): Recommendation => ({
    ...mockRecommendations[0],
    id: `rec-${Date.now()}-${Math.random()}`,
    ...overrides
});

export const createMockProduct = (overrides?: Partial<Product>): Product => ({
    id: `prod-${Date.now()}-${Math.random()}`,
    name: 'Test Treasury Product',
    type: 'sweep_account',
    description: 'A test treasury product for testing purposes',
    eligibilityRules: {
        minBalance: 50000,
        transactionVolume: 100
    },
    benefitType: 'interest_earning',
    estimatedAnnualBenefit: 5000,
    features: ['Test feature 1', 'Test feature 2'],
    ...overrides
});

// Mock file creation for upload tests
export const createMockFile = (
    name: string = 'test-statement.pdf',
    type: string = 'application/pdf',
    size: number = 1024 * 1024 // 1MB
): File => {
    const content = new Array(size)
        .fill(0)
        .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
        .join('');
    return new File([content], name, { type });
};

// Mock CSV file
export const createMockCSVFile = (name: string = 'transactions.csv'): File => {
    const csvContent = `Date,Amount,Type,Description
2024-10-20,50000,inflow,Customer payment
2024-10-19,-12000,outflow,Employee salaries
2024-10-18,25000,inflow,Service contract payment`;

    return new File([csvContent], name, { type: 'text/csv' });
};

// Mock PDF file
export const createMockPDFFile = (name: string = 'bank-statement.pdf'): File => {
    const pdfContent = '%PDF-1.4 Mock bank statement content';
    return new File([pdfContent], name, { type: 'application/pdf' });
};

// Test helpers for user interactions
export const waitForLoadingToFinish = () => {
    return new Promise(resolve => setTimeout(resolve, 0));
};

// Mock window.URL.createObjectURL for file download tests
export const mockCreateObjectURL = () => {
    Object.defineProperty(window.URL, 'createObjectURL', {
        writable: true,
        value: vi.fn().mockReturnValue('mocked-url')
    });
};

// Mock window.URL.revokeObjectURL for cleanup
export const mockRevokeObjectURL = () => {
    Object.defineProperty(window.URL, 'revokeObjectURL', {
        writable: true,
        value: vi.fn()
    });
};

// Export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };

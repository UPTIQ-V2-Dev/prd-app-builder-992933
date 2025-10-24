import '@testing-library/jest-dom';
import { afterEach } from 'vitest';

// Basic cleanup after each test
afterEach(() => {
    // Basic cleanup without React Testing Library due to compatibility issues
});

// Mock environment variables for tests
Object.defineProperty(import.meta, 'env', {
    value: {
        VITE_USE_MOCK_DATA: 'true',
        ...import.meta.env
    }
});

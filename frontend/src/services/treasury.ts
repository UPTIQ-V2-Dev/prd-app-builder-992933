import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import {
    mockUploadResponse,
    mockParseStatusResponse,
    mockDashboardResponse,
    mockRecommendationsResponse,
    mockReportData,
    mockBankConnections
} from '@/data/treasuryMockData';
import type {
    UploadFileRequest,
    ConnectBankRequest,
    UploadFileResponse,
    ParseStatusResponse,
    DashboardResponse,
    RecommendationsResponse,
    ReportConfig,
    ReportData,
    BankConnection
} from '@/types/treasury';

export const treasuryService = {
    // File Upload Services
    uploadFile: async (request: UploadFileRequest): Promise<UploadFileResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: uploadFile ---', request);
            await mockApiDelay(2000); // Simulate longer upload time
            return mockUploadResponse;
        }

        const formData = new FormData();
        formData.append('file', request.file);
        if (request.clientId) {
            formData.append('clientId', request.clientId);
        }

        const response = await api.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    connectBank: async (request: ConnectBankRequest): Promise<UploadFileResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: connectBank ---', request);
            await mockApiDelay(1500);
            return {
                ...mockUploadResponse,
                uploadId: 'bank-connection-001',
                message: 'Bank connection established successfully. Importing transaction data...'
            };
        }

        const response = await api.post('/api/connect-bank', request);
        return response.data;
    },

    // Parsing Services
    getParsingStatus: async (uploadId: string): Promise<ParseStatusResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getParsingStatus ---', uploadId);
            await mockApiDelay();
            return mockParseStatusResponse;
        }

        const response = await api.get(`/api/parsing-status/${uploadId}`);
        return response.data;
    },

    getParsedData: async (uploadId: string): Promise<ParseStatusResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getParsedData ---', uploadId);
            await mockApiDelay();
            return mockParseStatusResponse;
        }

        const response = await api.get(`/api/parsed-data/${uploadId}`);
        return response.data;
    },

    // Dashboard Services
    getDashboardData: async (clientId: string): Promise<DashboardResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getDashboardData ---', clientId);
            await mockApiDelay();
            return mockDashboardResponse;
        }

        const response = await api.get(`/api/dashboard/${clientId}`);
        return response.data;
    },

    getTransactions: async (
        clientId: string,
        params?: {
            startDate?: string;
            endDate?: string;
            categories?: string[];
            types?: string[];
        }
    ): Promise<DashboardResponse['transactions']> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getTransactions ---', clientId, params);
            await mockApiDelay();
            return mockDashboardResponse.transactions;
        }

        const queryParams = new URLSearchParams();
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);
        if (params?.categories) {
            params.categories.forEach(cat => queryParams.append('categories', cat));
        }
        if (params?.types) {
            params.types.forEach(type => queryParams.append('types', type));
        }

        const response = await api.get(`/api/transactions/${clientId}?${queryParams}`);
        return response.data;
    },

    // Recommendations Services
    getRecommendations: async (clientId: string): Promise<RecommendationsResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getRecommendations ---', clientId);
            await mockApiDelay();
            return mockRecommendationsResponse;
        }

        const response = await api.get(`/api/recommendations/${clientId}`);
        return response.data;
    },

    approveRecommendations: async (recommendationIds: string[]): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: approveRecommendations ---', recommendationIds);
            await mockApiDelay();
            return;
        }

        await api.post('/api/recommendations/approve', { recommendationIds });
    },

    getProducts: async (): Promise<RecommendationsResponse['recommendations'][0]['product'][]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getProducts ---');
            await mockApiDelay();
            return mockRecommendationsResponse.recommendations.map(rec => rec.product);
        }

        const response = await api.get('/api/products');
        return response.data;
    },

    // Reports Services
    generateReport: async (config: ReportConfig): Promise<{ reportId: string }> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: generateReport ---', config);
            await mockApiDelay(3000); // Simulate report generation time
            return { reportId: 'report-001' };
        }

        const response = await api.post('/api/reports/generate', config);
        return response.data;
    },

    downloadReport: async (reportId: string): Promise<Blob> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: downloadReport ---', reportId);
            await mockApiDelay();
            // Create a mock PDF blob
            const mockPdfContent = `%PDF-1.4 Treasury Solutions Report for ${mockReportData.client.name}`;
            return new Blob([mockPdfContent], { type: 'application/pdf' });
        }

        const response = await api.get(`/api/reports/${reportId}`, {
            responseType: 'blob'
        });
        return response.data;
    },

    getReportData: async (reportId: string): Promise<ReportData> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getReportData ---', reportId);
            await mockApiDelay();
            return mockReportData;
        }

        const response = await api.get(`/api/reports/${reportId}/data`);
        return response.data;
    },

    shareReport: async (reportId: string, emailAddresses: string[]): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: shareReport ---', reportId, emailAddresses);
            await mockApiDelay();
            return;
        }

        await api.post('/api/reports/share', { reportId, emailAddresses });
    },

    // Bank Connection Services
    getBankConnections: async (clientId: string): Promise<BankConnection[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getBankConnections ---', clientId);
            await mockApiDelay();
            return mockBankConnections;
        }

        const response = await api.get(`/api/bank-connections/${clientId}`);
        return response.data;
    },

    disconnectBank: async (connectionId: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: disconnectBank ---', connectionId);
            await mockApiDelay();
            return;
        }

        await api.delete(`/api/bank-connections/${connectionId}`);
    },

    syncBankData: async (connectionId: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: syncBankData ---', connectionId);
            await mockApiDelay(2000);
            return;
        }

        await api.post(`/api/bank-connections/${connectionId}/sync`);
    }
};

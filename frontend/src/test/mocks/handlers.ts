import { http, HttpResponse } from 'msw';
import {
    mockUploadResponse,
    mockParseStatusResponse,
    mockDashboardResponse,
    mockRecommendationsResponse,
    mockReportData,
    mockBankConnections
} from '@/data/treasuryMockData';

export const handlers = [
    // File Upload endpoints
    http.post('/api/upload', async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return HttpResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Simulate file validation
        if (file.type !== 'application/pdf' && file.type !== 'text/csv') {
            return HttpResponse.json(
                { error: 'Invalid file type. Only PDF and CSV files are allowed.' },
                { status: 400 }
            );
        }

        if (file.size > 10 * 1024 * 1024) {
            // 10MB
            return HttpResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
        }

        return HttpResponse.json(mockUploadResponse);
    }),

    http.post('/api/connect-bank', async ({ request }) => {
        const body = (await request.json()) as any;

        if (!body.bankName || !body.username || !body.password) {
            return HttpResponse.json({ error: 'Missing required bank connection parameters' }, { status: 400 });
        }

        return HttpResponse.json({
            ...mockUploadResponse,
            uploadId: 'bank-connection-001',
            message: 'Bank connection established successfully. Importing transaction data...'
        });
    }),

    // Parsing endpoints
    http.get('/api/parsing-status/:id', ({ params }) => {
        const { id } = params;
        return HttpResponse.json({
            ...mockParseStatusResponse,
            id: id as string
        });
    }),

    http.get('/api/parsed-data/:id', ({ params }) => {
        const { id } = params;
        return HttpResponse.json({
            ...mockParseStatusResponse,
            id: id as string
        });
    }),

    // Dashboard endpoints
    http.get('/api/dashboard/:clientId', ({ params }) => {
        const { clientId } = params;
        return HttpResponse.json({
            ...mockDashboardResponse,
            client: { ...mockDashboardResponse.client, id: clientId as string }
        });
    }),

    http.get('/api/transactions/:clientId', ({ request }) => {
        const url = new URL(request.url);
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        const categories = url.searchParams.getAll('categories');
        const types = url.searchParams.getAll('types');

        // Filter mock transactions based on query parameters
        let filteredTransactions = [...mockDashboardResponse.transactions];

        if (startDate || endDate) {
            filteredTransactions = filteredTransactions.filter(tx => {
                const txDate = new Date(tx.date);
                if (startDate && txDate < new Date(startDate)) return false;
                if (endDate && txDate > new Date(endDate)) return false;
                return true;
            });
        }

        if (categories.length > 0) {
            filteredTransactions = filteredTransactions.filter(tx => categories.includes(tx.category));
        }

        if (types.length > 0) {
            filteredTransactions = filteredTransactions.filter(tx => types.includes(tx.type));
        }

        return HttpResponse.json(filteredTransactions);
    }),

    // Recommendations endpoints
    http.get('/api/recommendations/:clientId', ({ params }) => {
        const { clientId } = params;
        return HttpResponse.json({
            ...mockRecommendationsResponse,
            recommendations: mockRecommendationsResponse.recommendations.map(rec => ({
                ...rec,
                clientId: clientId as string
            }))
        });
    }),

    http.post('/api/recommendations/approve', async ({ request }) => {
        const body = (await request.json()) as any;

        if (!body.recommendationIds || !Array.isArray(body.recommendationIds)) {
            return HttpResponse.json({ error: 'Invalid recommendation IDs provided' }, { status: 400 });
        }

        return HttpResponse.json({ success: true });
    }),

    http.get('/api/products', () => {
        const products = mockRecommendationsResponse.recommendations.map(rec => rec.product);
        return HttpResponse.json(products);
    }),

    // Reports endpoints
    http.post('/api/reports/generate', async ({ request }) => {
        const config = (await request.json()) as any;

        if (!config.clientId) {
            return HttpResponse.json({ error: 'Client ID is required' }, { status: 400 });
        }

        // Simulate report generation delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return HttpResponse.json({ reportId: 'report-001' });
    }),

    http.get('/api/reports/:id', ({ params }) => {
        const { id } = params;
        // Return mock PDF blob
        const mockPdfContent = `%PDF-1.4 Treasury Solutions Report for ${mockReportData.client.name}`;
        return HttpResponse.text(mockPdfContent, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="treasury-report-${id}.pdf"`
            }
        });
    }),

    http.get('/api/reports/:id/data', ({ params }) => {
        const { id } = params;
        return HttpResponse.json({
            ...mockReportData,
            id: id as string
        });
    }),

    http.post('/api/reports/share', async ({ request }) => {
        const body = (await request.json()) as any;

        if (!body.reportId || !body.emailAddresses || !Array.isArray(body.emailAddresses)) {
            return HttpResponse.json({ error: 'Missing required parameters for sharing report' }, { status: 400 });
        }

        return HttpResponse.json({ success: true });
    }),

    // Bank Connection endpoints
    http.get('/api/bank-connections/:clientId', () => {
        return HttpResponse.json(mockBankConnections);
    }),

    http.delete('/api/bank-connections/:connectionId', () => {
        return HttpResponse.json({ success: true });
    }),

    http.post('/api/bank-connections/:connectionId/sync', () => {
        return HttpResponse.json({ success: true });
    })
];

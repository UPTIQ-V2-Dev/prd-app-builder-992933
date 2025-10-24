import type {
    Client,
    Transaction,
    Product,
    Recommendation,
    DashboardMetrics,
    ChartData,
    DashboardResponse,
    RecommendationsResponse,
    UploadFileResponse,
    ParseStatusResponse,
    ReportData,
    BankConnection
} from '@/types/treasury';

// Mock client data
export const mockClient: Client = {
    id: 'client-001',
    name: 'TechCorp Solutions Inc.',
    accountIds: ['acc-001', 'acc-002', 'acc-003'],
    relationshipManager: 'Sarah Johnson',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-10-20T14:30:00Z'
};

// Mock transactions
export const mockTransactions: Transaction[] = [
    {
        id: 'txn-001',
        date: '2024-10-20',
        amount: 50000,
        type: 'inflow',
        category: 'Revenue',
        description: 'Customer payment - Invoice #12345',
        accountId: 'acc-001',
        metadata: { invoiceId: '12345', customerId: 'cust-001' }
    },
    {
        id: 'txn-002',
        date: '2024-10-19',
        amount: -12000,
        type: 'outflow',
        category: 'Payroll',
        description: 'Employee salaries - October 2024',
        accountId: 'acc-001'
    },
    {
        id: 'txn-003',
        date: '2024-10-18',
        amount: 25000,
        type: 'inflow',
        category: 'Revenue',
        description: 'Service contract payment',
        accountId: 'acc-002'
    },
    {
        id: 'txn-004',
        date: '2024-10-17',
        amount: -8500,
        type: 'outflow',
        category: 'Operating Expenses',
        description: 'Office rent - October 2024',
        accountId: 'acc-001'
    },
    {
        id: 'txn-005',
        date: '2024-10-16',
        amount: -3200,
        type: 'outflow',
        category: 'Utilities',
        description: 'Electricity and internet bills',
        accountId: 'acc-001'
    },
    {
        id: 'txn-006',
        date: '2024-10-15',
        amount: 75000,
        type: 'inflow',
        category: 'Revenue',
        description: 'Large client payment - Q4 contract',
        accountId: 'acc-002'
    },
    {
        id: 'txn-007',
        date: '2024-10-14',
        amount: -15000,
        type: 'outflow',
        category: 'Inventory',
        description: 'Raw materials purchase',
        accountId: 'acc-003'
    },
    {
        id: 'txn-008',
        date: '2024-10-13',
        amount: 30000,
        type: 'inflow',
        category: 'Revenue',
        description: 'Monthly subscription revenues',
        accountId: 'acc-001'
    }
];

// Mock products
export const mockProducts: Product[] = [
    {
        id: 'prod-001',
        name: 'Corporate Sweep Account',
        type: 'sweep_account',
        description:
            'Automatically sweep excess funds to high-yield savings, maximizing interest earnings while maintaining liquidity.',
        eligibilityRules: {
            minBalance: 50000,
            transactionVolume: 100
        },
        benefitType: 'interest_earning',
        estimatedAnnualBenefit: 8400,
        features: [
            'Automatic overnight sweeping',
            'Competitive interest rates',
            '24/7 liquidity access',
            'Real-time balance monitoring'
        ]
    },
    {
        id: 'prod-002',
        name: 'Zero Balance Account',
        type: 'zero_balance',
        description:
            'Maintain precise cash levels with automatic transfers, eliminating idle cash and overdraft risks.',
        eligibilityRules: {
            minBalance: 25000,
            transactionVolume: 200
        },
        benefitType: 'liquidity_management',
        estimatedAnnualBenefit: 4800,
        features: [
            'Automatic fund concentration',
            'Overdraft protection',
            'Simplified cash management',
            'Reduced banking fees'
        ]
    },
    {
        id: 'prod-003',
        name: 'Enhanced Merchant Services',
        type: 'merchant_services',
        description: 'Optimize payment processing with competitive rates and advanced fraud protection.',
        eligibilityRules: {
            transactionVolume: 1000,
            businessType: ['retail', 'ecommerce', 'services']
        },
        benefitType: 'fee_reduction',
        estimatedAnnualBenefit: 3600,
        features: [
            'Lower processing fees',
            'Advanced fraud protection',
            'Multi-channel payments',
            'Real-time reporting'
        ]
    },
    {
        id: 'prod-004',
        name: 'Treasury Management Platform',
        type: 'treasury_management',
        description: 'Comprehensive cash management with forecasting, reporting, and automated workflows.',
        eligibilityRules: {
            minBalance: 100000,
            transactionVolume: 500
        },
        benefitType: 'efficiency',
        estimatedAnnualBenefit: 12000,
        features: ['Cash flow forecasting', 'Automated reporting', 'Multi-bank connectivity', 'Risk management tools']
    }
];

// Mock recommendations
export const mockRecommendations: (Recommendation & { product: Product })[] = [
    {
        id: 'rec-001',
        clientId: 'client-001',
        productId: 'prod-001',
        priority: 'high',
        rationale:
            'Your average daily balance of $185,000 with frequent large deposits suggests significant opportunity for interest optimization. A sweep account could earn an additional $8,400 annually.',
        dataPoints: {
            avgDailyBalance: 185000,
            monthlyTransactionCount: 45,
            idleCashAmount: 120000
        },
        estimatedBenefit: {
            amount: 8400,
            period: 'annually',
            currency: 'USD',
            confidence: 'high'
        },
        status: 'pending',
        createdAt: '2024-10-20T10:00:00Z',
        updatedAt: '2024-10-20T10:00:00Z',
        product: mockProducts[0]
    },
    {
        id: 'rec-002',
        clientId: 'client-001',
        productId: 'prod-004',
        priority: 'high',
        rationale:
            'With complex cash flows across 3 accounts and $200+ monthly transactions, a treasury management platform would streamline operations and provide better visibility.',
        dataPoints: {
            avgDailyBalance: 185000,
            monthlyTransactionCount: 235,
            efficiencyGain: '15 hours/month saved'
        },
        estimatedBenefit: {
            amount: 12000,
            period: 'annually',
            currency: 'USD',
            confidence: 'high'
        },
        status: 'pending',
        createdAt: '2024-10-20T10:00:00Z',
        updatedAt: '2024-10-20T10:00:00Z',
        product: mockProducts[3]
    },
    {
        id: 'rec-003',
        clientId: 'client-001',
        productId: 'prod-002',
        priority: 'medium',
        rationale:
            'Zero balance accounts could optimize cash positioning across your subsidiary accounts, reducing float and improving fund utilization.',
        dataPoints: {
            avgDailyBalance: 85000,
            monthlyTransactionCount: 156,
            idleCashAmount: 45000
        },
        estimatedBenefit: {
            amount: 4800,
            period: 'annually',
            currency: 'USD',
            confidence: 'medium'
        },
        status: 'pending',
        createdAt: '2024-10-20T10:00:00Z',
        updatedAt: '2024-10-20T10:00:00Z',
        product: mockProducts[1]
    }
];

// Mock dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
    totalBalance: 285000,
    avgDailyBalance: 185000,
    monthlyInflow: 180000,
    monthlyOutflow: -38700,
    netCashFlow: 141300,
    idleCashAmount: 120000,
    transactionCount: 235,
    liquidity: {
        current: 0.85,
        trend: 'stable',
        riskLevel: 'low'
    },
    period: {
        start: '2024-09-20',
        end: '2024-10-20'
    }
};

// Mock chart data
export const mockChartData: ChartData[] = [
    { date: '2024-10-01', inflow: 45000, outflow: -12000, balance: 248000 },
    { date: '2024-10-02', inflow: 0, outflow: -3500, balance: 244500 },
    { date: '2024-10-03', inflow: 25000, outflow: -8000, balance: 261500 },
    { date: '2024-10-04', inflow: 15000, outflow: -2200, balance: 274300 },
    { date: '2024-10-05', inflow: 0, outflow: -1800, balance: 272500 },
    { date: '2024-10-06', inflow: 30000, outflow: -15000, balance: 287500 },
    { date: '2024-10-07', inflow: 12000, outflow: -4500, balance: 295000 },
    { date: '2024-10-08', inflow: 8000, outflow: -6200, balance: 296800 },
    { date: '2024-10-09', inflow: 35000, outflow: -9800, balance: 322000 },
    { date: '2024-10-10', inflow: 0, outflow: -3200, balance: 318800 },
    { date: '2024-10-11', inflow: 18000, outflow: -7500, balance: 329300 },
    { date: '2024-10-12', inflow: 42000, outflow: -12000, balance: 359300 },
    { date: '2024-10-13', inflow: 30000, outflow: -15000, balance: 374300 },
    { date: '2024-10-14', inflow: 0, outflow: -8500, balance: 365800 },
    { date: '2024-10-15', inflow: 75000, outflow: -3200, balance: 437600 },
    { date: '2024-10-16', inflow: 0, outflow: -12000, balance: 425600 },
    { date: '2024-10-17', inflow: 0, outflow: -8500, balance: 417100 },
    { date: '2024-10-18', inflow: 25000, outflow: 0, balance: 442100 },
    { date: '2024-10-19', inflow: 0, outflow: -12000, balance: 430100 },
    { date: '2024-10-20', inflow: 50000, outflow: 0, balance: 480100 }
];

// Mock bank connections
export const mockBankConnections: BankConnection[] = [
    {
        id: 'bank-001',
        bankName: 'Chase Business Banking',
        accountType: 'checking',
        connectionStatus: 'connected',
        lastSync: '2024-10-20T08:00:00Z',
        credentials: {
            username: 'techcorp_admin',
            institutionId: 'chase_business'
        }
    },
    {
        id: 'bank-002',
        bankName: 'Wells Fargo Corporate',
        accountType: 'savings',
        connectionStatus: 'pending',
        credentials: {
            username: 'techcorp_treasury',
            institutionId: 'wells_fargo_corp'
        }
    }
];

// Mock API responses
export const mockUploadResponse: UploadFileResponse = {
    uploadId: 'upload-001',
    status: 'processing',
    message: 'File uploaded successfully. Processing bank statement...'
};

export const mockParseStatusResponse: ParseStatusResponse = {
    id: 'upload-001',
    status: 'completed',
    progress: 100,
    result: {
        transactionCount: 235,
        dateRange: {
            start: '2024-09-20',
            end: '2024-10-20'
        },
        categories: ['Revenue', 'Payroll', 'Operating Expenses', 'Utilities', 'Inventory']
    }
};

export const mockDashboardResponse: DashboardResponse = {
    client: mockClient,
    metrics: mockDashboardMetrics,
    transactions: mockTransactions,
    chartData: mockChartData
};

export const mockRecommendationsResponse: RecommendationsResponse = {
    recommendations: mockRecommendations,
    totalBenefit: {
        amount: 25200,
        period: 'annually',
        currency: 'USD'
    }
};

export const mockReportData: ReportData = {
    client: mockClient,
    metrics: mockDashboardMetrics,
    recommendations: mockRecommendations,
    summary: {
        keyFindings: [
            'Significant idle cash opportunity ($120k average)',
            'Complex multi-account structure needs optimization',
            'High transaction volume suitable for automation',
            'Strong cash flow patterns indicate low liquidity risk'
        ],
        totalPotentialSavings: 25200,
        implementationPriority:
            'Recommend implementing sweep account first for immediate impact, followed by treasury management platform for operational efficiency.'
    },
    generatedAt: '2024-10-20T15:30:00Z'
};

// Core data models for Treasury Solutions Agent

export interface Client {
    id: string;
    name: string;
    accountIds: string[];
    relationshipManager: string;
    createdAt: string;
    updatedAt: string;
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    type: 'inflow' | 'outflow';
    category: string;
    description: string;
    accountId: string;
    metadata?: Record<string, unknown>;
}

export interface Product {
    id: string;
    name: string;
    type: 'sweep_account' | 'zero_balance' | 'merchant_services' | 'treasury_management';
    description: string;
    eligibilityRules: {
        minBalance?: number;
        transactionVolume?: number;
        businessType?: string[];
    };
    benefitType: 'interest_earning' | 'fee_reduction' | 'efficiency' | 'liquidity_management';
    estimatedAnnualBenefit?: number;
    features: string[];
}

export interface Recommendation {
    id: string;
    clientId: string;
    productId: string;
    priority: 'high' | 'medium' | 'low';
    rationale: string;
    dataPoints: {
        avgDailyBalance?: number;
        monthlyTransactionCount?: number;
        idleCashAmount?: number;
        efficiencyGain?: string;
    };
    estimatedBenefit: {
        amount: number;
        period: 'monthly' | 'annually';
        currency: string;
        confidence: 'high' | 'medium' | 'low';
    };
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export interface BenefitEstimate {
    productId: string;
    estimatedSavings: number;
    period: 'monthly' | 'annually';
    confidence: number;
    breakdown: {
        interestEarned?: number;
        feesReduced?: number;
        operationalSavings?: number;
    };
}

// File upload types
export interface FileUpload {
    id: string;
    file: File;
    status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
    progress: number;
    error?: string;
    result?: {
        transactionCount: number;
        dateRange: {
            start: string;
            end: string;
        };
    };
}

// Bank connection types
export interface BankConnection {
    id: string;
    bankName: string;
    accountType: string;
    connectionStatus: 'pending' | 'connected' | 'error';
    lastSync?: string;
    credentials?: {
        username: string;
        institutionId: string;
    };
}

// Dashboard metrics
export interface DashboardMetrics {
    totalBalance: number;
    avgDailyBalance: number;
    monthlyInflow: number;
    monthlyOutflow: number;
    netCashFlow: number;
    idleCashAmount: number;
    transactionCount: number;
    liquidity: {
        current: number;
        trend: 'increasing' | 'decreasing' | 'stable';
        riskLevel: 'low' | 'medium' | 'high';
    };
    period: {
        start: string;
        end: string;
    };
}

// Chart data types
export interface ChartData {
    date: string;
    inflow: number;
    outflow: number;
    balance: number;
}

// Filter types
export interface FilterState {
    dateRange: {
        start: string;
        end: string;
    };
    categories: string[];
    transactionTypes: ('inflow' | 'outflow')[];
    amountRange: {
        min: number;
        max: number;
    };
}

// API request types
export interface UploadFileRequest {
    file: File;
    clientId?: string;
}

export interface ConnectBankRequest {
    bankId?: string;
    bankName: string;
    username?: string;
    password?: string;
    institutionId: string;
    clientId?: string;
}

// API response types
export interface UploadFileResponse {
    uploadId: string;
    status: 'pending' | 'processing';
    message: string;
}

export interface ParseStatusResponse {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    progress: number;
    result?: {
        transactionCount: number;
        dateRange: {
            start: string;
            end: string;
        };
        categories: string[];
    };
    error?: string;
}

export interface DashboardResponse {
    client: Client;
    metrics: DashboardMetrics;
    transactions: Transaction[];
    chartData: ChartData[];
}

export interface RecommendationsResponse {
    recommendations: (Recommendation & { product: Product })[];
    totalBenefit: {
        amount: number;
        period: 'annually';
        currency: string;
    };
}

// Report types
export interface ReportConfig {
    clientId: string;
    includeTransactions: boolean;
    includeRecommendations: boolean;
    includeCharts: boolean;
    dateRange: {
        start: string;
        end: string;
    };
    format: 'pdf' | 'html';
}

export interface ReportData {
    client: Client;
    metrics: DashboardMetrics;
    recommendations: (Recommendation & { product: Product })[];
    summary: {
        keyFindings: string[];
        totalPotentialSavings: number;
        implementationPriority: string;
    };
    generatedAt: string;
}

// Parsing progress types
export interface ParseProgress {
    id: string;
    stage: 'upload' | 'extraction' | 'categorization' | 'analysis' | 'completed';
    progress: number;
    message: string;
    estimatedTimeRemaining?: number;
}

// Error types
export interface TreasuryError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

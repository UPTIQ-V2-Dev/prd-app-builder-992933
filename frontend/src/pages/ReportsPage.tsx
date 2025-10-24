import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
    Download,
    FileText,
    Mail,
    Settings,
    Eye,
    Building2,
    Calendar,
    BarChart3,
    Sparkles,
    CheckCircle,
    Target,
    Share,
    Printer
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { treasuryService } from '@/services/treasury';
import { useState } from 'react';

export const ReportsPage = () => {
    const [reportConfig, setReportConfig] = useState({
        includeTransactionDetails: true,
        includeChartsGraphs: true,
        includeRecommendations: true,
        includeImplementationRoadmap: true,
        includeExecutiveSummary: true,
        includeRiskAssessment: true
    });
    const [emailAddresses, setEmailAddresses] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const generateReportMutation = useMutation({
        mutationFn: async (config: typeof reportConfig) => {
            setIsGenerating(true);
            const result = await treasuryService.generateReport({
                clientId: 'demo-client',
                includeTransactions: config.includeTransactionDetails,
                includeRecommendations: config.includeRecommendations,
                includeCharts: config.includeChartsGraphs,
                dateRange: {
                    start: '2024-09-01',
                    end: '2024-10-31'
                },
                format: 'pdf' as const
            });
            // Simulate generation time
            await new Promise(resolve => setTimeout(resolve, 3000));
            setIsGenerating(false);
            return result;
        },
        onSuccess: data => {
            // Handle successful generation
            console.log('Report generated:', data);
        }
    });

    const shareReportMutation = useMutation({
        mutationFn: async (emails: string[]) => {
            return await treasuryService.shareReport('report-001', emails);
        },
        onSuccess: () => {
            console.log('Report shared successfully');
            setEmailAddresses('');
        }
    });

    const reportSummary = {
        client: 'TechCorp Solutions Inc.',
        analysisDate: 'October 24, 2024',
        period: 'September - October 2024',
        totalBenefit: '$35,000',
        recommendations: 4,
        confidenceScore: 89,
        transactionsAnalyzed: 235,
        accountsReviewed: 3,
        implementationTimeframe: '2-6 weeks'
    };

    const handleGenerateReport = () => {
        generateReportMutation.mutate(reportConfig);
    };

    const handleShareReport = () => {
        const emails = emailAddresses
            .split(',')
            .map(email => email.trim())
            .filter(email => email);
        if (emails.length > 0) {
            shareReportMutation.mutate(emails);
        }
    };

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            {/* Header */}
            <div className='mb-8'>
                <div className='flex items-center gap-3 mb-4'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full'>
                        <CheckCircle className='h-5 w-5 text-green-600' />
                        <span className='text-sm font-medium text-green-700'>Analysis Complete</span>
                    </div>
                    <Badge
                        variant='outline'
                        className='bg-blue-50 text-blue-700 border-blue-200'
                    >
                        Executive Summary Ready
                    </Badge>
                </div>
                <h1 className='text-4xl font-bold text-gray-900 mb-3'>Treasury Analysis Report</h1>
                <p className='text-xl text-gray-600 max-w-3xl'>
                    Generate comprehensive, executive-ready reports with personalized insights, detailed analysis, and
                    actionable recommendations.
                </p>
            </div>

            {/* Report Statistics */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
                <Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='text-2xl font-bold text-blue-600 mb-1'>
                                    {reportSummary.totalBenefit}
                                </div>
                                <p className='text-sm text-blue-700 font-medium'>Total Savings Potential</p>
                            </div>
                            <div className='p-3 bg-blue-100 rounded-lg'>
                                <Target className='h-6 w-6 text-blue-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='text-2xl font-bold text-green-600 mb-1'>
                                    {reportSummary.recommendations}
                                </div>
                                <p className='text-sm text-green-700 font-medium'>Solutions Identified</p>
                            </div>
                            <div className='p-3 bg-green-100 rounded-lg'>
                                <Sparkles className='h-6 w-6 text-green-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='text-2xl font-bold text-purple-600 mb-1'>
                                    {reportSummary.confidenceScore}%
                                </div>
                                <p className='text-sm text-purple-700 font-medium'>Confidence Score</p>
                            </div>
                            <div className='p-3 bg-purple-100 rounded-lg'>
                                <BarChart3 className='h-6 w-6 text-purple-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-0 shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50'>
                    <CardContent className='p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='text-2xl font-bold text-orange-600 mb-1'>
                                    {reportSummary.transactionsAnalyzed}
                                </div>
                                <p className='text-sm text-orange-700 font-medium'>Data Points Analyzed</p>
                            </div>
                            <div className='p-3 bg-orange-100 rounded-lg'>
                                <Calendar className='h-6 w-6 text-orange-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Report Preview */}
                <div className='lg:col-span-2'>
                    <Card className='mb-6 border-0 shadow-2xl'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-3 text-2xl'>
                                <div className='p-2 bg-gray-100 rounded-lg'>
                                    <Eye className='h-6 w-6 text-gray-600' />
                                </div>
                                Executive Report Preview
                            </CardTitle>
                            <CardDescription className='text-base'>
                                Professional treasury analysis report with comprehensive insights and recommendations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='border rounded-xl p-8 bg-white shadow-lg'>
                                {/* Report Header */}
                                <div className='border-b pb-6 mb-8'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <div className='p-3 bg-blue-100 rounded-xl'>
                                                <Building2 className='h-8 w-8 text-blue-600' />
                                            </div>
                                            <div>
                                                <h2 className='text-2xl font-bold text-gray-900'>
                                                    Treasury Solutions Analysis
                                                </h2>
                                                <p className='text-lg text-gray-600 mt-1'>{reportSummary.client}</p>
                                                <div className='flex items-center gap-4 mt-2'>
                                                    <Badge className='bg-blue-50 text-blue-700 border-blue-200'>
                                                        Confidential
                                                    </Badge>
                                                    <Badge className='bg-green-50 text-green-700 border-green-200'>
                                                        AI-Generated
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <div className='p-4 bg-gray-50 rounded-lg'>
                                                <p className='text-sm font-medium text-gray-700 mb-1'>
                                                    Analysis Period
                                                </p>
                                                <p className='text-lg font-semibold text-gray-900'>
                                                    {reportSummary.period}
                                                </p>
                                                <p className='text-xs text-gray-500 mt-2'>
                                                    Generated: {reportSummary.analysisDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Executive Summary */}
                                <div className='mb-8'>
                                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>Executive Summary</h3>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                                        <div className='text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200'>
                                            <div className='text-3xl font-bold text-green-600 mb-2'>
                                                {reportSummary.totalBenefit}
                                            </div>
                                            <div className='text-sm font-medium text-green-700'>Annual Savings</div>
                                        </div>
                                        <div className='text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200'>
                                            <div className='text-3xl font-bold text-blue-600 mb-2'>
                                                {reportSummary.recommendations}
                                            </div>
                                            <div className='text-sm font-medium text-blue-700'>Solutions</div>
                                        </div>
                                        <div className='text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200'>
                                            <div className='text-3xl font-bold text-purple-600 mb-2'>
                                                {reportSummary.confidenceScore}%
                                            </div>
                                            <div className='text-sm font-medium text-purple-700'>Confidence</div>
                                        </div>
                                    </div>
                                    <p className='text-gray-700 leading-relaxed text-base'>
                                        Our comprehensive AI-powered analysis identifies significant optimization
                                        opportunities with {reportSummary.confidenceScore}% confidence. Implementing
                                        recommended solutions could yield annual savings of{' '}
                                        <span className='font-semibold text-green-600'>
                                            {reportSummary.totalBenefit}
                                        </span>
                                        while improving operational efficiency.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Actions */}
                <div>
                    <Card className='mb-6 border-0 shadow-xl'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-3'>
                                <div className='p-2 bg-blue-100 rounded-lg'>
                                    <Download className='h-5 w-5 text-blue-600' />
                                </div>
                                Generate Report
                            </CardTitle>
                            <CardDescription>Create professional treasury analysis report</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {isGenerating && (
                                    <div className='mb-4'>
                                        <Progress
                                            value={66}
                                            className='mb-2'
                                        />
                                        <p className='text-sm text-gray-600'>Generating comprehensive report...</p>
                                    </div>
                                )}

                                <Button
                                    className='w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                    onClick={handleGenerateReport}
                                    disabled={isGenerating}
                                >
                                    <Download className='h-4 w-4' />
                                    {isGenerating ? 'Generating...' : 'Download PDF Report'}
                                </Button>

                                <Button
                                    variant='outline'
                                    className='w-full gap-2'
                                >
                                    <FileText className='h-4 w-4' />
                                    Export to Excel
                                </Button>

                                <Button
                                    variant='outline'
                                    className='w-full gap-2'
                                >
                                    <Printer className='h-4 w-4' />
                                    Print Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='mb-6 border-0 shadow-xl'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-3'>
                                <div className='p-2 bg-green-100 rounded-lg'>
                                    <Share className='h-5 w-5 text-green-600' />
                                </div>
                                Share Report
                            </CardTitle>
                            <CardDescription>Send to stakeholders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <Input
                                    placeholder='Enter email addresses (comma-separated)'
                                    value={emailAddresses}
                                    onChange={e => setEmailAddresses(e.target.value)}
                                />
                                <Button
                                    onClick={handleShareReport}
                                    disabled={!emailAddresses.trim() || shareReportMutation.isPending}
                                    className='w-full gap-2'
                                >
                                    <Mail className='h-4 w-4' />
                                    {shareReportMutation.isPending ? 'Sending...' : 'Email Report'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-0 shadow-xl'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-3'>
                                <div className='p-2 bg-purple-100 rounded-lg'>
                                    <Settings className='h-5 w-5 text-purple-600' />
                                </div>
                                Report Settings
                            </CardTitle>
                            <CardDescription>Customize report content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {Object.entries(reportConfig).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className='flex items-center space-x-2'
                                    >
                                        <Checkbox
                                            id={key}
                                            checked={value}
                                            onCheckedChange={checked =>
                                                setReportConfig(prev => ({ ...prev, [key]: checked as boolean }))
                                            }
                                        />
                                        <label
                                            htmlFor={key}
                                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

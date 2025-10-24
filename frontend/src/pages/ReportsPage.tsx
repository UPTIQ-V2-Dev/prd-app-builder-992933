import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Mail, Settings, Eye, Building2 } from 'lucide-react';

export const ReportsPage = () => {
    const reportSummary = {
        client: 'TechCorp Solutions Inc.',
        analysisDate: 'October 20, 2024',
        period: 'September - October 2024',
        totalBenefit: '$25,200',
        recommendations: 3
    };

    return (
        <div className='max-w-6xl mx-auto px-6 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Treasury Analysis Report</h1>
                <p className='text-lg text-gray-600'>Generate and share comprehensive treasury analysis reports</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Report Preview */}
                <div className='lg:col-span-2'>
                    <Card className='mb-6'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Eye className='h-5 w-5' />
                                Report Preview
                            </CardTitle>
                            <CardDescription>Executive summary of treasury analysis findings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='border rounded-lg p-6 bg-white shadow-sm'>
                                {/* Report Header */}
                                <div className='border-b pb-4 mb-6'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <Building2 className='h-8 w-8 text-blue-600' />
                                            <div>
                                                <h2 className='text-xl font-bold'>Treasury Solutions Analysis</h2>
                                                <p className='text-gray-600'>{reportSummary.client}</p>
                                            </div>
                                        </div>
                                        <div className='text-right text-sm text-gray-500'>
                                            <p>Analysis Period: {reportSummary.period}</p>
                                            <p>Generated: {reportSummary.analysisDate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Executive Summary */}
                                <div className='mb-6'>
                                    <h3 className='text-lg font-semibold mb-3'>Executive Summary</h3>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                                        <div className='text-center p-3 bg-green-50 rounded-lg'>
                                            <div className='text-2xl font-bold text-green-600'>
                                                {reportSummary.totalBenefit}
                                            </div>
                                            <div className='text-sm text-green-700'>Annual Savings Potential</div>
                                        </div>
                                        <div className='text-center p-3 bg-blue-50 rounded-lg'>
                                            <div className='text-2xl font-bold text-blue-600'>
                                                {reportSummary.recommendations}
                                            </div>
                                            <div className='text-sm text-blue-700'>Treasury Solutions</div>
                                        </div>
                                        <div className='text-center p-3 bg-purple-50 rounded-lg'>
                                            <div className='text-2xl font-bold text-purple-600'>235</div>
                                            <div className='text-sm text-purple-700'>Transactions Analyzed</div>
                                        </div>
                                    </div>
                                    <p className='text-gray-700 leading-relaxed'>
                                        Our comprehensive analysis of TechCorp Solutions' treasury operations identifies
                                        significant optimization opportunities. With an average daily balance of
                                        $285,000 and complex multi-account structure, implementing recommended treasury
                                        solutions could yield annual savings of $25,200 while improving operational
                                        efficiency.
                                    </p>
                                </div>

                                {/* Key Findings */}
                                <div className='mb-6'>
                                    <h3 className='text-lg font-semibold mb-3'>Key Findings</h3>
                                    <ul className='space-y-2 text-gray-700'>
                                        <li className='flex items-start gap-2'>
                                            <div className='w-2 h-2 bg-yellow-500 rounded-full mt-2'></div>
                                            <span>
                                                Significant idle cash opportunity identified ($120k average daily
                                                balance)
                                            </span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
                                            <span>
                                                Complex multi-account structure suitable for treasury automation
                                            </span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
                                            <span>Strong cash flow patterns indicate low liquidity risk profile</span>
                                        </li>
                                        <li className='flex items-start gap-2'>
                                            <div className='w-2 h-2 bg-purple-500 rounded-full mt-2'></div>
                                            <span>
                                                High transaction volume (235/month) enables premium product eligibility
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Recommendations Summary */}
                                <div>
                                    <h3 className='text-lg font-semibold mb-3'>Recommended Solutions</h3>
                                    <div className='space-y-3'>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <div>
                                                <p className='font-medium'>Corporate Sweep Account</p>
                                                <p className='text-sm text-gray-600'>
                                                    Optimize idle cash for interest earnings
                                                </p>
                                            </div>
                                            <Badge className='bg-red-100 text-red-800'>High Priority</Badge>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <div>
                                                <p className='font-medium'>Treasury Management Platform</p>
                                                <p className='text-sm text-gray-600'>
                                                    Streamline multi-account operations
                                                </p>
                                            </div>
                                            <Badge className='bg-red-100 text-red-800'>High Priority</Badge>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <div>
                                                <p className='font-medium'>Zero Balance Account</p>
                                                <p className='text-sm text-gray-600'>Enhance cash positioning</p>
                                            </div>
                                            <Badge className='bg-yellow-100 text-yellow-800'>Medium Priority</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Actions */}
                <div>
                    <Card className='mb-6'>
                        <CardHeader>
                            <CardTitle>Generate Report</CardTitle>
                            <CardDescription>Create and download your treasury analysis</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <Button className='w-full gap-2'>
                                    <Download className='h-4 w-4' />
                                    Download PDF Report
                                </Button>
                                <Button
                                    variant='outline'
                                    className='w-full gap-2'
                                >
                                    <FileText className='h-4 w-4' />
                                    Export to Excel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='mb-6'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Mail className='h-4 w-4' />
                                Share Report
                            </CardTitle>
                            <CardDescription>Send report to stakeholders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-3'>
                                <div className='p-3 bg-gray-50 rounded-lg'>
                                    <p className='font-medium text-sm'>Client Team</p>
                                    <p className='text-xs text-gray-600'>CFO, Treasury Manager</p>
                                </div>
                                <div className='p-3 bg-gray-50 rounded-lg'>
                                    <p className='font-medium text-sm'>Relationship Manager</p>
                                    <p className='text-xs text-gray-600'>Sarah Johnson</p>
                                </div>
                                <Button
                                    variant='outline'
                                    className='w-full gap-2'
                                >
                                    <Mail className='h-4 w-4' />
                                    Email Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <Settings className='h-4 w-4' />
                                Report Settings
                            </CardTitle>
                            <CardDescription>Customize report content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-3'>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        defaultChecked
                                        className='rounded'
                                    />
                                    <span className='text-sm'>Include transaction details</span>
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        defaultChecked
                                        className='rounded'
                                    />
                                    <span className='text-sm'>Include charts and graphs</span>
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        defaultChecked
                                        className='rounded'
                                    />
                                    <span className='text-sm'>Include recommendations</span>
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        defaultChecked
                                        className='rounded'
                                    />
                                    <span className='text-sm'>Include implementation roadmap</span>
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

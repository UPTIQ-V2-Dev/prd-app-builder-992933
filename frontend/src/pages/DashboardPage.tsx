import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, DollarSign, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Treasury Analysis Dashboard</h1>
                <p className='text-lg text-gray-600'>Review your financial insights and cash flow patterns</p>
            </div>

            {/* Key Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Total Balance</CardTitle>
                        <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>$285,000</div>
                        <p className='text-xs text-muted-foreground'>+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Monthly Inflow</CardTitle>
                        <TrendingUp className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>$180,000</div>
                        <p className='text-xs text-muted-foreground'>+8% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Idle Cash</CardTitle>
                        <Activity className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>$120,000</div>
                        <p className='text-xs text-muted-foreground'>Optimization opportunity</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Transactions</CardTitle>
                        <Zap className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>235</div>
                        <p className='text-xs text-muted-foreground'>This month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder for charts and detailed analysis */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                <Card>
                    <CardHeader>
                        <CardTitle>Cash Flow Trend</CardTitle>
                        <CardDescription>30-day cash flow analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='h-64 flex items-center justify-center bg-gray-50 rounded-lg'>
                            <p className='text-gray-500'>Chart visualization coming soon</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Categories</CardTitle>
                        <CardDescription>Breakdown by transaction type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='h-64 flex items-center justify-center bg-gray-50 rounded-lg'>
                            <p className='text-gray-500'>Category breakdown coming soon</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Key Insights */}
            <Card className='mb-8'>
                <CardHeader>
                    <CardTitle>Key Financial Insights</CardTitle>
                    <CardDescription>Automated analysis of your treasury data</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                            <h4 className='font-medium text-yellow-800 mb-2'>🔍 Idle Cash Opportunity</h4>
                            <p className='text-yellow-700 text-sm'>
                                Your account maintains an average of $120,000 in idle cash. This represents a
                                significant opportunity for interest optimization through sweep accounts.
                            </p>
                        </div>

                        <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                            <h4 className='font-medium text-blue-800 mb-2'>📊 Transaction Volume Analysis</h4>
                            <p className='text-blue-700 text-sm'>
                                With 235+ monthly transactions across multiple accounts, your business would benefit
                                from automated treasury management tools to streamline operations.
                            </p>
                        </div>

                        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
                            <h4 className='font-medium text-green-800 mb-2'>💡 Liquidity Health</h4>
                            <p className='text-green-700 text-sm'>
                                Strong positive cash flow trends indicate excellent liquidity health with low risk
                                profile, making you eligible for premium treasury products.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Button */}
            <div className='flex justify-end'>
                <Button
                    onClick={() => navigate('/recommendations')}
                    className='gap-2'
                >
                    View Treasury Recommendations
                    <ArrowRight className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
};

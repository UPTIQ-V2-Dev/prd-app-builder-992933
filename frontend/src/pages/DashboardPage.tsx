import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    ArrowRight,
    TrendingUp,
    DollarSign,
    Activity,
    Calendar,
    Filter,
    ArrowUpRight,
    Target,
    AlertTriangle,
    CheckCircle,
    Sparkles,
    FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Area,
    AreaChart
} from 'recharts';

export const DashboardPage = () => {
    const navigate = useNavigate();

    // Mock chart data
    const cashFlowData = [
        { date: '2024-09-01', inflow: 45000, outflow: 32000, balance: 285000 },
        { date: '2024-09-08', inflow: 52000, outflow: 38000, balance: 299000 },
        { date: '2024-09-15', inflow: 48000, outflow: 35000, balance: 312000 },
        { date: '2024-09-22', inflow: 55000, outflow: 42000, balance: 325000 },
        { date: '2024-09-29', inflow: 58000, outflow: 40000, balance: 343000 },
        { date: '2024-10-06', inflow: 62000, outflow: 45000, balance: 360000 },
        { date: '2024-10-13', inflow: 59000, outflow: 41000, balance: 378000 },
        { date: '2024-10-20', inflow: 64000, outflow: 48000, balance: 394000 }
    ];

    const categoryData = [
        { category: 'Operations', amount: 125000, color: '#3B82F6', percentage: 45 },
        { category: 'Payroll', amount: 89000, color: '#10B981', percentage: 32 },
        { category: 'Marketing', amount: 34000, color: '#F59E0B', percentage: 12 },
        { category: 'Equipment', amount: 23000, color: '#EF4444', percentage: 8 },
        { category: 'Other', amount: 8000, color: '#8B5CF6', percentage: 3 }
    ];

    const liquidityData = [
        { month: 'Sep', optimal: 180000, actual: 285000 },
        { month: 'Oct', optimal: 190000, actual: 394000 },
        { month: 'Nov', optimal: 185000, actual: 420000 },
        { month: 'Dec', optimal: 200000, actual: 450000 }
    ];

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            {/* Header */}
            <div className='mb-8'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1 rounded-full'>
                                <CheckCircle className='h-4 w-4 text-green-600' />
                                <span className='text-sm font-medium text-green-700'>Analysis Complete</span>
                            </div>
                            <Badge
                                variant='outline'
                                className='bg-blue-50 text-blue-700'
                            >
                                Live Data
                            </Badge>
                        </div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Treasury Dashboard</h1>
                        <p className='text-lg text-gray-600'>AI-powered insights and cash flow analytics</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Button
                            variant='outline'
                            className='gap-2'
                        >
                            <Calendar className='h-4 w-4' />
                            Last 30 days
                        </Button>
                        <Button
                            variant='outline'
                            className='gap-2'
                        >
                            <Filter className='h-4 w-4' />
                            Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <Card className='relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 via-white to-blue-50/50'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium text-blue-900'>Total Balance</CardTitle>
                        <div className='p-2 bg-blue-100 rounded-lg'>
                            <DollarSign className='h-4 w-4 text-blue-600' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-gray-900'>$394,000</div>
                        <div className='flex items-center gap-1 mt-1'>
                            <ArrowUpRight className='h-3 w-3 text-green-600' />
                            <p className='text-xs text-green-600 font-medium'>+12% from last month</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className='relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 via-white to-green-50/50'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium text-green-900'>Monthly Inflow</CardTitle>
                        <div className='p-2 bg-green-100 rounded-lg'>
                            <TrendingUp className='h-4 w-4 text-green-600' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-gray-900'>$180,000</div>
                        <div className='flex items-center gap-1 mt-1'>
                            <ArrowUpRight className='h-3 w-3 text-green-600' />
                            <p className='text-xs text-green-600 font-medium'>+8% from last month</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className='relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-yellow-50 via-white to-yellow-50/50'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium text-yellow-900'>Idle Cash</CardTitle>
                        <div className='p-2 bg-yellow-100 rounded-lg'>
                            <Target className='h-4 w-4 text-yellow-600' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-gray-900'>$120,000</div>
                        <div className='flex items-center gap-1 mt-1'>
                            <AlertTriangle className='h-3 w-3 text-yellow-600' />
                            <p className='text-xs text-yellow-600 font-medium'>Optimization opportunity</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className='relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 via-white to-purple-50/50'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium text-purple-900'>Transactions</CardTitle>
                        <div className='p-2 bg-purple-100 rounded-lg'>
                            <Activity className='h-4 w-4 text-purple-600' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-gray-900'>235</div>
                        <div className='flex items-center gap-1 mt-1'>
                            <div className='w-3 h-3 rounded-full bg-purple-200 flex items-center justify-center'>
                                <div className='w-1.5 h-1.5 rounded-full bg-purple-600'></div>
                            </div>
                            <p className='text-xs text-purple-600 font-medium'>This month</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                {/* Cash Flow Trend */}
                <Card className='border-0 shadow-xl'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <TrendingUp className='h-5 w-5 text-blue-600' />
                            Cash Flow Trend
                        </CardTitle>
                        <CardDescription>Balance progression over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer
                            width='100%'
                            height={300}
                        >
                            <AreaChart data={cashFlowData}>
                                <defs>
                                    <linearGradient
                                        id='balanceGradient'
                                        x1='0'
                                        y1='0'
                                        x2='0'
                                        y2='1'
                                    >
                                        <stop
                                            offset='5%'
                                            stopColor='#3B82F6'
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset='95%'
                                            stopColor='#3B82F6'
                                            stopOpacity={0.05}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray='3 3'
                                    stroke='#E5E7EB'
                                />
                                <XAxis
                                    dataKey='date'
                                    stroke='#6B7280'
                                    fontSize={12}
                                    tickFormatter={value =>
                                        new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                    }
                                />
                                <YAxis
                                    stroke='#6B7280'
                                    fontSize={12}
                                    tickFormatter={value => `$${(value / 1000).toFixed(0)}K`}
                                />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className='bg-white p-4 border border-gray-200 rounded-lg shadow-lg'>
                                                    <p className='font-medium text-gray-900 mb-2'>
                                                        {new Date(label || '').toLocaleDateString()}
                                                    </p>
                                                    <div className='space-y-1'>
                                                        <p className='text-sm text-blue-600'>
                                                            Balance: ${payload[0].value?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type='monotone'
                                    dataKey='balance'
                                    stroke='#3B82F6'
                                    strokeWidth={3}
                                    fill='url(#balanceGradient)'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Transaction Categories */}
                <Card className='border-0 shadow-xl'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Activity className='h-5 w-5 text-green-600' />
                            Expense Breakdown
                        </CardTitle>
                        <CardDescription>Monthly spending by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col lg:flex-row items-center gap-6'>
                            <div className='flex-shrink-0'>
                                <ResponsiveContainer
                                    width={200}
                                    height={200}
                                >
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx={100}
                                            cy={100}
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={2}
                                            dataKey='amount'
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className='bg-white p-3 border border-gray-200 rounded-lg shadow-lg'>
                                                            <p className='font-medium text-gray-900'>{data.category}</p>
                                                            <p className='text-sm text-gray-600'>
                                                                ${data.amount.toLocaleString()}
                                                            </p>
                                                            <p className='text-sm text-gray-500'>{data.percentage}%</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className='flex-1 space-y-3'>
                                {categoryData.map((category, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className='w-3 h-3 rounded-full'
                                                style={{ backgroundColor: category.color }}
                                            ></div>
                                            <span className='font-medium text-gray-900'>{category.category}</span>
                                        </div>
                                        <div className='text-right'>
                                            <div className='font-semibold text-gray-900'>
                                                ${category.amount.toLocaleString()}
                                            </div>
                                            <div className='text-sm text-gray-500'>{category.percentage}%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Liquidity Analysis */}
            <Card className='mb-8 border-0 shadow-xl'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Target className='h-5 w-5 text-purple-600' />
                        Liquidity Optimization
                    </CardTitle>
                    <CardDescription>Actual vs. optimal cash levels</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer
                        width='100%'
                        height={300}
                    >
                        <BarChart
                            data={liquidityData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray='3 3'
                                stroke='#E5E7EB'
                            />
                            <XAxis
                                dataKey='month'
                                stroke='#6B7280'
                                fontSize={12}
                            />
                            <YAxis
                                stroke='#6B7280'
                                fontSize={12}
                                tickFormatter={value => `$${(value / 1000).toFixed(0)}K`}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className='bg-white p-4 border border-gray-200 rounded-lg shadow-lg'>
                                                <p className='font-medium text-gray-900 mb-2'>{label} 2024</p>
                                                <div className='space-y-1'>
                                                    <p className='text-sm text-purple-600'>
                                                        Optimal: ${payload[0].value?.toLocaleString()}
                                                    </p>
                                                    <p className='text-sm text-blue-600'>
                                                        Actual: ${payload[1].value?.toLocaleString()}
                                                    </p>
                                                    <p className='text-sm text-green-600 font-medium'>
                                                        Excess: $
                                                        {(
                                                            (payload[1].value || 0) - (payload[0].value || 0)
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey='optimal'
                                fill='#8B5CF6'
                                name='Optimal Level'
                            />
                            <Bar
                                dataKey='actual'
                                fill='#3B82F6'
                                name='Actual Balance'
                            />
                        </BarChart>
                    </ResponsiveContainer>

                    <div className='mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200'>
                        <h4 className='font-medium text-yellow-800 mb-2 flex items-center gap-2'>
                            <AlertTriangle className='h-4 w-4' />
                            Optimization Opportunity
                        </h4>
                        <p className='text-yellow-700 text-sm'>
                            You're maintaining $200K+ above optimal levels. Consider high-yield investments or sweep
                            accounts to maximize returns.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className='mb-8 border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Sparkles className='h-5 w-5 text-indigo-600' />
                        AI-Powered Insights
                    </CardTitle>
                    <CardDescription>Intelligent analysis of your treasury performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='p-5 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2 bg-yellow-100 rounded-lg flex-shrink-0'>
                                    <Target className='h-5 w-5 text-yellow-600' />
                                </div>
                                <div>
                                    <h4 className='font-semibold text-yellow-800 mb-2'>Idle Cash Opportunity</h4>
                                    <p className='text-yellow-700 text-sm leading-relaxed'>
                                        $120K idle cash identified. Potential annual earnings increase of
                                        <span className='font-semibold text-yellow-800'> $4,800+</span> with
                                        optimization.
                                    </p>
                                    <div className='mt-3'>
                                        <Progress
                                            value={75}
                                            className='h-2'
                                        />
                                        <p className='text-xs text-yellow-600 mt-1'>High priority optimization</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2 bg-blue-100 rounded-lg flex-shrink-0'>
                                    <Activity className='h-5 w-5 text-blue-600' />
                                </div>
                                <div>
                                    <h4 className='font-semibold text-blue-800 mb-2'>Transaction Efficiency</h4>
                                    <p className='text-blue-700 text-sm leading-relaxed'>
                                        235+ monthly transactions suggest automation benefits. Estimated
                                        <span className='font-semibold text-blue-800'> 15 hours</span> monthly savings.
                                    </p>
                                    <div className='mt-3'>
                                        <Progress
                                            value={60}
                                            className='h-2'
                                        />
                                        <p className='text-xs text-blue-600 mt-1'>Medium priority optimization</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2 bg-green-100 rounded-lg flex-shrink-0'>
                                    <CheckCircle className='h-5 w-5 text-green-600' />
                                </div>
                                <div>
                                    <h4 className='font-semibold text-green-800 mb-2'>Liquidity Health</h4>
                                    <p className='text-green-700 text-sm leading-relaxed'>
                                        Excellent cash flow stability qualifies for
                                        <span className='font-semibold text-green-800'> premium products</span> with
                                        better rates.
                                    </p>
                                    <div className='mt-3'>
                                        <Progress
                                            value={95}
                                            className='h-2'
                                        />
                                        <p className='text-xs text-green-600 mt-1'>Strong financial health</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Section */}
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200'>
                <div className='text-left'>
                    <h3 className='font-semibold text-gray-900 mb-1'>Ready for Treasury Optimization?</h3>
                    <p className='text-gray-600'>
                        Discover personalized product recommendations to maximize your returns
                    </p>
                </div>
                <div className='flex gap-3'>
                    <Button
                        variant='outline'
                        onClick={() => navigate('/reports')}
                        className='gap-2 hover:bg-white'
                    >
                        <FileText className='h-4 w-4' />
                        Generate Report
                    </Button>
                    <Button
                        onClick={() => navigate('/recommendations')}
                        className='gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200'
                    >
                        View Recommendations
                        <ArrowRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

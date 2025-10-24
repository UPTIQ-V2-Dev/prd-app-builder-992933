import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Star,
    TrendingUp,
    Zap,
    DollarSign,
    Target,
    CheckCircle,
    Clock,
    AlertTriangle,
    Sparkles,
    Users,
    Calculator,
    BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const RecommendationsPage = () => {
    const navigate = useNavigate();
    const [selectedRec, setSelectedRec] = useState<number | null>(null);

    const recommendations = [
        {
            id: 1,
            title: 'Corporate Sweep Account',
            priority: 'high',
            icon: DollarSign,
            category: 'Cash Management',
            description:
                'Automatically sweep excess funds to high-yield savings, maximizing interest earnings while maintaining liquidity.',
            annualBenefit: '$8,400',
            monthlyBenefit: '$700',
            confidence: 95,
            implementationTime: '2-3 weeks',
            complexity: 'Low',
            rationale:
                'Your average daily balance of $394,000 with $120K+ idle cash presents immediate optimization opportunity.',
            keyPoints: [
                'Automatic overnight sweeping to maximize interest',
                'Competitive rates up to 4.75% APY on swept funds',
                'Instant liquidity access during business hours',
                'Real-time balance monitoring and alerts',
                'No minimum balance requirements'
            ],
            dataPoints: {
                currentIdleCash: '$120,000',
                potentialRate: '4.75% APY',
                currentRate: '0.01% APY',
                monthlyEarnings: '$475',
                paybackPeriod: 'Immediate'
            },
            requirements: [
                'Minimum $50,000 average balance',
                'Active business checking account',
                'Treasury management agreement'
            ],
            risks: ['Interest rate volatility', 'Potential sweep delays during system maintenance']
        },
        {
            id: 2,
            title: 'Treasury Management Platform',
            priority: 'high',
            icon: BarChart3,
            category: 'Operations',
            description:
                'Comprehensive cash management with AI-powered forecasting, reporting, and automated workflows.',
            annualBenefit: '$15,600',
            monthlyBenefit: '$1,300',
            confidence: 88,
            implementationTime: '4-6 weeks',
            complexity: 'Medium',
            rationale:
                'With 235+ monthly transactions across multiple accounts, automation would deliver significant time savings and accuracy improvements.',
            keyPoints: [
                'AI-powered cash flow forecasting (95% accuracy)',
                'Automated daily reporting and reconciliation',
                'Multi-bank connectivity and aggregation',
                'Advanced risk management and alerts',
                'Mobile and web-based dashboard access'
            ],
            dataPoints: {
                timeSavings: '18 hours/month',
                currentTransactions: '235/month',
                forecastAccuracy: '95%',
                reportingAutomation: '80%',
                errorReduction: '65%'
            },
            requirements: [
                'Treasury management agreement',
                'Multi-factor authentication setup',
                'Staff training (included)'
            ],
            risks: ['Initial learning curve for staff', 'System integration complexity']
        },
        {
            id: 3,
            title: 'Premium Money Market Account',
            priority: 'medium',
            icon: TrendingUp,
            category: 'Investment',
            description: 'High-yield money market account with tiered interest rates and investment-grade liquidity.',
            annualBenefit: '$4,200',
            monthlyBenefit: '$350',
            confidence: 82,
            implementationTime: '1-2 weeks',
            complexity: 'Low',
            rationale:
                'Your strong cash flow patterns qualify you for premium rates while maintaining operational flexibility.',
            keyPoints: [
                'Tiered interest rates up to 4.25% APY',
                'FDIC insured up to $250,000 per account',
                'Check writing and debit card access',
                'No monthly maintenance fees',
                'Online and mobile banking integration'
            ],
            dataPoints: {
                tierThreshold: '$100,000',
                premiumRate: '4.25% APY',
                standardRate: '3.75% APY',
                avgBalance: '$394,000',
                qualificationScore: '95%'
            },
            requirements: ['Minimum $25,000 opening deposit', 'Business documentation', 'Credit approval'],
            risks: ['Rate changes based on market conditions', 'FDIC insurance limits per account']
        },
        {
            id: 4,
            title: 'Automated ACH Solutions',
            priority: 'medium',
            icon: Zap,
            category: 'Payments',
            description: 'Streamline receivables and payables with automated ACH processing and batch payments.',
            annualBenefit: '$6,800',
            monthlyBenefit: '$567',
            confidence: 79,
            implementationTime: '3-4 weeks',
            complexity: 'Medium',
            rationale:
                'Significant check volume and manual processing create opportunities for automation and cost reduction.',
            keyPoints: [
                'Automated receivables collection',
                'Batch payment processing',
                'Same-day ACH capabilities',
                'Exception handling and reporting',
                'Integration with accounting systems'
            ],
            dataPoints: {
                checkVolume: '45/month',
                processingCosts: '$3.50/check',
                achCosts: '$0.75/transaction',
                timeSavings: '8 hours/month',
                errorReduction: '40%'
            },
            requirements: ['ACH origination agreement', 'Customer authorization collection', 'Fraud prevention setup'],
            risks: ['ACH return fees', 'Customer resistance to change']
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-gradient-to-r from-red-50 to-orange-50 text-red-800 border-red-200';
            case 'medium':
                return 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getComplexityColor = (complexity: string) => {
        switch (complexity) {
            case 'Low':
                return 'text-green-600 bg-green-50';
            case 'Medium':
                return 'text-yellow-600 bg-yellow-50';
            case 'High':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const totalBenefit = recommendations.reduce(
        (sum, rec) => sum + parseInt(rec.annualBenefit.replace('$', '').replace(',', '')),
        0
    );

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            {/* Header */}
            <div className='mb-8'>
                <div className='flex items-center gap-3 mb-4'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full'>
                        <Sparkles className='h-5 w-5 text-blue-600' />
                        <span className='text-sm font-medium text-blue-700'>AI-Curated Recommendations</span>
                    </div>
                    <Badge
                        variant='outline'
                        className='bg-green-50 text-green-700 border-green-200'
                    >
                        {recommendations.length} Solutions Available
                    </Badge>
                </div>
                <h1 className='text-4xl font-bold text-gray-900 mb-3'>Treasury Recommendations</h1>
                <p className='text-xl text-gray-600 max-w-3xl'>
                    Personalized financial solutions designed to optimize your cash management and maximize returns
                    based on your unique transaction patterns.
                </p>
            </div>

            {/* Summary Dashboard */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
                <Card className='md:col-span-2 border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-3 text-2xl'>
                            <div className='p-2 bg-blue-100 rounded-lg'>
                                <Target className='h-6 w-6 text-blue-600' />
                            </div>
                            Optimization Potential
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div>
                                <div className='text-4xl font-bold text-blue-600 mb-1'>
                                    ${totalBenefit.toLocaleString()}
                                </div>
                                <p className='text-blue-700 font-medium'>Total Annual Savings Potential</p>
                            </div>
                            <div className='grid grid-cols-2 gap-4 pt-2'>
                                <div>
                                    <div className='text-lg font-semibold text-green-600'>
                                        ${(totalBenefit / 12).toLocaleString()}
                                    </div>
                                    <p className='text-sm text-gray-600'>Monthly Impact</p>
                                </div>
                                <div>
                                    <div className='text-lg font-semibold text-purple-600'>89%</div>
                                    <p className='text-sm text-gray-600'>Avg. Confidence</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50'>
                    <CardContent className='p-6'>
                        <div className='text-center'>
                            <div className='inline-flex p-3 bg-green-100 rounded-full mb-3'>
                                <CheckCircle className='h-6 w-6 text-green-600' />
                            </div>
                            <div className='text-2xl font-bold text-green-600 mb-1'>
                                {recommendations.filter(r => r.priority === 'high').length}
                            </div>
                            <p className='text-sm font-medium text-green-700'>High Priority</p>
                            <p className='text-xs text-green-600 mt-1'>Ready to implement</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-0 shadow-xl bg-gradient-to-br from-orange-50 to-yellow-50'>
                    <CardContent className='p-6'>
                        <div className='text-center'>
                            <div className='inline-flex p-3 bg-orange-100 rounded-full mb-3'>
                                <Clock className='h-6 w-6 text-orange-600' />
                            </div>
                            <div className='text-2xl font-bold text-orange-600 mb-1'>2-6</div>
                            <p className='text-sm font-medium text-orange-700'>Weeks</p>
                            <p className='text-xs text-orange-600 mt-1'>Implementation time</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recommendations */}
            <div className='space-y-8 mb-12'>
                {recommendations.map((rec, index) => (
                    <Card
                        key={rec.id}
                        className={`border-0 shadow-2xl transition-all duration-200 hover:shadow-3xl ${
                            selectedRec === rec.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedRec(selectedRec === rec.id ? null : rec.id)}
                    >
                        <CardHeader className='pb-4'>
                            <div className='flex items-start justify-between'>
                                <div className='flex items-start gap-4 flex-1'>
                                    <div className='relative'>
                                        <div
                                            className={`p-3 rounded-xl bg-gradient-to-br ${
                                                rec.priority === 'high'
                                                    ? 'from-blue-100 to-indigo-100'
                                                    : 'from-gray-100 to-gray-200'
                                            }`}
                                        >
                                            <rec.icon
                                                className={`h-7 w-7 ${
                                                    rec.priority === 'high' ? 'text-blue-600' : 'text-gray-600'
                                                }`}
                                            />
                                        </div>
                                        {rec.priority === 'high' && (
                                            <div className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white'></div>
                                        )}
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-3 mb-2'>
                                            <CardTitle className='text-2xl text-gray-900'>{rec.title}</CardTitle>
                                            <Badge
                                                variant='outline'
                                                className='bg-blue-50 text-blue-700 text-xs'
                                            >
                                                {rec.category}
                                            </Badge>
                                        </div>
                                        <CardDescription className='text-base leading-relaxed mb-3'>
                                            {rec.description}
                                        </CardDescription>
                                        <div className='flex items-center gap-4'>
                                            <Badge
                                                className={`${getPriorityColor(rec.priority)} px-3 py-1 font-medium`}
                                            >
                                                {rec.priority.toUpperCase()} PRIORITY
                                            </Badge>
                                            <Badge className={`${getComplexityColor(rec.complexity)} px-3 py-1`}>
                                                {rec.complexity} Complexity
                                            </Badge>
                                            <div className='flex items-center gap-1 text-sm text-gray-600'>
                                                <Clock className='h-3 w-3' />
                                                {rec.implementationTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right ml-4'>
                                    <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200'>
                                        <div className='text-2xl font-bold text-green-600 mb-1'>
                                            {rec.annualBenefit}
                                        </div>
                                        <div className='text-sm text-green-700 font-medium'>Annual Savings</div>
                                        <div className='text-xs text-green-600 mt-1'>{rec.monthlyBenefit}/month</div>
                                    </div>
                                    <div className='mt-3 flex items-center gap-1 justify-end'>
                                        <div className='flex items-center gap-1'>
                                            <Progress
                                                value={rec.confidence}
                                                className='w-16 h-2'
                                            />
                                            <span className='text-sm font-medium text-gray-600'>{rec.confidence}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className='pt-2'>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
                                <div>
                                    <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                                        <Target className='h-4 w-4 text-blue-600' />
                                        Why This Makes Sense
                                    </h4>
                                    <p className='text-gray-700 text-sm leading-relaxed mb-4'>{rec.rationale}</p>

                                    <h5 className='font-medium text-gray-900 mb-2'>Key Benefits:</h5>
                                    <ul className='space-y-2'>
                                        {rec.keyPoints.slice(0, 3).map((point, idx) => (
                                            <li
                                                key={idx}
                                                className='text-sm text-gray-600 flex items-start gap-2'
                                            >
                                                <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                                        <BarChart3 className='h-4 w-4 text-purple-600' />
                                        Financial Impact
                                    </h4>
                                    <div className='space-y-3'>
                                        {Object.entries(rec.dataPoints)
                                            .slice(0, 4)
                                            .map(([key, value]) => (
                                                <div
                                                    key={key}
                                                    className='flex justify-between items-center p-2 bg-gray-50 rounded-lg'
                                                >
                                                    <span className='text-gray-600 text-sm capitalize'>
                                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                                    </span>
                                                    <span className='font-semibold text-gray-900 text-sm'>{value}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                                        <Users className='h-4 w-4 text-orange-600' />
                                        Implementation
                                    </h4>
                                    <div className='space-y-4'>
                                        <div>
                                            <h5 className='font-medium text-gray-700 text-sm mb-2'>Requirements:</h5>
                                            <ul className='space-y-1'>
                                                {rec.requirements.slice(0, 2).map((req, idx) => (
                                                    <li
                                                        key={idx}
                                                        className='text-xs text-gray-600 flex items-start gap-1'
                                                    >
                                                        <div className='w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0'></div>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className='font-medium text-gray-700 text-sm mb-2'>Considerations:</h5>
                                            <ul className='space-y-1'>
                                                {rec.risks.slice(0, 2).map((risk, idx) => (
                                                    <li
                                                        key={idx}
                                                        className='text-xs text-gray-600 flex items-start gap-1'
                                                    >
                                                        <AlertTriangle className='h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0' />
                                                        {risk}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between pt-6 border-t border-gray-100'>
                                <div className='flex items-center gap-4'>
                                    <div className='text-sm text-gray-600'>
                                        Implementation Rank: <span className='font-medium'>#{index + 1}</span>
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                        ROI Timeline:{' '}
                                        <span className='font-medium'>
                                            {rec.dataPoints.paybackPeriod || 'Within 6 months'}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <Button
                                        variant='outline'
                                        className='gap-2 hover:bg-blue-50'
                                        onClick={e => {
                                            e.stopPropagation();
                                            // Handle learn more
                                        }}
                                    >
                                        <Calculator className='h-4 w-4' />
                                        Calculate ROI
                                    </Button>
                                    <Button
                                        className='gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                        onClick={e => {
                                            e.stopPropagation();
                                            // Handle request implementation
                                        }}
                                    >
                                        <CheckCircle className='h-4 w-4' />
                                        Request Implementation
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Implementation Roadmap */}
            <Card className='mb-8 border-0 shadow-xl bg-gradient-to-br from-slate-50 to-gray-50'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-3 text-2xl'>
                        <div className='p-2 bg-slate-100 rounded-lg'>
                            <TrendingUp className='h-6 w-6 text-slate-600' />
                        </div>
                        Strategic Implementation Plan
                    </CardTitle>
                    <CardDescription className='text-base'>
                        Recommended implementation sequence optimized for maximum ROI and minimal disruption
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='space-y-6'>
                        {recommendations
                            .sort((a, b) => b.confidence - a.confidence)
                            .map((rec, index) => (
                                <div
                                    key={rec.id}
                                    className='relative'
                                >
                                    {index < recommendations.length - 1 && (
                                        <div className='absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-blue-300 to-gray-300'></div>
                                    )}
                                    <div className='flex items-start gap-6 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                                        <div className='relative'>
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white ${
                                                    index === 0
                                                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600'
                                                        : index === 1
                                                          ? 'bg-gradient-to-br from-green-600 to-emerald-600'
                                                          : 'bg-gradient-to-br from-gray-500 to-gray-600'
                                                }`}
                                            >
                                                {index + 1}
                                            </div>
                                            {index === 0 && (
                                                <div className='absolute -top-1 -right-1 w-6 h-6'>
                                                    <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex-1'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <h3 className='font-semibold text-gray-900 text-lg'>{rec.title}</h3>
                                                <div className='flex items-center gap-3'>
                                                    <Badge
                                                        className={`${getPriorityColor(rec.priority)} px-2 py-1 text-xs`}
                                                    >
                                                        {rec.priority.toUpperCase()}
                                                    </Badge>
                                                    <div className='text-lg font-bold text-green-600'>
                                                        {rec.annualBenefit}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='text-gray-600 mb-3'>{rec.rationale}</p>
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                                                <div className='flex items-center gap-2'>
                                                    <Clock className='h-4 w-4 text-blue-500' />
                                                    <span className='text-gray-600'>Timeline: </span>
                                                    <span className='font-medium'>{rec.implementationTime}</span>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <Target className='h-4 w-4 text-purple-500' />
                                                    <span className='text-gray-600'>Complexity: </span>
                                                    <span className='font-medium'>{rec.complexity}</span>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <CheckCircle className='h-4 w-4 text-green-500' />
                                                    <span className='text-gray-600'>Confidence: </span>
                                                    <span className='font-medium'>{rec.confidence}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className='mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200'>
                        <h4 className='font-semibold text-blue-900 mb-2 flex items-center gap-2'>
                            <Sparkles className='h-5 w-5' />
                            Implementation Success Tips
                        </h4>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700'>
                            <div className='flex items-start gap-2'>
                                <CheckCircle className='h-4 w-4 mt-0.5 flex-shrink-0' />
                                <span>Start with high-confidence, low-complexity solutions for quick wins</span>
                            </div>
                            <div className='flex items-start gap-2'>
                                <CheckCircle className='h-4 w-4 mt-0.5 flex-shrink-0' />
                                <span>Allow 2-week intervals between implementations for proper integration</span>
                            </div>
                            <div className='flex items-start gap-2'>
                                <CheckCircle className='h-4 w-4 mt-0.5 flex-shrink-0' />
                                <span>Monitor results for 30 days before proceeding to next solution</span>
                            </div>
                            <div className='flex items-start gap-2'>
                                <CheckCircle className='h-4 w-4 mt-0.5 flex-shrink-0' />
                                <span>Dedicated project manager assignment recommended for complex solutions</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Section */}
            <div className='flex flex-col sm:flex-row justify-between items-center gap-6 p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200'>
                <div className='text-left'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>Ready to Optimize Your Treasury?</h3>
                    <p className='text-gray-600 text-lg'>
                        Take the next step towards maximizing your financial efficiency
                    </p>
                    <div className='mt-3 flex items-center gap-4 text-sm text-gray-600'>
                        <div className='flex items-center gap-1'>
                            <CheckCircle className='h-4 w-4 text-green-600' />
                            <span>No implementation fees</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <CheckCircle className='h-4 w-4 text-green-600' />
                            <span>30-day satisfaction guarantee</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <CheckCircle className='h-4 w-4 text-green-600' />
                            <span>Dedicated support team</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-3'>
                    <Button
                        variant='outline'
                        onClick={() => navigate('/reports')}
                        className='gap-2 hover:bg-white px-6 py-3'
                        size='lg'
                    >
                        <BarChart3 className='h-4 w-4' />
                        Generate Executive Summary
                    </Button>
                    <Button
                        onClick={() => {
                            // Handle schedule consultation
                        }}
                        className='gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3'
                        size='lg'
                    >
                        <Users className='h-4 w-4' />
                        Schedule Consultation
                    </Button>
                </div>
            </div>
        </div>
    );
};

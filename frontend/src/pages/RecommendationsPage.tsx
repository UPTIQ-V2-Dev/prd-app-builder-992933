import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RecommendationsPage = () => {
    const navigate = useNavigate();

    const recommendations = [
        {
            id: 1,
            title: 'Corporate Sweep Account',
            priority: 'high',
            icon: DollarSign,
            description:
                'Automatically sweep excess funds to high-yield savings, maximizing interest earnings while maintaining liquidity.',
            annualBenefit: '$8,400',
            confidence: 'High',
            rationale:
                'Your average daily balance of $185,000 with frequent large deposits suggests significant opportunity for interest optimization.',
            keyPoints: [
                'Automatic overnight sweeping',
                'Competitive interest rates',
                '24/7 liquidity access',
                'Real-time balance monitoring'
            ],
            dataPoints: {
                avgBalance: '$185,000',
                idleCash: '$120,000',
                transactions: '45/month'
            }
        },
        {
            id: 2,
            title: 'Treasury Management Platform',
            priority: 'high',
            icon: Zap,
            description: 'Comprehensive cash management with forecasting, reporting, and automated workflows.',
            annualBenefit: '$12,000',
            confidence: 'High',
            rationale:
                'With complex cash flows across 3 accounts and 200+ monthly transactions, this platform would streamline operations.',
            keyPoints: [
                'Cash flow forecasting',
                'Automated reporting',
                'Multi-bank connectivity',
                'Risk management tools'
            ],
            dataPoints: {
                accounts: '3 accounts',
                transactions: '235/month',
                timeSaved: '15 hours/month'
            }
        },
        {
            id: 3,
            title: 'Zero Balance Account',
            priority: 'medium',
            icon: Shield,
            description:
                'Maintain precise cash levels with automatic transfers, eliminating idle cash and overdraft risks.',
            annualBenefit: '$4,800',
            confidence: 'Medium',
            rationale: 'Zero balance accounts could optimize cash positioning across your subsidiary accounts.',
            keyPoints: [
                'Automatic fund concentration',
                'Overdraft protection',
                'Simplified cash management',
                'Reduced banking fees'
            ],
            dataPoints: {
                subsidiaryAccounts: '2 accounts',
                idleCash: '$45,000',
                transactions: '156/month'
            }
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const totalBenefit = recommendations.reduce(
        (sum, rec) => sum + parseInt(rec.annualBenefit.replace('$', '').replace(',', '')),
        0
    );

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Treasury Recommendations</h1>
                <p className='text-lg text-gray-600'>
                    Customized treasury solutions based on your transaction analysis
                </p>
            </div>

            {/* Summary Card */}
            <Card className='mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-blue-900'>
                        <Star className='h-5 w-5' />
                        Potential Annual Savings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-4xl font-bold text-blue-600 mb-2'>
                                ${totalBenefit.toLocaleString()}
                            </div>
                            <p className='text-blue-700'>
                                Combined estimated annual benefit from recommended solutions
                            </p>
                        </div>
                        <div className='text-right'>
                            <Badge className='mb-2'>3 Recommendations</Badge>
                            <p className='text-sm text-blue-600'>90% accuracy confidence</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <div className='space-y-6 mb-8'>
                {recommendations.map(rec => (
                    <Card
                        key={rec.id}
                        className='border-l-4 border-l-blue-500'
                    >
                        <CardHeader>
                            <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-blue-100 rounded-lg'>
                                        <rec.icon className='h-6 w-6 text-blue-600' />
                                    </div>
                                    <div>
                                        <CardTitle className='text-xl'>{rec.title}</CardTitle>
                                        <CardDescription>{rec.description}</CardDescription>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <Badge className={getPriorityColor(rec.priority)}>
                                        {rec.priority.toUpperCase()} PRIORITY
                                    </Badge>
                                    <div className='mt-2'>
                                        <div className='text-2xl font-bold text-green-600'>{rec.annualBenefit}</div>
                                        <div className='text-sm text-gray-500'>Annual Benefit</div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                <div>
                                    <h4 className='font-medium mb-2'>Rationale</h4>
                                    <p className='text-sm text-gray-600 mb-4'>{rec.rationale}</p>

                                    <h4 className='font-medium mb-2'>Key Features</h4>
                                    <ul className='space-y-1'>
                                        {rec.keyPoints.map((point, index) => (
                                            <li
                                                key={index}
                                                className='text-sm text-gray-600 flex items-center gap-2'
                                            >
                                                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full'></div>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className='font-medium mb-2'>Supporting Data</h4>
                                    <div className='space-y-3'>
                                        {Object.entries(rec.dataPoints).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className='flex justify-between text-sm'
                                            >
                                                <span className='text-gray-600 capitalize'>
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                </span>
                                                <span className='font-medium'>{value}</span>
                                            </div>
                                        ))}
                                        <div className='flex justify-between text-sm pt-2 border-t'>
                                            <span className='text-gray-600'>Confidence Level:</span>
                                            <span className='font-medium text-green-600'>{rec.confidence}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end mt-4 pt-4 border-t'>
                                <Button
                                    variant='outline'
                                    className='mr-2'
                                >
                                    Learn More
                                </Button>
                                <Button>Request Implementation</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Next Steps */}
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <TrendingUp className='h-5 w-5' />
                        Implementation Roadmap
                    </CardTitle>
                    <CardDescription>Recommended order for maximum impact</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4 p-3 bg-blue-50 rounded-lg'>
                            <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold'>
                                1
                            </div>
                            <div>
                                <p className='font-medium'>Corporate Sweep Account</p>
                                <p className='text-sm text-gray-600'>Immediate impact on idle cash optimization</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 p-3 bg-gray-50 rounded-lg'>
                            <div className='w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-semibold'>
                                2
                            </div>
                            <div>
                                <p className='font-medium'>Treasury Management Platform</p>
                                <p className='text-sm text-gray-600'>
                                    Operational efficiency and reporting improvements
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 p-3 bg-gray-50 rounded-lg'>
                            <div className='w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-semibold'>
                                3
                            </div>
                            <div>
                                <p className='font-medium'>Zero Balance Account</p>
                                <p className='text-sm text-gray-600'>Enhanced cash positioning optimization</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className='flex justify-end mt-8'>
                <Button
                    onClick={() => navigate('/reports')}
                    className='gap-2'
                >
                    Generate Summary Report
                    <ArrowRight className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
};

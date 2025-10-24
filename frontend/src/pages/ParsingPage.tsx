import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, FileText, BarChart3, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParseStage {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    current: boolean;
}

export const ParsingPage = () => {
    const [progress, setProgress] = useState(0);
    const [, setCurrentStage] = useState(0);
    const navigate = useNavigate();

    const stages: ParseStage[] = [
        {
            id: 'upload',
            title: 'File Upload',
            description: 'Securely receiving your bank statement files',
            completed: true,
            current: false
        },
        {
            id: 'extraction',
            title: 'Data Extraction',
            description: 'Reading and extracting transaction data',
            completed: false,
            current: true
        },
        {
            id: 'categorization',
            title: 'Transaction Categorization',
            description: 'Analyzing and categorizing transactions',
            completed: false,
            current: false
        },
        {
            id: 'analysis',
            title: 'Financial Analysis',
            description: 'Calculating metrics and cash flow patterns',
            completed: false,
            current: false
        },
        {
            id: 'completed',
            title: 'Analysis Complete',
            description: 'Ready to view insights and recommendations',
            completed: false,
            current: false
        }
    ];

    const [stageStates, setStageStates] = useState(stages);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Navigate to dashboard after completion
                    setTimeout(() => navigate('/dashboard'), 1500);
                    return 100;
                }
                return prev + 2;
            });

            // Update stages based on progress
            setStageStates(prevStages => {
                return prevStages.map((stage, index) => ({
                    ...stage,
                    completed: progress >= (index + 1) * 20,
                    current: progress < (index + 1) * 20 && progress >= index * 20
                }));
            });

            // Update current stage index
            setCurrentStage(Math.floor(progress / 20));
        }, 100);

        return () => clearInterval(interval);
    }, [progress, navigate]);

    const isCompleted = progress >= 100;

    return (
        <div className='max-w-4xl mx-auto px-6 py-8'>
            <div className='mb-8 text-center'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Analyzing Your Data</h1>
                <p className='text-lg text-gray-600'>
                    {isCompleted
                        ? 'Analysis complete! Generating insights and recommendations...'
                        : 'Please wait while we process your bank statement data'}
                </p>
            </div>

            {/* Progress Overview Card */}
            <Card className='mb-8'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <BarChart3 className='h-5 w-5' />
                        Processing Progress
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='mb-6'>
                        <div className='flex justify-between text-sm text-gray-600 mb-2'>
                            <span>Overall Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress
                            value={progress}
                            className='h-3'
                        />
                    </div>

                    {isCompleted && (
                        <div className='p-4 bg-green-50 rounded-lg border border-green-200'>
                            <div className='flex items-center gap-2 text-green-800'>
                                <CheckCircle className='h-5 w-5' />
                                <span className='font-medium'>Analysis Complete</span>
                            </div>
                            <p className='text-green-700 mt-1'>
                                Successfully processed 235 transactions from September - October 2024
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Processing Stages */}
            <Card className='mb-8'>
                <CardHeader>
                    <CardTitle>Processing Stages</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        {stageStates.map((stage, index) => (
                            <div
                                key={stage.id}
                                className='flex items-start gap-4'
                            >
                                <div
                                    className={cn(
                                        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2',
                                        {
                                            'bg-green-100 border-green-500 text-green-600': stage.completed,
                                            'bg-blue-100 border-blue-500 text-blue-600':
                                                stage.current && !stage.completed,
                                            'bg-gray-100 border-gray-300 text-gray-400':
                                                !stage.completed && !stage.current
                                        }
                                    )}
                                >
                                    {stage.completed ? (
                                        <CheckCircle className='h-4 w-4' />
                                    ) : (
                                        <span className='text-sm font-semibold'>{index + 1}</span>
                                    )}
                                </div>
                                <div className='flex-1'>
                                    <h3
                                        className={cn('font-medium', {
                                            'text-green-800': stage.completed,
                                            'text-blue-800': stage.current && !stage.completed,
                                            'text-gray-500': !stage.completed && !stage.current
                                        })}
                                    >
                                        {stage.title}
                                    </h3>
                                    <p
                                        className={cn('text-sm mt-1', {
                                            'text-green-600': stage.completed,
                                            'text-blue-600': stage.current && !stage.completed,
                                            'text-gray-400': !stage.completed && !stage.current
                                        })}
                                    >
                                        {stage.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Results Preview */}
            {progress > 80 && (
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <FileText className='h-5 w-5' />
                            Preliminary Results
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='text-center p-4 bg-blue-50 rounded-lg'>
                                <div className='text-2xl font-bold text-blue-600 mb-1'>235</div>
                                <div className='text-sm text-blue-800'>Transactions Processed</div>
                            </div>
                            <div className='text-center p-4 bg-green-50 rounded-lg'>
                                <div className='text-2xl font-bold text-green-600 mb-1'>$285K</div>
                                <div className='text-sm text-green-800'>Average Balance</div>
                            </div>
                            <div className='text-center p-4 bg-yellow-50 rounded-lg'>
                                <div className='text-2xl font-bold text-yellow-600 mb-1'>3</div>
                                <div className='text-sm text-yellow-800'>Optimization Opportunities</div>
                            </div>
                        </div>

                        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
                            <div className='flex items-start gap-3'>
                                <AlertCircle className='h-5 w-5 text-blue-500 mt-0.5' />
                                <div>
                                    <p className='font-medium text-gray-900'>Key Findings Preview:</p>
                                    <ul className='text-sm text-gray-600 mt-2 space-y-1'>
                                        <li>• Significant idle cash opportunity identified ($120K average)</li>
                                        <li>• Complex multi-account structure suitable for automation</li>
                                        <li>• Strong cash flow patterns indicate low liquidity risk</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

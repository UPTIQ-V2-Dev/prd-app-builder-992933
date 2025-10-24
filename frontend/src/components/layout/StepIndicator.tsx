import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
    id: string;
    title: string;
    description: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: string;
    completedSteps: string[];
}

export const StepIndicator = ({ steps, currentStep, completedSteps }: StepIndicatorProps) => {
    const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
    const currentStepIndex = getCurrentStepIndex();

    return (
        <div className='w-full bg-white border-b border-gray-200 px-6 py-4'>
            <div className='max-w-7xl mx-auto'>
                <nav aria-label='Progress'>
                    <ol className='flex items-center justify-between w-full'>
                        {steps.map((step, stepIndex) => {
                            const isCompleted = completedSteps.includes(step.id);
                            const isCurrent = currentStep === step.id;
                            const isUpcoming = stepIndex > currentStepIndex && !isCompleted;

                            return (
                                <li
                                    key={step.id}
                                    className='flex-1 relative'
                                >
                                    <div className='flex items-center'>
                                        <div className='flex items-center'>
                                            <div
                                                className={cn(
                                                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold',
                                                    {
                                                        'bg-blue-600 border-blue-600 text-white':
                                                            isCurrent && !isCompleted,
                                                        'bg-green-600 border-green-600 text-white': isCompleted,
                                                        'bg-white border-gray-300 text-gray-500': isUpcoming
                                                    }
                                                )}
                                            >
                                                {isCompleted ? (
                                                    <Check
                                                        className='h-5 w-5'
                                                        aria-hidden='true'
                                                    />
                                                ) : (
                                                    <span>{stepIndex + 1}</span>
                                                )}
                                            </div>
                                            <div className='ml-3 hidden sm:block'>
                                                <p
                                                    className={cn('text-sm font-medium', {
                                                        'text-blue-600': isCurrent && !isCompleted,
                                                        'text-green-600': isCompleted,
                                                        'text-gray-500': isUpcoming
                                                    })}
                                                >
                                                    {step.title}
                                                </p>
                                                <p className='text-sm text-gray-500'>{step.description}</p>
                                            </div>
                                        </div>
                                        {stepIndex < steps.length - 1 && (
                                            <div
                                                className={cn('absolute top-5 left-10 w-full h-0.5 -translate-y-0.5', {
                                                    'bg-green-600':
                                                        isCompleted || (stepIndex < currentStepIndex && !isUpcoming),
                                                    'bg-gray-300': isUpcoming || stepIndex >= currentStepIndex
                                                })}
                                            />
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    );
};

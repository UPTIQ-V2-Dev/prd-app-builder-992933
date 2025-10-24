import { Header } from './Header';
import { StepIndicator } from './StepIndicator';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
    children: React.ReactNode;
}

const steps = [
    {
        id: 'upload',
        title: 'Upload',
        description: 'Upload bank statements'
    },
    {
        id: 'parsing',
        title: 'Analyze',
        description: 'Process transaction data'
    },
    {
        id: 'dashboard',
        title: 'Review',
        description: 'Examine insights'
    },
    {
        id: 'recommendations',
        title: 'Recommend',
        description: 'Treasury solutions'
    },
    {
        id: 'reports',
        title: 'Export',
        description: 'Generate reports'
    }
];

export const AppLayout = ({ children }: AppLayoutProps) => {
    const location = useLocation();

    // Map routes to step IDs
    const getStepFromPath = (pathname: string): string => {
        if (pathname === '/' || pathname === '/upload') return 'upload';
        if (pathname === '/parsing') return 'parsing';
        if (pathname === '/dashboard') return 'dashboard';
        if (pathname === '/recommendations') return 'recommendations';
        if (pathname === '/reports') return 'reports';
        return 'upload';
    };

    // For demo purposes, we'll simulate completed steps based on current step
    const getCompletedSteps = (currentStep: string): string[] => {
        const currentIndex = steps.findIndex(step => step.id === currentStep);
        if (currentIndex === -1) return [];
        return steps.slice(0, currentIndex).map(step => step.id);
    };

    const currentStep = getStepFromPath(location.pathname);
    const completedSteps = getCompletedSteps(currentStep);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Header />
            <StepIndicator
                steps={steps}
                currentStep={currentStep}
                completedSteps={completedSteps}
            />
            <main className='container mx-auto py-8'>{children}</main>
        </div>
    );
};

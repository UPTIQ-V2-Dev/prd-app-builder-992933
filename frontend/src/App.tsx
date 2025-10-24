import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { UploadPage } from '@/pages/UploadPage';
import { ParsingPage } from '@/pages/ParsingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { ReportsPage } from '@/pages/ReportsPage';

export const App = () => {
    return (
        <AppLayout>
            <Routes>
                <Route
                    path='/'
                    element={<UploadPage />}
                />
                <Route
                    path='/upload'
                    element={<UploadPage />}
                />
                <Route
                    path='/parsing'
                    element={<ParsingPage />}
                />
                <Route
                    path='/dashboard'
                    element={<DashboardPage />}
                />
                <Route
                    path='/recommendations'
                    element={<RecommendationsPage />}
                />
                <Route
                    path='/reports'
                    element={<ReportsPage />}
                />
            </Routes>
        </AppLayout>
    );
};

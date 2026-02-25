import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GalacticPage } from './features/galactic/GalacticPage';
import { DashboardPage } from './features/dashboard/DashboardPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/preview/galactic" element={<GalacticPage />} />
                <Route path="/" element={<Navigate to="/preview/galactic" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

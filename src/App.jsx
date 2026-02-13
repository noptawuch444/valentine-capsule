import { Routes, Route, Navigate } from 'react-router-dom';
import ValentinePage from './pages/ValentinePage';
import AdminPage from './pages/AdminPage';
import PublicEditorPage from './pages/PublicEditorPage';
import { TemplateProvider } from './context/TemplateContext';
import './index.css';

function App() {
  return (
    <TemplateProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ValentinePage />} />
        <Route path="/v/:code" element={<ValentinePage />} />
        <Route path="/edit/:code" element={<PublicEditorPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TemplateProvider>
  );
}

export default App;

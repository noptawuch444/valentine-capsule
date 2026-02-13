import { Routes, Route, Navigate } from 'react-router-dom';
import ValentinePage from './pages/ValentinePage';
import AdminPage from './pages/AdminPage';
import PublicEditorPage from './pages/PublicEditorPage';
import { TemplateProvider } from './context/TemplateContext';
import './index.css';

import { LoginPage } from './pages/LoginPage';

// Simple Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem('adminAuth') === 'true';
  return isAuth ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <TemplateProvider>
      <Routes>
        {/* Entrance Gate */}
        <Route path="/" element={<LoginPage />} />

        {/* Public Surprise Routes */}
        <Route path="/v/:code" element={<ValentinePage />} />
        <Route path="/edit/:code" element={<PublicEditorPage />} />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TemplateProvider>
  );
}

export default App;

import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BioPage from './pages/BioPage';
import CareerPage from './pages/CareerPage';
import HighlightsPage from './pages/HighlightsPage';
import ContactPage from './pages/ContactPage';
import MediaPage from './pages/MediaPage';
import PartnersPage from './pages/PartnersPage';
import ForBrandsPage from './pages/ForBrandsPage';

import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './features/admin/ProtectedRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminAwardsPage from './pages/admin/AdminAwardsPage';
import AdminCareerPage from './pages/admin/AdminCareerPage';
import AdminContentBlocksPage from './pages/admin/AdminContentBlocksPage';

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Admin Routes (Outside MainLayout) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        {/* Admin Awards (Keep protected) */}
        <Route path="/admin/awards" element={<ProtectedRoute><AdminAwardsPage /></ProtectedRoute>} />
        
        {/* Admin Career (Keep protected) */}
        <Route path="/admin/career" element={<ProtectedRoute><AdminCareerPage /></ProtectedRoute>} />
        
        {/* Admin Content Blocks (Keep protected) */}
        <Route path="/admin/content-blocks" element={<ProtectedRoute><AdminContentBlocksPage /></ProtectedRoute>} />
        
        {/* Admin Root (Keep protected) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white p-20 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Admin Shell</h1>
                <p className="text-gray-500 mt-4">Protected area successfully entered.</p>
                <nav className="mt-8 flex gap-6">
                  <NavLink to="/admin/awards" className="underline hover:text-rochelais-gold">Manage Awards</NavLink>
                  <NavLink to="/admin/career" className="underline hover:text-rochelais-gold">Manage Career</NavLink>
                  <NavLink to="/admin/content-blocks" className="underline hover:text-rochelais-gold">Manage Content</NavLink>
                  <NavLink to="/" className="underline text-gray-400">Back to Site</NavLink>
                </nav>
              </div>
            </ProtectedRoute>
          } 
        />




        {/* Public Site Routes (Inside MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bio" element={<BioPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/gallery" element={<HighlightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/for-brands" element={<ForBrandsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

    </AdminAuthProvider>
  );
}



export default App;


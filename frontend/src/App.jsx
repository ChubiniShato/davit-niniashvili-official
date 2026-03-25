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
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminAwardsPage from './pages/admin/AdminAwardsPage';
import AdminCareerPage from './pages/admin/AdminCareerPage';
import AdminContentBlocksPage from './pages/admin/AdminContentBlocksPage';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Admin Routes (Outside MainLayout) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        {/* Admin Protected Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-bold font-display tracking-tightest mb-4">Admin Dashboard</h1>
              <p className="text-gray-500 max-w-md mx-auto">
                Welcome to the secure administrative interface. Use the navigation above to manage content.
              </p>
            </div>
          } />
          <Route path="/admin/awards" element={<AdminAwardsPage />} />
          <Route path="/admin/career" element={<AdminCareerPage />} />
          <Route path="/admin/content-blocks" element={<AdminContentBlocksPage />} />
        </Route>






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


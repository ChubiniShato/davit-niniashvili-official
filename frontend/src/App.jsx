import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BioPage from './pages/BioPage';
import CareerPage from './pages/CareerPage';
import HighlightsPage from './pages/HighlightsPage';
import ContactPage from './pages/ContactPage';
import MediaPage from './pages/MediaPage';
import PartnersPage from './pages/PartnersPage';
import ForBrandsPage from './pages/ForBrandsPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bio" element={<BioPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/gallery" element={<HighlightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/for-brands" element={<ForBrandsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;


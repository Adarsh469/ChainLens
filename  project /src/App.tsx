import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import Layout from './components/Layout';

// Lazy-loaded pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PersonaPage = lazy(() => import('./pages/PersonaPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="persona/:address" element={<PersonaPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
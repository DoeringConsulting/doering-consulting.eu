import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/theme-context';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UeberMichPage from './pages/UeberMichPage';
import FachgebieteOverview from './pages/FachgebieteOverview';
import KontaktPage from './pages/KontaktPage';
import DownloadsPage from './pages/DownloadsPage';
import ErfolgsgeschichtenPage from './pages/ErfolgsgeschichtenPage';
import BlogPage from './pages/BlogPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import PartnerPage from './pages/PartnerPage';
import BlogDetailPage from './pages/blog/BlogDetailPage';
import FachgebietDetailPage from './pages/fachgebiete/FachgebietDetailPage';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ueber-mich" element={<UeberMichPage />} />
              <Route path="/fachgebiete" element={<FachgebieteOverview />} />
              <Route path="/fachgebiete/:id" element={<FachgebietDetailPage />} />
              <Route path="/erfolgsgeschichten" element={<ErfolgsgeschichtenPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/kontakt" element={<KontaktPage />} />
              <Route path="/partner" element={<PartnerPage />} />
              <Route path="/impressum" element={<ImpressumPage />} />
              <Route path="/datenschutz" element={<DatenschutzPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

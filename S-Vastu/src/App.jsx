import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Gallery from './components/Gallery';
import InstagramFeed from './components/InstagramFeed';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AirflowVastuChakra from './components/AirflowVastuChakra';
import AboutPage from './Pages/AboutPage';
import ServicesPage from './Pages/ServicesPage';
import GalleryPage from './Pages/GalleryPage';
import BlogPage from './Pages/BlogPage';
import ContactPage from './Pages/ContactPage';
import CityPage from './Pages/CityPage';
import LocationsPage from './Pages/LocationsPage';
import SingleBlogPage from './Pages/SingleBlogPage';
import NotFoundPage from './Pages/NotFoundPage';
import AdminCityPages from './Pages/Admin/AdminCityPages';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminBlogPages from './Pages/Admin/AdminBlogPages';
import AdminGalleryPages from './Pages/Admin/AdminGalleryPages';
import AdminContactPages from './Pages/Admin/AdminContactPages';
import AdminSeoManager from './Pages/Admin/AdminSeoManager';
import { Navigate } from 'react-router-dom';
import SeoMeta from './components/SeoMeta';

function Home() {
  return (
    <>
      <SeoMeta pageName="home" />
      <Hero />
      <About />
      <Services />
      <AirflowVastuChakra />
      <Process />
      <Gallery limit={6} />
      <InstagramFeed />
      <Testimonials />
      <Blog limit={3} />
      <Contact />
    </>
  );
}

// Layout wrapper for public pages with Navbar and Footer
function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Routes wrapped in PublicLayout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<SingleBlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="locations" element={<LocationsPage />} />
            <Route path="city/:cityName" element={<CityPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          
          {/* Admin Auth Routes (No public Navbar/Footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="city-pages" element={<AdminCityPages />} />
            <Route path="blog-pages" element={<AdminBlogPages />} />
            <Route path="gallery-pages" element={<AdminGalleryPages />} />
            <Route path="contact-pages" element={<AdminContactPages />} />
            <Route path="seo-manager" element={<AdminSeoManager />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App

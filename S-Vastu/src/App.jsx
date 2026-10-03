import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams, Navigate } from 'react-router-dom';
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
import VastuChakra from './components/VastuChakra';
import CoreValues from './components/CoreValues';
import Founders from './components/Founders';
import AboutPage from './Pages/AboutPage';
import ServicesPage from './Pages/ServicesPage';
import GalleryPage from './Pages/GalleryPage';
import BlogPage from './Pages/BlogPage';
import ContactPage from './Pages/ContactPage';
import CityPage from './Pages/CityPage';
import LocationsPage from './Pages/LocationsPage';
import SingleBlogPage from './Pages/SingleBlogPage';
import SingleServicePage from './Pages/SingleServicePage';
import NotFoundPage from './Pages/NotFoundPage';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage';
import TermsOfServicePage from './Pages/TermsOfServicePage';
import AdminCityPages from './Pages/Admin/AdminCityPages';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminBlogPages from './Pages/Admin/AdminBlogPages';
import AdminGalleryPages from './Pages/Admin/AdminGalleryPages';
import AdminContactPages from './Pages/Admin/AdminContactPages';
import AdminSeoManager from './Pages/Admin/AdminSeoManager';
import SeoMeta from './components/SeoMeta';
import { BLOGS_API, PAGES_API } from './utils/api';
import axios from 'axios';

import AdminUsers from './Pages/Admin/AdminUsers';

// Add global axios interceptor to handle token expiration automatically
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      (error.response?.data?.message && 
       error.response.data.message.toLowerCase().includes('token'))
    ) {
      // Clear stored authentication tokens
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userRole');
      
      // Redirect to login if on an admin page (prevent loop if already on login)
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

function DynamicRouteResolver() {
  const { slug } = useParams();
  const serviceSlugs = [
    'vastu-solution',
    'vastu-for-house',
    'vastu-for-office',
    'industrial-vastu',
    'numerology',
    'astrology',
    'vastu-for-land',
    'online-consultation'
  ];
  const [type, setType] = useState(null);
  const [resolvedCityData, setResolvedCityData] = useState(null);
  const [resolvedBlogData, setResolvedBlogData] = useState(null);

  useEffect(() => {
    if (serviceSlugs.includes(slug)) {
      setType('service');
      return;
    }
    
    // Check if it's a blog or city page
    let isCancelled = false;

    const checkSlug = async (retries = 2) => {
      try {
        // Try blog first
        let blogData = null;
        try {
          const blogRes = await axios.get(`${BLOGS_API}/${slug}`);
          blogData = blogRes.data;
        } catch (blogErr) {
          // If network error (not 404), maybe cold start
          if (!blogErr.response && retries > 0) {
            setTimeout(() => {
              if (!isCancelled) checkSlug(retries - 1);
            }, 1200);
            return;
          }
        }

        if (isCancelled) return;

        if (blogData) {
          setResolvedBlogData(blogData);
          setType('blog');
          return;
        }

        // Try city page
        let cityData = null;
        try {
          const cityRes = await axios.get(`${PAGES_API}/${slug}`);
          cityData = cityRes.data;
        } catch (cityErr) {
          if (!cityErr.response && retries > 0) {
            setTimeout(() => {
              if (!isCancelled) checkSlug(retries - 1);
            }, 1200);
            return;
          }
        }

        if (isCancelled) return;

        if (cityData) {
          setResolvedCityData(cityData);
          setType('city');
          return;
        }

        if (!isCancelled) {
          setType('404');
        }
      } catch (err) {
        if (!isCancelled) setType('404');
      }
    };

    checkSlug();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  if (!type) return <div className="min-h-screen pt-32 text-center text-xl font-bold">Loading...</div>;
  if (type === 'service') return <SingleServicePage />;
  if (type === 'blog') return <SingleBlogPage initialData={resolvedBlogData} />;
  if (type === 'city') return <CityPage initialData={resolvedCityData} />;
  return <NotFoundPage />;
}

function Home() {
  return (
    <>
      <SeoMeta pageName="home" />
      <Hero />
      <About />
      <CoreValues />
      <Process />
      <Founders />
      <Services />
      <AirflowVastuChakra />
      <VastuChakra />
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
            <Route path="about-us" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="locations" element={<LocationsPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-of-service" element={<TermsOfServicePage />} />
            
            {/* Dynamic slug resolver for services, blogs, and city pages */}
            <Route path=":slug" element={<DynamicRouteResolver />} />
            
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
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import AboutUs from './components/AboutUs';
import BestSellers from './components/BestSellers';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Simple routing for Admin Dashboard
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }

  return (
    <>
      <div className="top-banner">
        Livraison gratuite partout à Dakar et paiement à la livraison 🚚
      </div>
      <Navbar onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <main>
        <Hero onOpenCheckout={() => setIsCheckoutOpen(true)} />
        <FeaturedProducts />
        <AboutUs onOpenCheckout={() => setIsCheckoutOpen(true)} />
        <BestSellers onOpenCheckout={() => setIsCheckoutOpen(true)} />
        <Newsletter onOpenCheckout={() => setIsCheckoutOpen(true)} />
      </main>
      <Footer />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  )
}

export default App

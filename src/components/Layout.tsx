import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import LeafAnimation from "./LeafAnimation";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col pt-20 relative overflow-x-hidden">
      <LeafAnimation />
      <Header onCartToggle={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

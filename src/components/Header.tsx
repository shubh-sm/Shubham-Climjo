import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartToggle }) => {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Detox", path: "/category/detox" },
    { name: "Energy", path: "/category/energy" },
    { name: "Wellness", path: "/category/wellness" },
    { name: "Hydration", path: "/category/hydration" },
    { name: "About", path: "/about" },
  ];

  const MintLeaf = ({ className }: { className?: string }) => (
    <svg 
      viewBox="0 0 24 24" 
      className={cn("overflow-visible", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="60%" stopColor="#059669" stopOpacity="1" />
          <stop offset="100%" stopColor="#047857" stopOpacity="1" />
        </linearGradient>
        <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.15" />
        </filter>
      </defs>
      <g filter="url(#leafShadow)">
        <path 
          d="M12 22C12 22 13.5 20.5 15 20C16 19.5 17.5 19.5 18.5 18.5C19.5 17.5 19.5 16 20.5 15C21 14 21.5 13 21.3 11.5C21.1 10 20.5 8.5 20.8 7C21.1 5.5 21.5 4.5 20 3.5C18.5 2.5 17 3 15.5 3.3C14 3.6 13 3.5 12 4.5C11 3.5 10 3.6 8.5 3.3C7 3 5.5 2.5 4 3.5C2.5 4.5 2.9 5.5 3.2 7C3.5 8.5 2.9 10 2.7 11.5C2.5 13 3 14 3.5 15C4.5 16 4.5 17.5 5.5 18.5C6.5 19.5 8 19.5 9 20C10.5 20.5 12 22 12 22Z"
          fill="url(#mintGradient)"
        />
        
        <path 
          d="M12 4.5V21" 
          stroke="white" 
          strokeWidth="0.8" 
          strokeOpacity="0.4" 
          fill="none" 
          strokeLinecap="round"
        />
        
        <path 
          d="M12 7L6 5M12 10L5 8.5M12 13L5 12.5M12 16L7 17.5M12 7L18 5M12 10L19 8.5M12 13L19 12.5M12 16L17 17.5"
          stroke="white" 
          strokeWidth="0.5" 
          strokeOpacity="0.3" 
          fill="none" 
          strokeLinecap="round"
        />

        <path 
          d="M7 6C5 8 5 11 7 14" 
          stroke="white" 
          strokeWidth="1.2" 
          strokeOpacity="0.2" 
          fill="none" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-emerald-50/90 backdrop-blur-xl border-b border-emerald-100/50 shadow-sm shadow-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Revolving Circular Text */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 100 100"
                className="absolute w-full h-full text-emerald-900/80 font-bold tracking-[0.15em] text-[10px] pointer-events-none"
              >
                <path 
                  id="circlePath" 
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" 
                  fill="none" 
                />
                <text fill="currentColor">
                  <textPath xlinkHref="#circlePath">
                    CLIMJO • PURE MINT • CLIMJO • PURE MINT •
                  </textPath>
                </text>
              </motion.svg>
              
              {/* Center Initials */}
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/20 transform group-hover:scale-110 transition-transform duration-300 z-10">
                <span className="text-white font-black text-sm tracking-tighter">CLJ</span>
              </div>
            </div>
           </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    "relative px-4 py-2 text-sm font-bold transition-all duration-300 flex items-center gap-2 group",
                    location.pathname === link.path 
                      ? "text-emerald-700" 
                      : "text-emerald-800/60 hover:text-emerald-600"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: (location.pathname === link.path || true) ? 1 : 0, // Keep in DOM but control visibility via opacity
                      opacity: location.pathname === link.path ? 1 : 0
                    }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    className="text-emerald-500 transition-opacity"
                  >
                    <MintLeaf className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]" />
                  </motion.div>
                  
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Hover Leaf */}
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-45 scale-75">
                    <MintLeaf className="w-4 h-4 opacity-40" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45 scale-75">
                    <MintLeaf className="w-4 h-4 opacity-40" />
                  </div>

                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-emerald-100/80 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
                {index < navLinks.length - 1 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-100/50" />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4 mr-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to={user?.isAdmin ? "/admin" : "/checkout"} className="text-sm font-medium text-emerald-800 hover:text-emerald-600 transition-colors">
                    Hi, {user?.name.split(" ")[0]}
                  </Link>
                  <button onClick={logout} title="Logout" className="p-2 text-emerald-800/60 hover:text-emerald-600 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium text-emerald-800 hover:text-emerald-600 transition-colors">
                  Login / Signup
                </Link>
              )}
            </div>

            <button
              onClick={onCartToggle}
              className="relative p-2 text-emerald-900 hover:bg-emerald-50 rounded-full transition-all duration-300 group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-emerald-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-emerald-50 border-t border-emerald-100/50 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-4 text-base font-bold rounded-2xl transition-all",
                    location.pathname === link.path 
                      ? "bg-emerald-100/50 text-emerald-700" 
                      : "text-emerald-900 hover:bg-emerald-100/30"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MintLeaf className={cn(
                    "w-5 h-5",
                    location.pathname === link.path ? "text-emerald-500" : "text-emerald-400/50"
                  )} />
                  <span>{link.name}</span>
                </Link>
              ))}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="block px-3 py-4 text-base font-medium text-emerald-600 bg-emerald-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

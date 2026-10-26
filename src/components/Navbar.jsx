import { useState, useEffect } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaSearch, 
  FaHeart, 
  FaShoppingCart, 
  FaUser, 
  FaTimes 
} from 'react-icons/fa';
import { MdOutlineMenu, MdKeyboardArrowDown } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi'; // Cleaner, modern hamburger icon

const Navbar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow on scroll for a professional, modern feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Fresh Vegetables', icon: '🥦' },
    { name: 'Organic Fruits', icon: '🍎' },
    { name: 'Dairy & Eggs', icon: '🥛' },
    { name: 'Fresh Bakery', icon: '🍞' },
    { name: 'Pulses & Grains', icon: '🌾' },
  ];

  return (
    <>
      {/* Custom animations for smooth UI */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>

      {/* =========================================================
          1. ULTRA-SLIM TOP BAR (Professional & Unobtrusive)
      ========================================================= */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] sm:text-xs py-1.5 overflow-hidden relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Contact Info (Desktop) */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <FaPhone className="text-emerald-400" size={10} /> +1 234 567 890
            </span>
            <span className="w-px h-3 bg-emerald-800"></span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <FaEnvelope className="text-emerald-400" size={10} /> hello@organic.com
            </span>
          </div>
          
          {/* Marquee Text (Centered) */}
          <div className="flex-1 sm:flex-none sm:absolute sm:left-1/2 sm:-translate-x-1/2 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee font-medium text-emerald-300">
              🌿 Welcome! Get 20% OFF your first order with code FRESH20 &nbsp; • &nbsp; 🚚 Free Delivery on orders over $50!
            </div>
          </div>

          {/* Support Badge (Desktop) */}
          <div className="hidden md:flex items-center gap-1.5 font-medium text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            24/7 Fresh Support
          </div>
        </div>
      </div>

      {/* =========================================================
          2. MAIN NAVBAR (Sleek, Modern, Perfectly Proportioned)
      ========================================================= */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* --- LEFT: Mobile Menu + Logo + Categories --- */}
            <div className="flex items-center gap-3 lg:gap-6">
              {/* Mobile Hamburger */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FiMenu size={22} />}
              </button>

              {/* Logo (Optimized size: no longer bulky) */}
              <a href="/" className="flex items-center flex-shrink-0">
                <img 
                  className="h-10 sm:h-12 w-auto object-contain" 
                  src="./logo.svg" 
                  alt="Organic Store" 
                />
              </a>

              {/* Desktop Categories Dropdown */}
              <div className="hidden lg:block relative">
                <button 
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  <MdOutlineMenu size={18} />
                  <span>Categories</span>
                  <MdKeyboardArrowDown size={18} className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Elegant Floating Dropdown */}
                {categoriesOpen && (
                  <>
                    {/* Invisible backdrop to close dropdown when clicking outside */}
                    <div className="fixed inset-0 z-10" onClick={() => setCategoriesOpen(false)}></div>
                    <div className="absolute left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-slide-down origin-top-left">
                      {categories.map((cat, idx) => (
                        <a 
                          key={idx} 
                          href="#" 
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          {cat.name}
                        </a>
                      ))}
                      <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                        <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                          View All Categories <FaSearch size={10} />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* --- CENTER: Navigation Links (Desktop) --- */}
            <nav className="hidden lg:flex items-center gap-8">
              {['Home', 'Shop', 'About Us', 'Contact'].map((item, idx) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`text-sm font-semibold transition-colors relative group ${
                    idx === 0 ? 'text-emerald-700' : 'text-gray-600 hover:text-emerald-700'
                  }`}
                >
                  {item}
                  {/* Animated underline on hover */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    idx === 0 ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              ))}
            </nav>

            {/* --- RIGHT: Search & Icons --- */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Sleek Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/30 rounded-full px-4 py-2.5 transition-all duration-200 border border-transparent focus-within:border-emerald-200">
                <input
                  type="text"
                  placeholder="Search organic..."
                  className="w-32 lg:w-48 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                <button className="text-gray-400 hover:text-emerald-600 transition-colors">
                  <FaSearch size={14} />
                </button>
              </div>

              {/* Icon Group */}
              <div className="flex items-center gap-1 sm:gap-2 border-l border-gray-200 pl-2 sm:pl-4 ml-1 sm:ml-2">
                {/* Wishlist */}
                <button className="relative p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200">
                  <FaHeart size={18} />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    2
                  </span>
                </button>

                {/* Cart */}
                <button className="relative p-2.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-all duration-200">
                  <FaShoppingCart size={18} />
                  <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    3
                  </span>
                </button>

                {/* User (Hidden on very small screens) */}
                <button className="hidden sm:block p-2.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-all duration-200">
                  <FaUser size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================
            3. MOBILE MENU (Smooth Slide Down)
        ========================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3">
                <FaSearch className="text-gray-400 mr-3" size={16} />
                <input
                  type="text"
                  placeholder="Search for fresh groceries..."
                  className="w-full bg-transparent outline-none text-sm text-gray-700"
                />
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col space-y-1">
                {['Home', 'Shop', 'Vegetables & Fruits', 'Dairy & Bakery', 'Contact Us'].map((item, idx) => (
                  <a 
                    key={item} 
                    href="#" 
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      idx === 0 ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/20">
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
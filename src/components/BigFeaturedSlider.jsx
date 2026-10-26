import { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiShoppingCart, FiHeart } from 'react-icons/fi';

const BigFeaturedSlider = () => {
  const sliderRef = useRef(null);
  
  // 1. Category Filter State ('all' by default hai)
  const [activeCategory, setActiveCategory] = useState('all');

  // 2. Aapki Screenshot wali Saari Images ka Data
  const items = [
    // Vegetables
    { id: 1, name: "Fresh Carrot", price: "Rs 120", category: "vegetables", image: "/carroot.jpg" },
    { id: 2, name: "Cauliflower", price: "Rs 150", category: "vegetables", image: "/cauliflower.jpg" },
    { id: 3, name: "Fresh Celery", price: "Rs 180", category: "vegetables", image: "/Celery.jpg" },
    { id: 4, name: "Cucumber", price: "Rs 90", category: "vegetables", image: "/Cucumber.jpg" },
    { id: 5, name: "Eggplant", price: "Rs 110", category: "vegetables", image: "/Eggplant.jpg" },
    { id: 6, name: "Fresh Beans", price: "Rs 160", category: "vegetables", image: "/freshbeans.jpg" },
    { id: 7, name: "Green Bell Pepper", price: "Rs 220", category: "vegetables", image: "/Green bell pepper.jpg" },
    { id: 8, name: "Fresh Lettuce", price: "Rs 140", category: "vegetables", image: "/Lettuce.jpg" },
    { id: 9, name: "Green Cabbage", price: "Rs 100", category: "vegetables", image: "/cabbage.jpg" },

    // Fruits
    { id: 10, name: "Fresh Coconut", price: "Rs 350", category: "fruits", image: "/Coconut.jpg" },
    { id: 11, name: "Black Grapes", price: "Rs 280", category: "fruits", image: "/Grapes.jpg" },
    { id: 12, name: "Sweet Guava", price: "Rs 190", category: "fruits", image: "/Guava.jpg" },
    { id: 13, name: "Fresh Kiwi", price: "Rs 450", category: "fruits", image: "/Kiwi.jpg" },
    { id: 14, name: "Fresh Apple", price: "Rs 250", category: "fruits", image: "/apple.jfif" },
    { id: 15, name: "Organic Banana", price: "Rs 120", category: "fruits", image: "/banana.jfif" },
    { id: 16, name: "Sweet Apricot", price: "Rs 320", category: "fruits", image: "/Apricot.jpg" },
    { id: 17, name: "Fresh Avocado", price: "Rs 400", category: "fruits", image: "/Avocado.jpg" },
    { id: 18, name: "Blackberry", price: "Rs 500", category: "fruits", image: "/Blackberry.jpg" },
    { id: 19, name: "Blueberry", price: "Rs 600", category: "fruits", image: "/Blueberry.jpg" },
  ];

  // 3. Category Filter Logic: Jab user tab par click karega to items filter honge
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  // 4. Smooth 60fps Scroll Function
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollStep = 320; // 1 card ki choraai ke barabar slide karega
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 select-none">
      
      {/* =========================================================
          1. HEADER (Title, Tabs & Navigation Buttons)
      ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Featured Products
          </h2>
          <p className="text-xs text-gray-500 mt-1">Fresh handpicked items straight from organic farms</p>
        </div>

        {/* Categories Filtering Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm font-semibold">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer text-xs sm:text-sm ${
              activeCategory === 'all' 
                ? 'bg-green-700 text-white font-bold' 
                : 'text-gray-600 hover:text-green-700 bg-gray-100'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveCategory('vegetables')}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer text-xs sm:text-sm ${
              activeCategory === 'vegetables' 
                ? 'bg-green-700 text-white font-bold' 
                : 'text-gray-600 hover:text-green-700 bg-gray-100'
            }`}
          >
            Vegetables
          </button>
          <button
            onClick={() => setActiveCategory('fruits')}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer text-xs sm:text-sm ${
              activeCategory === 'fruits' 
                ? 'bg-green-700 text-white font-bold' 
                : 'text-gray-600 hover:text-green-700 bg-gray-100'
            }`}
          >
            Fruits
          </button>
        </div>

        {/* Slider Scroll Arrows */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full bg-green-700 hover:bg-green-800 text-white flex items-center justify-center shadow-md transition active:scale-95 cursor-pointer"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full bg-green-700 hover:bg-green-800 text-white flex items-center justify-center shadow-md transition active:scale-95 cursor-pointer"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* =========================================================
          2. 2-ROWS HORIZONTAL SLIDER (Tighter Gap, Spacious Cards)
      ========================================================= */}
      <div
        ref={sliderRef}
        className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-5 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredItems.map((item) => (
          /* Card: Width ko w-64 (256px) rakha hai taake image dabbi hui na lage */
          <div
            key={item.id}
            className="group w-60 sm:w-64 bg-white  hover:border-green-300 rounded-2xl p-3 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* 50% Soft Opacity Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                {/* 60fps Fade-Up Action Buttons */}
                <div className="w-full flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer">
                    <FiShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </button>
                  <button 
                    className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center shadow-md transition active:scale-95 cursor-pointer shrink-0"
                    title="Add to Wishlist"
                  >
                    <FiHeart size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Title aur Green Price */}
            <div className="pt-3 pb-1 text-center">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base capitalize truncate group-hover:text-green-700 transition">
                {item.name}
              </h3>
              <p className="text-green-600 font-extrabold text-base sm:text-lg mt-0.5">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BigFeaturedSlider;
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiArrowRight, FiPercent } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa'; // Added for that organic touch

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 1,
      image: './heroimg1.png',
      badge: '🌿 100% Fresh & Organic',
      heading: 'Fresh Vegetables &',
      highlightText: 'Healthy Green Diet',
      description: 'Seedhi khet se aapke ghar tak! Taaza sabziyan aur fruits jo aapki family ko healthy aur fit rakhain.',
      discountTag: 'Flat 20% OFF',
      buttonText: 'Order Fresh Now',
    },
    {
      id: 2,
      image: './heroimg2.png',
      badge: '🍎 Seasonal Special Pick',
      heading: 'Juicy Farm Fruits',
      highlightText: 'Naturally Sweet & Pure',
      description: 'Baghbanon se chune hue sweet seasonal fruits, baghair kisi chemicals aur artificial sprays ke.',
      discountTag: 'Buy 1 Get 1 Free',
      buttonText: 'Explore Fruits',
    },
    {
      id: 3,
      image: './heroimg3.png',
      badge: '⚡ Express 30-Min Delivery',
      heading: 'Pure Daily Essentials',
      highlightText: '& Organic Grocery',
      description: 'Rozmarrah ka organic doodh, desi makhan, aur tazi bakery items ek hi click par aapke darwaze tak.',
      discountTag: 'Free Home Delivery',
      buttonText: 'Shop Essentials',
    },
  ];

  // const nextSlide = () => {
  //   setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  // };

const nextSlide = ()=>{
  setCurrentIndex((prev) =>(prev === slides.length -1 ? 0 : prev -1));
};

const prevSlide = () =>{
  setCurrentIndex((prev) => (prev === 0 ? slides.length -1    : prev + 1));
};
  // Auto-scroll with pause-on-hover for better UX
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds gives users time to read
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  return (
    <>
      {/* Custom Staggered Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* Start hidden */
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      <div 
        className="relative w-full overflow-hidden select-none group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Horizontal Sliding Track */}
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div 
                key={slide.id} 
                className="relative w-full shrink-0 h-[500px] sm:h-[600px] lg:h-[700px] flex items-center"
              >
                {/* Background Image with Subtle Zoom Effect */}
                <img
                  src={slide.image}
                  alt={slide.heading}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out  ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />

                {/* Organic Gradient Overlay (Rich Green instead of harsh black) */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/60 to-transparent -z-10" />
                
                {/* Subtle decorative glow behind text */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

                {/* =========================================================
                    SLIDE TEXT & BUTTON CONTENT (Remounts on index change to trigger animation)
                ========================================================= */}
                <div key={`text-${currentIndex}`} className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 w-full relative z-10">
                  <div className="max-w-2xl text-white space-y-5 sm:space-y-6 pt-8">
                    
                    {/* Top Badges */}
                    <div className="flex items-center gap-3 flex-wrap animate-fade-in-up delay-100">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                        <FaLeaf className="text-emerald-400" size={14} />
                        {slide.badge}
                      </span>
                      <span className="bg-amber-500 hover:bg-amber-400 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/30 transition-colors">
                        <FiPercent size={14} /> {slide.discountTag}
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white animate-fade-in-up delay-200">
                      {slide.heading} <br className="hidden sm:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 relative inline-block">
                        {slide.highlightText}
                        {/* Subtle underline accent */}
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-emerald-500/50 rounded-full blur-sm"></span>
                      </span>
                    </h1>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-200/90 max-w-lg leading-relaxed animate-fade-in-up delay-300">
                      {slide.description}
                    </p>

                    {/* Call-To-Action Button */}
                    <div className="pt-2 animate-fade-in-up delay-400">
                      <button className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full shadow-xl shadow-emerald-900/30 transition-all duration-300 hover:shadow-emerald-500/40 hover:-translate-y-1 active:translate-y-0 flex items-center gap-3">
                        <span className="relative z-10 flex items-center gap-2">
                          {slide.buttonText}
                          <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        {/* Button hover shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            PREVIOUS ARROW (Left)
        ========================================================= */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer group"
          aria-label="Previous"
        >
          <IoIosArrowBack size={24} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        {/* =========================================================
            NEXT ARROW (Right)
        ========================================================= */}
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer group"
          aria-label="Next"
        >
          <IoIosArrowForward size={24} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        {/* =========================================================
            BOTTOM DOTS INDICATORS
        ========================================================= */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative transition-all duration-500 ease-out rounded-full cursor-pointer overflow-hidden ${
                index === currentIndex 
                  ? 'w-8 h-2.5 bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress bar animation for active dot */}
              {index === currentIndex && !isHovered && (
                <span className="absolute inset-0 bg-white/30 animate-[progress_5s_linear_forwards]" 
                      style={{ animation: 'shrinkWidth 5s linear forwards' }} 
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Keyframe for dot progress */}
        <style>{`
          @keyframes shrinkWidth {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </>
  );
};

export default Hero;
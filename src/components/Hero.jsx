import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { FiArrowRight, FiPercent } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

/* =====================================================================
   1) SLIDES KA DATA
   Order yahi hai jo array me hai: Fruits -> Vegetables -> Dairy -> Dry Fruits -> Nuts
   Naya slide chahiye to bas ek object copy karke neeche add kar do.
   Saari videos `public/` folder me honi chahiye.
   ===================================================================== */
const slides = [
  {
    id: 1,
    video: '/hero-fruitSplash.mp4',
    badge: 'Seasonal Special Pick',
    heading: 'Juicy Farm Fruits',
    highlightText: 'Naturally Sweet & Pure',
    tagline: 'Fresh fruits, with natural sweetness.',
    description: 'Seasonal fruits picked at their best, with no chemicals and no artificial sprays.',
    discountTag: 'Buy 1 Get 1 Free',
    buttonText: 'Explore Fruits',
  },
  {
    id: 2,
    video: '/hero-vid.mp4',
    // Agar is video me logo kisi corner me hai to neeche wali line ka comment hata do.
    // scale-125 zoom karta hai, origin-top-left se neeche-right ka corner (logo) frame se bahar chala jata hai.
    // videoClass: 'scale-125 origin-top-left',
    badge: '100% Fresh & Organic',
    heading: 'Fresh Vegetables &',
    highlightText: 'Healthy Green Diet',
    tagline: 'Straight from the farm to your home.',
    description: 'Hand-picked produce that keeps your family healthy, fit and full of energy.',
    discountTag: 'Flat 20% OFF',
    buttonText: 'Order Fresh Now',
  },
  {
    id: 3,
    video: '/dairy.mp4',
    badge: 'Farm-Fresh Dairy',
    heading: 'Pure Dairy,',
    highlightText: 'Straight from the Farm',
    tagline: 'Pure milk, delivered fresh to your home.',
    description: 'Fresh milk, butter and milk powder from healthy herds, delivered the same day.',
    discountTag: 'Free Home Delivery',
    buttonText: 'Shop Dairy',
  },
  {
    id: 4,
    video: '/hero-dryfruit.mp4',
    badge: 'Premium Dry Fruits',
    heading: 'Rich in Flavour,',
    highlightText: 'Packed with Nutrition',
    tagline: 'The finest dry fruits, for every occasion.',
    description: 'Almonds, dates, raisins and more, sourced from trusted growers and packed fresh.',
    discountTag: 'Flat 20% OFF',
    buttonText: 'Shop Dry Fruits',
  },
  {
    id: 5,
    video: '/hero-nutsNfruit.mp4',
    badge: 'Healthy Snacking',
    heading: 'Crunchy Nuts &',
    highlightText: 'Wholesome Snacks',
    tagline: 'Healthy snacks with a natural taste.',
    description: 'Roasted nuts, seeds and honest snacks for every craving, free of artificial additives.',
    discountTag: 'New Arrivals',
    buttonText: 'Browse Snacks',
  },
];

/* =====================================================================
   2) TIMING SETTINGS (yahan se speed badal sakte ho)
   ===================================================================== */
const FADE_MS = 1100; // ek video se doosri video me crossfade kitni der ka
const MIN_MS = 4000; // slide kam az kam itni der (ms) dikhegi
const MAX_MS = 6500; // clip lambi ho tab bhi itne par agli slide aa jayegi

/* =====================================================================
   3) TEXT FADE HELPER
   Sirf opacity use ki hai (transform/blur nahi), kyunki opacity GPU par chalti hai
   aur video ke upar bhi 60fps smooth rehti hai. Blur wali animation lag karti thi.
   - active = true  -> text dheere se aata hai (delay ke saath, ek ke baad ek)
   - active = false -> text jaldi se fade-out ho jata hai
   `order` se pata chalta hai konsa element pehle aayega (0 = sabse pehle)
   ===================================================================== */
const reveal = (active, order) => ({
  opacity: active ? 1 : 0,
  transition: active
    ? `opacity 1000ms ease ${600 + order * 180}ms`
    : 'opacity 400ms ease 0ms',
});

const Hero = () => {
  /* ---------------- STATE (jo cheezein badalti rehti hain) ---------------- */
  const [current, setCurrent] = useState(0); // abhi konsi slide chal rahi hai
  const [mounted, setMounted] = useState(false); // page load ke baad text fade-in karwane ke liye
  const [height, setHeight] = useState(null); // hero ki height (navbar/banner minus karke)
  const [durations, setDurations] = useState({}); // har video ki length (seconds)
  const [ready, setReady] = useState({}); // kaunsi video load ho chuki hai

  /* ---------------- REFS (DOM cheezein pakadne ke liye) ---------------- */
  const sectionRef = useRef(null); // hero section khud
  const videoRefs = useRef([]); // saari video elements ki list
  const touchStartX = useRef(null); // mobile swipe ka start point

  /* ---------------- AGLI / PICHLI SLIDE ---------------- */
  const next = useCallback(() => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1)), []);
  const prev = useCallback(() => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1)), []);

  /* ---------------- EFFECT 1: page khulte hi text fade-in ---------------- */
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ---------------- EFFECT 2: HEIGHT FIT KARNA ----------------
     Hero ki height = screen ki height - (banner + navbar).
     Hero khud apni position naap leta hai, isliye banner/navbar ki height
     badle tab bhi sahi fit rehta hai. */
  useLayoutEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      setHeight(Math.max(window.innerHeight - top, 480)); // 480px se chhota nahi hone dena
    };
    measure();
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure); // banner band ho to bhi dobara naapta hai
    ro.observe(document.body);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, []);

  /* ---------------- EFFECT 3: AUTO SLIDE CHANGE ----------------
     Slide ka time = us video ki apni length, lekin MIN_MS aur MAX_MS ke beech.
     Video loop nahi hoti, isliye "3 baar chal ke phir change" wala masla nahi. */
  useEffect(() => {
    const d = durations[current];
    const ms = d ? Math.min(Math.max(d * 1000 - FADE_MS / 2, MIN_MS), MAX_MS) : 5000;
    const t = setTimeout(next, ms);
    return () => clearTimeout(t);
  }, [current, durations, next]);

  /* ---------------- EFFECT 4: VIDEO PLAY / PAUSE ----------------
     Sirf active video play hoti hai (CPU/GPU bachta hai, lag kam).
     Purani video crossfade khatam hone ke baad pause hoti hai. */
  useEffect(() => {
    const active = videoRefs.current[current];
    if (active) {
      active.currentTime = 0; // shuru se chalao
      active.play().catch(() => {}); // browser block kare to error ignore
    }
    const t = setTimeout(() => {
      videoRefs.current.forEach((v, i) => v && i !== current && v.pause());
    }, FADE_MS + 100);
    return () => clearTimeout(t);
  }, [current]);

  /* ---------------- VIDEO KI METADATA (length) MIL GAYI ---------------- */
  const onMeta = (index, e) => {
    const v = e.currentTarget;
    // Agar clip MIN_MS se chhoti hai to last frame par ruk na jaye, isliye sirf tab loop
    v.loop = v.duration * 1000 < MIN_MS;
    setDurations((d) => ({ ...d, [index]: v.duration }));
  };

  /* ---------------- MOBILE SWIPE (left/right) ---------------- */
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? next : prev)(); // 50px se zyada swipe ho tabhi
    touchStartX.current = null;
  };

  /* ---------------- UI ---------------- */
  return (
    <>
    {/* FONTS: Poppins (bold, modern) + Fraunces italic (stylish line). Google Fonts se load hote hain.
        Tez load ke liye in dono ko index.html ke <head> me <link> se bhi daal sakte ho. */}
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,800;1,500&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&display=swap');
      .font-poppins { font-family: 'Poppins', system-ui, sans-serif; }
      .font-stylish { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-weight: 500; }
    `}</style>
    <section
      ref={sectionRef}
      // --hh = hero ki height. Heading ka size isi se nikalta hai taake text kabhi screen se bahar na jaye
      style={{ height: height || '80svh', '--hh': height ? `${height}px` : '80svh' }}
      className="font-poppins relative w-full overflow-hidden select-none bg-neutral-950"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        const show = isActive && mounted; // text tabhi dikhao jab slide active ho
        // Active aur uske agli wali video pehle se load, baaki sirf metadata (data bachta hai)
        const preload = isActive || index === (current + 1) % slides.length ? 'auto' : 'metadata';

        return (
          // Har slide ek layer hai; inactive layer opacity 0 hoti hai (crossfade)
          <div
            key={slide.id}
            aria-hidden={!isActive}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            className={`absolute inset-0 flex items-center transition-opacity ease-in-out will-change-[opacity] ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background video. Load hone tak transparent rehti hai, phir fade-in */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={slide.video}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                slide.videoClass || ''
              }`}
              style={{ opacity: ready[index] ? 1 : 0 }}
              muted
              playsInline
              disablePictureInPicture
              preload={preload}
              onLoadedMetadata={(e) => onMeta(index, e)}
              onLoadedData={() => setReady((r) => ({ ...r, [index]: true }))}
            />

            {/* Overlay: ek hi layer (left side dark taake text padhne me aaye, neeche halka dark).
                Mobile par poori video thodi dark (max-sm:bg-black/35) kyunki text poori width lega */}
            <div className="absolute inset-0 bg-black/0 max-sm:bg-black/35 bg-[linear-gradient(to_right,rgba(0,0,0,0.75),rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.05)),linear-gradient(to_top,rgba(0,0,0,0.45),transparent_35%)]" />

            {/* Text content */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-12 md:px-16 py-6">
              <div className="max-w-3xl space-y-3 sm:space-y-4 text-white">
                {/* Badge + discount tag */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3" style={reveal(show, 0)}>
                  <span className="flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3.5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <FaLeaf className="text-emerald-400" size={13} />
                    {slide.badge}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-lg shadow-amber-500/30">
                    <FiPercent size={13} /> {slide.discountTag}
                  </span>
                </div>

                {/* Heading (pehle wala bold style). pb-1.5 isliye ki "y" aur "g" ka neeche ka hissa na kate */}
                <h1
                  className="font-extrabold leading-[1.08] tracking-tight"
                  // clamp(min, preferred, max): chhoti screen/height par chhota, bade par bada, kabhi bahar nahi
                  style={{ ...reveal(show, 1), fontSize: 'clamp(1.875rem, min(7.2vw, calc(var(--hh) * 0.09)), 4.75rem)' }}
                >
                  {/* Line 1: bold */}
                  <span className="block sm:whitespace-nowrap">{slide.heading}</span>
                  {/* Line 2: stylish italic serif + green gradient. pb-2 se "y/g" ka neeche ka hissa nahi katta */}
                  <span className="font-stylish block pb-2 sm:whitespace-nowrap bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
                    {slide.highlightText}
                  </span>
                </h1>

                {/* English tagline (pehle Urdu wali line yahan thi) */}
                <p
                  className="text-base sm:text-lg font-medium italic text-emerald-100"
                  style={reveal(show, 2)}
                >
                  {slide.tagline}
                </p>

                {/* Description */}
                <p
                  className="max-w-lg text-sm sm:text-base leading-relaxed text-white/80 [@media(max-height:520px)]:hidden"
                  style={reveal(show, 3)}
                >
                  {slide.description}
                </p>

                {/* Button */}
                <div className="pt-1" style={reveal(show, 4)}>
                  <button
                    tabIndex={isActive ? 0 : -1}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-emerald-600 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-xl shadow-emerald-900/30 transition-colors duration-300 hover:bg-emerald-500 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slide.buttonText}
                      <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    {/* Hover par chamak (shine) wala effect */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
    </>
  );
};

export default Hero;
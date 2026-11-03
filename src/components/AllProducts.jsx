import { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiShoppingCart, FiHeart } from "react-icons/fi";
import { allProducts } from "./ProductsData"; // saara product data is file se aata hai

const AllProducts = () => {
  const sliderRef = useRef(null); // slider div ko pakadne ke liye (arrows se scroll karwane ke liye)

  // Arrows: dikhne wali width ka 80% scroll. "smooth" browser khud GPU se smooth karta hai (60fps)
  const handleScroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollBy({
      left: direction === "left" ? -slider.clientWidth * 0.8 : slider.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto w-full max-w-7xl select-none px-4 py-10 sm:px-6 lg:px-8">
      {/* ---------- HEADER: title, tabs, arrows ---------- */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">All Products</h2>
          <p className="mt-1 text-sm text-gray-500">{allProducts.length} items to explore</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white active:scale-95 cursor-pointer"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white active:scale-95 cursor-pointer"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- SLIDER: 2 ROWS ----------
          grid-flow-col + grid-rows-2 : cards pehle neeche 2 rows me bharte hain, phir agla column, aur side me scroll
          auto-cols-[..%]  : har column ki width (mobile 2 card, tablet 3, laptop 4, bade screen 5)
          snap-x snap-mandatory : scroll rukte hi card seedha align
          -mx-3 px-3 py-4 : hover shadow ke liye kinaron par jagah (warna shadow kat jata hai) */}
      <div
        ref={sliderRef}
        className="-mx-3 grid grid-flow-col grid-rows-2 auto-cols-[46%] snap-x snap-mandatory gap-x-3 gap-y-4 overflow-x-auto overscroll-x-contain scroll-smooth px-3 py-4 [&::-webkit-scrollbar]:hidden sm:auto-cols-[31.5%] sm:gap-x-4 lg:auto-cols-[23.8%] xl:auto-cols-[19%]"
        style={{ scrollbarWidth: "none", scrollPaddingLeft: "0.75rem" }}
      >
        {allProducts.map((item) => (
          <div key={item.id} className="snap-start">
            {/* ---------- CARD ----------
                group  : card pe hover karne se andar ki cheezein react karti hain
                isolate: hover shadow layer card ke peeche rahe
                hover:-translate-y-1 : hover par card thoda upar uthta hai */}
            <article className="group relative isolate rounded-2xl p-2.5 transition-transform duration-300 ease-out hover:-translate-y-1">
              {/* Hover par poore card ke chaaron taraf halka shadow (sirf opacity badalti hai, isliye smooth) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-white opacity-0 ring-1 ring-black/5 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.22)] transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Image box: white background aur object-contain, isliye poora product dikhta hai (kat'ta nahi) */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-gray-100 bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-4"
                />

                {/* Wishlist heart */}
                <button
                  aria-label={`Add ${item.name} to wishlist`}
                  className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 opacity-0 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:text-red-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100 cursor-pointer"
                >
                  <FiHeart size={16} />
                </button>

                {/* Add to Cart: hover par neeche se aata hai. [@media(hover:none)] = mobile, wahan hamesha dikhta hai */}
                <div className="absolute inset-x-2.5 bottom-2.5 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 py-2 text-xs font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-green-700 sm:py-2.5 sm:text-sm cursor-pointer">
                    <FiShoppingCart size={15} />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Text: category, naam, price */}
              <div className="mt-3 space-y-0.5 px-0.5">
                <p className="text-[11px] uppercase tracking-wider text-gray-400">{item.category}</p>
                <h3 className="truncate text-sm font-medium text-gray-900 sm:text-base">{item.name}</h3>
                <p className="text-sm font-semibold text-green-700 sm:text-base">{item.price}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
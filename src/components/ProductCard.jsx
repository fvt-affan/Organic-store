import { FiShoppingCart, FiHeart } from "react-icons/fi";

/* =====================================================================
   PRODUCT CARD (slider aur All Products dono isi card ko use karte hain)
   Card ki width yahan fix nahi hai, wo uske parent (slider/grid) se aati hai.
   Isi liye ye har jagah responsive rehta hai.
   ===================================================================== */
const ProductCard = ({ product }) => {
  return (
    // `group` zaroori hai: card pe hover karne se andar ki cheezein (button, zoom) react karti hain
    <article className="group">
      {/* ---------- IMAGE BOX ----------
          aspect-[4/5] = lamba (portrait) card, square/box wala look nahi.
          overflow-hidden + rounded-2xl: image ke kone gol, aur zoom box ke bahar nahi nikalta */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          // hover par halka zoom (transform se, isliye 60fps smooth)
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Wishlist heart: top-right, hover par aata hai */}
        <button
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 opacity-0 shadow-sm transition-all duration-300 hover:text-red-500 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100 cursor-pointer"
        >
          <FiHeart size={16} />
        </button>

        {/* Add to Cart: neeche se halka upar slide hoke aata hai (opacity + translate = smooth).
            [@media(hover:none)] = mobile/touch screen, jahan hover hota hi nahi, wahan button hamesha dikhta hai */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-2 text-xs font-semibold text-gray-900 shadow-lg transition-colors duration-200 hover:bg-green-700 hover:text-white sm:py-2.5 sm:text-sm cursor-pointer">
            <FiShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* ---------- TEXT: category, naam, price (left aligned, minimal) ---------- */}
      <div className="mt-3 space-y-0.5">
        <p className="text-[11px] uppercase tracking-wider text-gray-400">{product.category}</p>
        {/* truncate: naam lamba ho to ek line me "..." ke saath kat jata hai, card bigadta nahi */}
        <h3 className="truncate text-sm font-medium text-gray-900 sm:text-base">{product.name}</h3>
        <p className="text-sm font-semibold text-green-700 sm:text-base">{product.price}</p>
      </div>
    </article>
  );
};

export default ProductCard;
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaLeaf } from "react-icons/fa";
import { FiMapPin, FiClock, FiPhone, FiMail, FiArrowRight } from "react-icons/fi";

/* =====================================================================
   DATA (upar rakha hai taake neeche ka JSX chhota aur saaf rahe)
   ===================================================================== */

// Abhi placeholder location (Kazakhstan) hai, kyunki asli location nahi dikhani.
// Baad me shop ki asli jagah daalni ho to sirf ye 2 line badlo.
const MAP_QUERY = "Almaty, Kazakhstan"; // Google Map isi se banta hai (red pin khud lagta hai)
const DISPLAY_ADDRESS = "Almaty, Kazakhstan"; // footer me jo text dikhta hai

// Logo ki file `public/` folder me honi chahiye. Naam alag ho to yahan badal do
const LOGO_SRC = "/logo.png";

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { name: "Pinterest", icon: FaPinterestP, href: "https://pinterest.com" },
];

// Categories (hover par inki list khulti hai). Vegetables hata diya, Dry Fruits add kiya
const categories = [
  { title: "Dairy", links: ["Fresh Milk", "Milk Powder", "Yogurt", "Butter & Ghee"] },
  { title: "Fruits", links: ["Seasonal Fruits", "Berries", "Tropical Fruits", "Citrus"] },
  { title: "Dry Fruits", links: ["Almonds", "Cashews", "Walnuts", "Dates"] },
  { title: "Organic", links: ["Chia Seeds", "Flax Seeds", "Quinoa", "Raw Honey"] },
];

// Policies / help wale links (ye hamesha dikhte hain, hover ki zaroorat nahi)
const helpLinks = ["Privacy Policy", "Terms & Conditions", "FAQ", "Shipping Info", "Returns & Refunds"];

/* =====================================================================
   LOGO
   Pehle apna logo image dikhata hai. Agar image na mile to icon + naam dikhata hai
   ===================================================================== */
const Logo = () => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
          <FaLeaf size={18} />
        </div>
        <p className="text-xl font-bold text-green-900">PureHarvest</p>
      </div>
    );
  }

  return <img src={LOGO_SRC} alt="PureHarvest" onError={() => setFailed(true)} className="h-11 w-auto" />;
};

const Footer = () => {
  const [email, setEmail] = useState(""); // subscribe wali email
  const [subscribed, setSubscribed] = useState(false); // subscribe ho gaya to "thank you" dikhane ke liye

  // Saal khud update hota hai: new Date().getFullYear() aaj ka saal deta hai
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault(); // page reload na ho
    setSubscribed(true);
    setEmail("");
  };

  return (
    // overflow-x-clip: kuch bhi footer se bahar (side me) nahi nikalega
    <footer className="overflow-x-clip bg-[#eef5ee] text-green-900">
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* =============================================================
            3 ZONES: Brand+Map | Categories+Help | Subscribe+Contact+Follow
            Mobile: ek ke neeche ek | Tablet: upar 2, neeche categories | Bade screen: 3 zone ek line me
            min-w-0: andar ka content zone se bahar nahi jata
        ============================================================= */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-12">
          {/* ---------- ZONE 1: Logo, about, map ---------- */}
          <div className="min-w-0 space-y-4 xl:col-span-3">
            <Logo />

            <p className="text-sm leading-relaxed text-green-800/80">
              Fresh dairy, fruits, dry fruits and pantry staples, delivered straight to your doorstep.
            </p>

            {/* Google Map: z=12 se shehar dikhta hai, pin (marker) Google khud lagata hai */}
            <div className="overflow-hidden rounded-xl border border-green-900/10 shadow-sm">
              <iframe
                title="Store location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=12&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-36 w-full border-0 sm:h-40"
              />
            </div>
          </div>

          {/* ---------- ZONE 2: Categories (hover) + Help ----------
              Mobile pe 2 columns, tablet 3, bade screen pe 5 (4 categories + Help) */}
          <div className="min-w-0 md:order-3 md:col-span-2 xl:order-2 xl:col-span-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
              {categories.map((cat) => (
                // `group`: is block pe hover karne se andar ki cheezein react karti hain
                <div key={cat.title} className="group min-w-0">
                  {/* Title + neeche ki line.
                      Line normally 0 width (scale-x-0) hoti hai, hover par left se right smooth badhti hai */}
                  <h4 className="relative inline-block pb-1.5 text-sm font-bold uppercase tracking-wide text-green-900">
                    {cat.title}
                    <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-green-600 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100" />
                  </h4>

                  {/* LIST: normally chhupi (0fr height + opacity 0), hover par smooth khulti hai (1fr)
                      Ye dropdown nahi hai, apni jagah pe hi neeche khulti hai.
                      [@media(hover:none)] = mobile/touch, wahan hover nahi hota isliye list hamesha khuli rehti hai */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    {/* overflow-hidden zaroori hai, tabhi 0fr par list poori tarah band hoti hai */}
                    <ul className="space-y-2 overflow-hidden pt-3 text-sm text-green-800/80">
                      {cat.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="transition-colors duration-200 hover:text-green-600">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Help column: hamesha dikhta hai (policies chhupani nahi chahiye) */}
              <div className="min-w-0">
                <h4 className="inline-block pb-1.5 text-sm font-bold uppercase tracking-wide text-green-900">Help</h4>
                <ul className="space-y-2 pt-3 text-sm text-green-800/80">
                  {helpLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors duration-200 hover:text-green-600">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ---------- ZONE 3: Subscribe, Contact, Follow Us ---------- */}
          <div className="min-w-0 space-y-6 md:order-2 xl:order-3 xl:col-span-3">
            {/* Subscribe (Contact se upar) */}
            <div>
              <h3 className="mb-1 text-base font-bold">Subscribe to Us</h3>
              <p className="mb-3 text-xs text-green-800/80">Get fresh offers and healthy tips in your inbox.</p>

              {subscribed ? (
                <p className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-green-700">
                  Thank you for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-green-900 outline-none placeholder:text-green-800/40"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-white transition-colors hover:bg-green-600 cursor-pointer"
                  >
                    <FiArrowRight size={17} />
                  </button>
                </form>
              )}
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-3 text-base font-bold">Contact Us</h3>
              <ul className="space-y-2.5 text-sm text-green-800/80">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-green-700" size={16} />
                  <span>{DISPLAY_ADDRESS}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="shrink-0 text-green-700" size={16} />
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="shrink-0 text-green-700" size={16} />
                  <span className="break-all">hello@organic.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiClock className="shrink-0 text-green-700" size={16} />
                  <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Follow Us (Contact ke neeche) */}
            <div>
              <h3 className="mb-3 text-base font-bold">Follow Us</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================
            COPYRIGHT BAR (pehle se kam space: mt-8 aur py-4)
        ============================================================= */}
        <div className="mt-8 border-t border-green-900/10 py-4 text-center text-sm text-green-800/70">
          &copy; {currentYear} PureHarvest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState } from "react";

/* =====================================================================
   LOGOS KI LIST
   Logo images `public/logos/` folder me rakho (PNG ya SVG, transparent background best hai).
   Agar kisi ka logo file nahi mili, to uski jagah uska naam text me dikh jata hai (kuch toot'ta nahi).

   ZAROORI: sirf wahi organizations/certifications likho jinse tera SACH me
   kaam ya certificate hai. Warna ye jhoota daawa hota hai, aur organic/halal jaise
   certifications me legal masla bhi ban sakta hai.
   ===================================================================== */
const partners = [
  { name: "FAO", logo: "/logos/fao.png" },
  { name: "Codex Alimentarius", logo: "/logos/codex.png" },
  { name: "IFOAM", logo: "/logos/ifoam.png" },
  { name: "USDA Organic", logo: "/logos/usda-organic.png" },
  { name: "EU Organic", logo: "/logos/eu-organic.png" },
  { name: "JAS", logo: "/logos/jas.png" },
  { name: "Halal", logo: "/logos/halal.png" },
  { name: "GlobalG.A.P.", logo: "/logos/globalgap.png" },
  { name: "Ecocert", logo: "/logos/ecocert.png" },
  { name: "Control Union", logo: "/logos/control-union.png" },
  { name: "SGS", logo: "/logos/sgs.png" },
  { name: "PSQCA", logo: "/logos/psqca.png" },
];

/* =====================================================================
   EK LOGO
   failed = true ho jaye (image nahi mili) to logo ki jagah naam dikhata hai
   ===================================================================== */
const LogoItem = ({ partner }) => {
  const [failed, setFailed] = useState(false);

  return (
    // Har item ki width fix hai, isliye saare logos barabar jagah lete hain
    <div className="flex h-14 w-40 shrink-0 items-center justify-center px-4 sm:h-16 sm:w-52 sm:px-6">
      {failed ? (
        // Fallback: sirf naam
        <span className="whitespace-nowrap text-base font-bold tracking-tight text-green-900/50 transition-colors duration-300 hover:text-green-700 sm:text-lg">
          {partner.name}
        </span>
      ) : (
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          onError={() => setFailed(true)} // image load na ho to naam dikhao
          // grayscale + halka: shant look. Hover par asli rang aur poora saaf
          className="max-h-10 w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-12"
        />
      )}
    </div>
  );
};

/* =====================================================================
   MAIN COMPONENT: ek hi row, apne aap chalti rehti hai
   ===================================================================== */
const TrustedByCertifications = () => {
  // Loop ko infinite banane ke liye list do baar render hoti hai.
  // CSS list ko 50% khisakti hai (yaani ek poori list), phir shuru se, isliye jhatka nahi lagta.
  const loop = [...partners, ...partners];

  // Jitne zyada logos, utna zyada time, taake speed na badle (har logo ke liye 3 second)
  const duration = partners.length * 3;

  return (
    <section className="bg-white py-14">
      {/* Chhota CSS yahin rakha hai taake component self-contained rahe */}
      <style>{`
        .logo-track {
          display: flex;
          width: max-content;
          animation: logo-scroll linear infinite;
          will-change: transform;
        }
        .logo-track:hover { animation-play-state: paused; } /* mouse upar aaye to ruk jaye */
        @keyframes logo-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        /* Dono kinaron par logos halke halke gayab hon (kisi bhi background par chalta hai) */
        .logo-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-track { animation: none; }
          .logo-fade { overflow-x: auto; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">Trusted &amp; Certified</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-green-900 sm:text-3xl">
            Standards behind every product
          </h2>
        </div>

        {/* Logo row */}
        <div className="logo-fade mt-8 overflow-hidden">
          <div className="logo-track" style={{ animationDuration: `${duration}s` }}>
            {loop.map((partner, index) => (
              <LogoItem key={`${partner.name}-${index}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByCertifications;
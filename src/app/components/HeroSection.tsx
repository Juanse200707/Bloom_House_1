import { motion } from "motion/react";
import { ArrowRight, Star, Truck, Leaf } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-[#f5f0e8] min-h-[92vh] flex items-center">
      {/* Background photo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[52%] h-full">
          <img
            src="https://images.unsplash.com/photo-1759374521829-d78c108c20c5?w=1080&h=900&fit=crop&auto=format"
            alt="Florista colombiana con ramos de flores"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8] via-[#f5f0e8]/60 to-transparent" />
        </div>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#b89ecf]/12 blur-3xl pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border"
              style={{
                fontFamily: "'DM Mono', monospace", fontWeight: 500,
                background: "#c9a84320", color: "#8a6e20",
                borderColor: "#c9a84340",
              }}
            >
              <Leaf size={11} /> {t("hero_badge")}
            </span>
          </div>

          <h1
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)", lineHeight: 1.15,
              letterSpacing: "-0.02em", color: "#2a1a0e",
            }}
          >
            {t("hero_title1")}{" "}
            <em style={{ color: "#7b5ea7", fontStyle: "italic" }}>{t("hero_title2")}</em>{" "}
            {t("hero_title3")}
          </h1>

          <p
            className="mb-8 max-w-md"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1.1rem", lineHeight: 1.75, color: "#7a6555" }}
          >
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => onNavigate("marketplace")}
              className="flex items-center gap-2 px-6 py-3 bg-[#7b5ea7] text-white rounded-full hover:bg-[#6a4f92] transition-all hover:shadow-lg hover:shadow-[#7b5ea7]/25 group"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}
            >
              {t("hero_cta1")}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("florists")}
              className="flex items-center gap-2 px-6 py-3 border border-[rgba(58,38,14,0.18)] text-[#2a1a0e] rounded-full hover:bg-[#ece5d8] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}
            >
              {t("hero_cta2")}
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: "240+", labelKey: "hero_stat1" as const },
              { value: "18",   labelKey: "hero_stat2" as const },
              { value: "4.9",  labelKey: "hero_stat3" as const, star: true },
            ].map((stat) => (
              <div key={stat.labelKey}>
                <div
                  className="flex items-center gap-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.65rem", color: "#2a1a0e" }}
                >
                  {stat.star && <Star size={14} className="fill-[#c9a843] text-[#c9a843]" />}
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "#7a6555" }}>
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hidden md:block" />
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#2a1a0e] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { icon: <Truck size={13} />, key: "hero_strip1" as const },
            { icon: <Leaf  size={13} />, key: "hero_strip2" as const },
            { icon: <Star  size={13} />, key: "hero_strip3" as const },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-2 text-sm" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400, opacity: 0.85 }}>
              {item.icon}{t(item.key)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

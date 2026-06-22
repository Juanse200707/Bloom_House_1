import { HeroSection } from "./HeroSection";
import { ArrowRight, Leaf, BarChart2, Truck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LanguageContext";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const FEATURED_CATEGORIES = [
  { label: "Ramos artesanales",   count: "340 productos", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=500&fit=crop&auto=format" },
  { label: "Flores para eventos", count: "128 productos", image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=400&h=500&fit=crop&auto=format" },
  { label: "Plantas y suculentas", count: "92 productos", image: "https://images.unsplash.com/photo-1585732496782-aa5e03787bfa?w=400&h=500&fit=crop&auto=format" },
  { label: "Arreglos exóticos",   count: "74 productos", image: "https://images.unsplash.com/photo-1606101083393-bded314215cd?w=400&h=500&fit=crop&auto=format" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLang();

  const howItWorks = [
    { num: "01", titleKey: "home_how_s1_t" as const, descKey: "home_how_s1_d" as const },
    { num: "02", titleKey: "home_how_s2_t" as const, descKey: "home_how_s2_d" as const },
    { num: "03", titleKey: "home_how_s3_t" as const, descKey: "home_how_s3_d" as const },
  ];

  return (
    <div className="bg-[#f5f0e8]">
      <HeroSection onNavigate={onNavigate} />

      {/* Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.8rem", color: "#2a1a0e" }}>
            {t("home_cat_title")}
          </h2>
          <button onClick={() => onNavigate("marketplace")}
            className="flex items-center gap-1 text-sm text-[#7b5ea7] hover:gap-2 transition-all"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            {t("home_cat_all")} <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_CATEGORIES.map((cat, i) => (
            <motion.button key={cat.label} onClick={() => onNavigate("marketplace")}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl aspect-[3/4] group text-left">
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a0e]/75 via-[#2a1a0e]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "white", fontSize: "1rem", lineHeight: 1.25 }}>{cat.label}</div>
                <div className="text-xs text-white/70 mt-1" style={{ fontFamily: "'Lato', sans-serif" }}>{cat.count}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-[#ede5f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.8rem", color: "#2a1a0e", marginBottom: "0.5rem" }}>
              {t("home_how_title")}
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, lineHeight: 1.7, color: "#7a6555" }}>
              {t("home_how_sub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "3.5rem", color: "#7b5ea7", opacity: 0.25, lineHeight: 1 }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem", color: "#2a1a0e", marginBottom: "0.75rem" }}>
                  {t(step.titleKey)}
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#7a6555", lineHeight: 1.7 }}>{t(step.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.8rem", color: "#2a1a0e", marginBottom: "1.5rem" }}>
              {t("home_feat_title")}{" "}
              <em style={{ color: "#7b5ea7", fontStyle: "italic" }}>{t("home_feat_em")}</em>
            </h2>
            <div className="space-y-5">
              {[
                { icon: <BarChart2 size={18} className="text-[#7b5ea7]" />, title: "Gestión inteligente de inventarios", desc: "Control centralizado del stock de todas las floristerías aliadas con alertas automáticas." },
                { icon: <Truck size={18} className="text-[#7b5ea7]" />,    title: "Red de distribución integrada",    desc: "Coordinación de despachos en tiempo real con trazabilidad completa del pedido." },
                { icon: <Users size={18} className="text-[#7b5ea7]" />,    title: "Impulso al comercio local",        desc: "Cada compra apoya directamente a un floricultor o floristería artesanal del país." },
                { icon: <Leaf size={18} className="text-[#7b5ea7]" />,     title: "100% producto nacional",          desc: "Priorizamos las variedades cultivadas en Colombia, de la tierra al ramo." },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7b5ea7]/10 flex items-center justify-center flex-shrink-0">{f.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#2a1a0e", marginBottom: "0.25rem" }}>{f.title}</div>
                    <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#7a6555", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1759374517325-1bfcdd28f1e4?w=600&h=750&fit=crop&auto=format"
                alt="Rosas colombianas" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl border border-[rgba(58,38,14,0.1)] p-4 shadow-lg">
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#7a6555", marginBottom: "0.25rem" }}>{t("home_rating")}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.8rem", color: "#7b5ea7" }}>4.9 ★</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "#7a6555" }}>{t("home_reviews")}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-[#2a1a0e]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2rem", color: "white", marginBottom: "1rem" }}>
            {t("home_cta_title")}{" "}
            <em style={{ color: "#c9a843", fontStyle: "italic" }}>{t("home_cta_em")}</em>
          </h2>
          <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {t("home_cta_sub")}
          </p>
          <button onClick={() => onNavigate("florists")}
            className="px-8 py-3.5 bg-[#7b5ea7] text-white rounded-full hover:bg-[#6a4f92] transition-colors"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            {t("home_cta_btn")}
          </button>
        </div>
      </section>
    </div>
  );
}

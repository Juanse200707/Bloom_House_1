import { useState } from "react";
import { Mail, MessageCircle, Heart, Target, Eye, FileText, Send, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { TermsModal } from "./TermsModal";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [termsOpen, setTermsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      {/* Hero */}
      <div className="bg-[#2a1a0e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>
            Sobre <em style={{ color: "#c9a843", fontStyle: "italic" }}>Bloom House</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, opacity: 0.8, lineHeight: 1.8, fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
            Una plataforma digital que nació para empoderar a los floricultores y floristerías artesanales de Colombia,
            conectándolos con el mundo a través de tecnología y distribución inteligente.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Target size={22} className="text-[#7b5ea7]" />,
              title: "Nuestra Misión",
              bg: "#ede5f5",
              accent: "#7b5ea7",
              text: "Digitalizar y potenciar el ecosistema floral colombiano mediante una plataforma de marketplace y distribución que centraliza la oferta de floristerías artesanales aliadas, gestiona inventarios compartidos y coordina la trazabilidad logística de cada despacho — priorizando siempre el producto nacional y el talento local.",
            },
            {
              icon: <Eye size={22} className="text-[#c9a843]" />,
              title: "Nuestra Visión",
              bg: "#fdf5dd",
              accent: "#c9a843",
              text: "Para 2030, ser la red de distribución floral más grande de Latinoamérica, con presencia en los 32 departamentos de Colombia y expansión a mercados vecinos, posicionando a los floricultores colombianos como referentes mundiales de calidad y biodiversidad floral.",
            },
          ].map((item) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                  {item.icon}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#2a1a0e" }}>
                  {item.title}
                </h2>
              </div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#7a6555", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Valores */}
        <div>
          <h2 className="text-center mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.7rem", color: "#2a1a0e" }}>
            Lo que nos mueve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🌸", label: "Talento local", desc: "Impulsamos a artesanos florales colombianos" },
              { emoji: "🇨🇴", label: "Producto nacional", desc: "100% flores cultivadas en suelo colombiano" },
              { emoji: "♻️", label: "Sostenibilidad", desc: "Prácticas de cultivo y distribución responsable" },
              { emoji: "🤝", label: "Comunidad", desc: "Red colaborativa de floristas y floricultores" },
            ].map((v) => (
              <motion.div key={v.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-5 text-center">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", color: "#2a1a0e", marginBottom: "0.35rem" }}>{v.label}</div>
                <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Canales de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact cards */}
          <div className="space-y-4">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "#2a1a0e", marginBottom: "1rem" }}>
              Canales de Contacto
            </h2>
            {[
              {
                icon: <MessageCircle size={20} className="text-[#5a7a4a]" />,
                label: "WhatsApp",
                value: "+57 300 123 4567",
                bg: "#edf5ea",
                href: "https://wa.me/573001234567?text=Hola%20Bloom%20House,%20tengo%20una%20consulta",
              },
              {
                icon: <Mail size={20} className="text-[#7b5ea7]" />,
                label: "Correo institucional",
                value: "hola@bloomhouse.co",
                bg: "#ede5f5",
                href: "mailto:hola@bloomhouse.co",
              },
              {
                icon: <MapPin size={20} className="text-[#c9a843]" />,
                label: "Sede principal",
                value: "Cl. 93 #15-45, Bogotá · Chapinero",
                bg: "#fdf5dd",
                href: "#",
              },
              {
                icon: <Phone size={20} className="text-[#c87850]" />,
                label: "Línea de atención",
                value: "+57 (601) 234-5678",
                bg: "#fdf0e8",
                href: "tel:+576012345678",
              },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl border border-[rgba(58,38,14,0.07)] p-4 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.bg }}>
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{c.label}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#2a1a0e", fontSize: "0.9rem" }}>{c.value}</div>
                </div>
              </a>
            ))}

            {/* Legal */}
            <button onClick={() => setTermsOpen(true)}
              className="flex items-center gap-3 w-full bg-white rounded-xl border border-[rgba(58,38,14,0.07)] p-4 hover:shadow-md transition-all text-left">
              <div className="w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-[#7a6555]" />
              </div>
              <div>
                <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>Módulo legal</div>
                <div style={{ fontFamily: "'Lato', sans-serif', fontWeight: 700, color: '#7b5ea7', fontSize: '0.9rem'" }}
                  className="text-[#7b5ea7] font-bold text-sm">
                  Términos y Condiciones →
                </div>
              </div>
            </button>
          </div>

          {/* Support form */}
          <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-6">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#2a1a0e", marginBottom: "1rem" }}>
              Formulario de Soporte
            </h3>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>Nombre completo</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 placeholder:text-[#b0a090]"
                  style={{ fontFamily: "'Lato', sans-serif" }} />
              </div>
              <div>
                <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>Correo electrónico</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 placeholder:text-[#b0a090]"
                  style={{ fontFamily: "'Lato', sans-serif" }} />
              </div>
              <div>
                <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>Mensaje</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={4}
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 resize-none placeholder:text-[#b0a090]"
                  style={{ fontFamily: "'Lato', sans-serif" }} />
              </div>
              <button type="submit"
                className="w-full py-3 bg-[#7b5ea7] text-white rounded-xl hover:bg-[#6a4f92] transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                {sent ? (
                  <>✓ Mensaje enviado</>
                ) : (
                  <><Send size={15} /> Enviar mensaje</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
}

import { useState } from "react";
import { Mail, MessageCircle, FileText, Instagram, Facebook } from "lucide-react";
import { TermsModal } from "./TermsModal";
import logoImg from "../../imports/image-1.png";

interface SiteFooterProps {
  onNavigate: (page: string) => void;
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-[#2a1a0e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img src={logoImg} alt="Bloom House" className="w-9 h-9 object-contain" />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem" }}>
              Bloom House
            </span>
          </div>
          <p className="text-sm opacity-65 leading-relaxed mb-4" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            Marketplace y red de distribución floral colombiana. Impulsamos el talento local de floristerías artesanales en todo el país.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#7b5ea7] flex items-center justify-center transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Platform links */}
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem", color: "#c9a843" }}>
            Plataforma
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: "Marketplace", page: "marketplace" },
              { label: "Floristerías aliadas", page: "florists" },
              { label: "Panel de gestión", page: "dashboard" },
              { label: "Nosotros", page: "about" },
            ].map((l) => (
              <li key={l.label}>
                <button onClick={() => onNavigate(l.page)}
                  className="text-sm opacity-65 hover:opacity-100 hover:text-[#c9a843] transition-all text-left"
                  style={{ fontFamily: "'Lato', sans-serif" }}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Institutional */}
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem", color: "#c9a843" }}>
            Institucional
          </h4>
          <ul className="space-y-2.5 text-sm opacity-65" style={{ fontFamily: "'Lato', sans-serif" }}>
            <li>
              <button onClick={() => setTermsOpen(true)}
                className="flex items-center gap-1.5 hover:opacity-100 hover:text-[#c9a843] transition-all text-left">
                <FileText size={13} /> Términos y Condiciones
              </button>
            </li>
            <li><a href="#" className="hover:opacity-100 hover:text-[#c9a843] transition-all">Política de privacidad</a></li>
            <li><a href="#" className="hover:opacity-100 hover:text-[#c9a843] transition-all">Política de devoluciones</a></li>
            <li><a href="#" className="hover:opacity-100 hover:text-[#c9a843] transition-all">Preguntas frecuentes</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem", color: "#c9a843" }}>
            Contacto
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 opacity-65 hover:opacity-100 hover:text-[#c9a843] transition-all">
                <MessageCircle size={14} />
                <span style={{ fontFamily: "'Lato', sans-serif" }}>+57 300 123 4567</span>
              </a>
            </li>
            <li>
              <a href="mailto:hola@bloomhouse.co"
                className="flex items-center gap-2 opacity-65 hover:opacity-100 hover:text-[#c9a843] transition-all">
                <Mail size={14} />
                <span style={{ fontFamily: "'Lato', sans-serif" }}>hola@bloomhouse.co</span>
              </a>
            </li>
            <li className="text-xs opacity-50 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              Lun–Vie 8:00–18:00 COT<br />
              Sáb 9:00–14:00 COT
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-45"
          style={{ fontFamily: "'DM Mono', monospace" }}>
          <span>© 2026 Bloom House S.A.S. · NIT 901.234.567-8 · Bogotá, Colombia</span>
          <span>Hecho con 🌸 para los floricultores colombianos</span>
        </div>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </footer>
  );
}

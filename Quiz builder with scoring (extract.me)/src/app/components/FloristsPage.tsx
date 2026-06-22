import { useState } from "react";
import { Star, MapPin, Phone, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const FLORISTS = [
  { id: 1, name: "Flores del Valle", owner: "Claudia Méndez", city: "Bogotá", neighborhood: "Chapinero", rating: 4.9, reviews: 312, products: 48, since: 2018, specialties: ["Ramos nupciales", "Decoración eventos", "Flores exóticas"], image: "https://images.unsplash.com/photo-1531058240690-006c446962d8?w=700&h=400&fit=crop&auto=format", avatar: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=100&h=100&fit=crop&auto=format", verified: true, deliveryTime: "2–4 horas", phone: "+57 310 234 5678", monthlyOrders: 340 },
  { id: 2, name: "La Orquídea Dorada", owner: "Hernán Ospina", city: "Medellín", neighborhood: "El Poblado", rating: 4.7, reviews: 218, products: 35, since: 2015, specialties: ["Orquídeas", "Plantas tropicales", "Arreglos corporativos"], image: "https://images.unsplash.com/photo-1585732496782-aa5e03787bfa?w=700&h=400&fit=crop&auto=format", avatar: "https://images.unsplash.com/photo-1589244159943-460088ed5c92?w=100&h=100&fit=crop&auto=format", verified: true, deliveryTime: "3–5 horas", phone: "+57 314 567 8901", monthlyOrders: 215 },
  { id: 3, name: "Casa Florentina", owner: "Valentina Torres", city: "Cali", neighborhood: "Granada", rating: 4.8, reviews: 145, products: 29, since: 2020, specialties: ["Bouquet artesanal", "Flores secas", "Ramos silvestres"], image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=700&h=400&fit=crop&auto=format", avatar: "https://images.unsplash.com/photo-1606101083393-bded314215cd?w=100&h=100&fit=crop&auto=format", verified: true, deliveryTime: "2–3 horas", phone: "+57 318 901 2345", monthlyOrders: 178 },
  { id: 4, name: "Bloom & Co", owner: "Santiago Rivas", city: "Barranquilla", neighborhood: "Alto Prado", rating: 5.0, reviews: 89, products: 22, since: 2021, specialties: ["Bodas de lujo", "Centros de mesa", "Flores de importación"], image: "https://images.unsplash.com/photo-1759374521829-d78c108c20c5?w=700&h=400&fit=crop&auto=format", avatar: "https://images.unsplash.com/photo-1759374517325-1bfcdd28f1e4?w=100&h=100&fit=crop&auto=format", verified: false, deliveryTime: "4–6 horas", phone: "+57 301 345 6789", monthlyOrders: 98 },
];

export function FloristsPage() {
  const [selected, setSelected] = useState<typeof FLORISTS[0] | null>(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <div className="relative h-64 overflow-hidden">
          <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a0e]/75 to-transparent" />
          <button onClick={() => setSelected(null)}
            className="absolute top-4 left-4 px-4 py-2 bg-white/90 rounded-full text-sm text-[#2a1a0e] hover:bg-white transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}>
            ← Volver
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2rem" }}>{selected.name}</h1>
            <div className="flex items-center gap-2 text-sm opacity-85" style={{ fontFamily: "'Lato', sans-serif" }}>
              <MapPin size={12} /> {selected.neighborhood}, {selected.city}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.08)] p-6">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.15rem", marginBottom: "1rem", color: "#2a1a0e" }}>
                Sobre la floristería
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <img src={selected.avatar} alt={selected.owner} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#2a1a0e" }}>{selected.owner}</div>
                  <div className="text-sm text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>Propietaria · Desde {selected.since}</div>
                </div>
                {selected.verified && <CheckCircle size={16} className="text-[#7b5ea7] ml-auto" />}
              </div>
              <div className="flex flex-wrap gap-2">
                {selected.specialties.map((s) => (
                  <span key={s} className="px-3 py-1 bg-[#ede5f5] rounded-full text-sm text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{s}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.08)] p-6">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.15rem", marginBottom: "1rem", color: "#2a1a0e" }}>
                Estadísticas de desempeño
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: selected.monthlyOrders, label: "Pedidos/mes" },
                  { value: selected.products, label: "Productos activos" },
                  { value: `${selected.rating}★`, label: "Calificación" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#ede5f5] rounded-xl p-4">
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#7b5ea7" }}>{stat.value}</div>
                    <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.08)] p-5">
              <h3 style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#2a1a0e", marginBottom: "0.75rem" }}>Contacto</h3>
              <div className="space-y-3 text-sm text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>
                <div className="flex items-center gap-2"><Phone size={13} />{selected.phone}</div>
                <div className="flex items-center gap-2"><Clock size={13} />Entrega: {selected.deliveryTime}</div>
                <div className="flex items-center gap-2"><MapPin size={13} />{selected.city}</div>
              </div>
            </div>
            <button className="w-full py-3 bg-[#7b5ea7] text-white rounded-full hover:bg-[#6a4f92] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
              Ver productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="bg-[#2a1a0e] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.2rem", marginBottom: "0.4rem" }}>
            Floristerías Aliadas
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, opacity: 0.75 }}>
            {FLORISTS.length} floristerías artesanales verificadas en toda Colombia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FLORISTS.map((f, i) => (
          <motion.div key={f.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] overflow-hidden hover:shadow-lg hover:shadow-[#7b5ea7]/10 transition-all cursor-pointer group"
            onClick={() => setSelected(f)}>
            <div className="relative h-44 overflow-hidden">
              <img src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a0e]/50 to-transparent" />
              {f.verified && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-white/90 rounded-full text-[11px] text-[#7b5ea7]"
                  style={{ fontFamily: "'DM Mono', monospace" }}>
                  <CheckCircle size={10} /> Verificada
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#2a1a0e" }}>{f.name}</h3>
                  <div className="flex items-center gap-1 text-[#7a6555] text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                    <MapPin size={11} />{f.neighborhood}, {f.city}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-[#c9a843] text-[#c9a843]" />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.83rem", color: "#2a1a0e" }}>{f.rating}</span>
                  <span className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>({f.reviews})</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {f.specialties.slice(0, 2).map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-[#ede5f5] rounded-full text-[11px] text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>
                <span>{f.products} productos · Desde {f.since}</span>
                <ChevronRight size={15} className="text-[#7b5ea7] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

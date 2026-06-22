import { useState } from "react";
import { X, Star, ShoppingCart, MapPin, Leaf, Droplets, Sun, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ProductFull {
  id: number;
  name: string;
  florist: string;
  city: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
  inStock: boolean;
  // extended
  images?: string[];
  flowerType?: string;
  origin?: string;
  description?: string;
  careTips?: { icon: React.ReactNode; label: string; text: string }[];
  customerReviews?: { name: string; rating: number; text: string; date: string; avatar: string }[];
}

const DEFAULT_TIPS = [
  { icon: <Droplets size={16} />, label: "Hidratación", text: "Cambia el agua cada 2 días y corta los tallos en diagonal para mayor absorción." },
  { icon: <Sun size={16} />,      label: "Luz",         text: "Mantén en un lugar con luz indirecta, lejos de corrientes de aire frío." },
  { icon: <Leaf size={16} />,     label: "Temperatura", text: "Temperatura ideal entre 15°C y 22°C. Evita el calor directo del sol." },
];

const SAMPLE_REVIEWS = [
  { name: "Valentina M.", rating: 5, text: "Las flores llegaron frescas y hermosas, exactamente como en la foto. Superaron mis expectativas.", date: "05 Jun 2026", avatar: "VM" },
  { name: "Jorge A.",     rating: 5, text: "Excelente servicio, el arreglo era para un cumpleaños y a mi mamá le encantó. Muy recomendado.", date: "02 Jun 2026", avatar: "JA" },
  { name: "Lucía P.",     rating: 4, text: "Bonitas flores, aunque el empaque llegó un poco arrugado. El producto en sí es de muy buena calidad.", date: "28 May 2026", avatar: "LP" },
];

interface ProductDetailProps {
  product: ProductFull | null;
  onClose: () => void;
  onAddToCart: (p: ProductFull) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  const images = product?.images ?? (product ? [product.image] : []);
  const tips = product?.careTips ?? DEFAULT_TIPS;
  const customerReviews = product?.customerReviews ?? SAMPLE_REVIEWS;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#f5f0e8] z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Close bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[rgba(58,38,14,0.08)] flex-shrink-0">
              <button onClick={onClose} className="flex items-center gap-1.5 text-sm text-[#7a6555] hover:text-[#2a1a0e] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}>
                <X size={16} /> Cerrar
              </button>
              <span className="text-xs text-[#7a6555]" style={{ fontFamily: "'DM Mono', monospace" }}>
                {product.category} · {product.florist}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Image gallery */}
              <div className="relative bg-[#ede5f5] aspect-[4/3] overflow-hidden flex-shrink-0">
                <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />

                {images.length > 1 && (
                  <>
                    <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setImgIdx(i)}
                          className="w-1.5 h-1.5 rounded-full transition-all"
                          style={{ background: i === imgIdx ? "#7b5ea7" : "rgba(255,255,255,0.6)" }} />
                      ))}
                    </div>
                  </>
                )}

                {product.badge && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs bg-[#7b5ea7] text-white"
                    style={{ fontFamily: "'DM Mono', monospace" }}>{product.badge}</span>
                )}
                <button onClick={() => setWishlist(w => !w)}
                  className="absolute top-3 right-3 p-2 bg-white/85 rounded-full hover:bg-white transition-colors">
                  <Heart size={16} className={wishlist ? "fill-[#c9a843] text-[#c9a843]" : "text-[#7a6555]"} />
                </button>
              </div>

              <div className="px-5 py-5 space-y-6">
                {/* Main block */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "#2a1a0e", lineHeight: 1.25 }}>
                      {product.name}
                    </h2>
                    <div className="text-right flex-shrink-0">
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "#2a1a0e" }}>
                        ${product.price.toLocaleString("es-CO")}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-[#7a6555] line-through" style={{ fontFamily: "'DM Mono', monospace" }}>
                          ${product.originalPrice.toLocaleString("es-CO")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={13}
                          className={s <= Math.round(product.rating) ? "fill-[#c9a843] text-[#c9a843]" : "text-[#ddd]"} />
                      ))}
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: "#7a6555" }}>
                      {product.rating} ({product.reviews} reseñas)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin size={13} className="text-[#7a6555]" />
                    <span className="text-sm text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>
                      {product.florist} · {product.city}
                    </span>
                  </div>

                  {product.description && (
                    <p className="text-sm text-[#7a6555] leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                      {product.description}
                    </p>
                  )}

                  <button
                    disabled={!product.inStock}
                    onClick={() => { onAddToCart(product); onClose(); }}
                    className="w-full mt-4 py-3 bg-[#7b5ea7] text-white rounded-xl hover:bg-[#6a4f92] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    <ShoppingCart size={16} />
                    {product.inStock ? "Añadir al carrito" : "Sin stock disponible"}
                  </button>
                </div>

                {/* Ficha técnica */}
                <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-4">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#2a1a0e", marginBottom: "0.75rem" }}>
                    Ficha Técnica
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Tipo de flor", value: product.flowerType ?? "Variedad mixta colombiana" },
                      { label: "Origen del cultivo", value: product.origin ?? `Sabana de Bogotá, Colombia` },
                      { label: "Categoría", value: product.category },
                      { label: "Floristería", value: product.florist },
                      { label: "Ciudad de despacho", value: product.city },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-sm gap-2">
                        <span className="text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{row.label}</span>
                        <span className="text-right text-[#2a1a0e]" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips de cuidado */}
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#2a1a0e", marginBottom: "0.75rem" }}>
                    Tips de Cuidado Floral
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {tips.map((tip, i) => (
                      <div key={i} className="flex gap-3 bg-white rounded-xl border border-[rgba(58,38,14,0.07)] p-3">
                        <div className="w-8 h-8 rounded-lg bg-[#ede5f5] text-[#7b5ea7] flex items-center justify-center flex-shrink-0">
                          {tip.icon}
                        </div>
                        <div>
                          <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#2a1a0e" }}>{tip.label}</div>
                          <div className="text-xs text-[#7a6555] leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>{tip.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#2a1a0e" }}>
                      Comentarios y Reseñas
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-[#c9a843] text-[#c9a843]" />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: "#2a1a0e" }}>{product.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {customerReviews.map((rev, i) => (
                      <div key={i} className="bg-white rounded-xl border border-[rgba(58,38,14,0.07)] p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#7b5ea7] text-white flex items-center justify-center text-xs flex-shrink-0"
                            style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>
                            {rev.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1a0e" }}>{rev.name}</div>
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} size={10} className={s <= rev.rating ? "fill-[#c9a843] text-[#c9a843]" : "text-[#ddd]"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] text-[#b0a090]" style={{ fontFamily: "'DM Mono', monospace" }}>{rev.date}</span>
                        </div>
                        <p className="text-xs text-[#7a6555] leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>{rev.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-4" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

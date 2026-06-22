import { useState } from "react";
import { Search, Star, Heart, ShoppingCart, MapPin, Droplets, Sun, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { ProductDetail, type ProductFull } from "./ProductDetail";

const PRODUCTS: ProductFull[] = [
  {
    id: 1, name: "Ramo de Rosas Rojas Premium", florist: "Flores del Valle", city: "Bogotá",
    price: 85000, originalPrice: 110000, rating: 4.9, reviews: 128,
    image: "https://images.unsplash.com/photo-1759374517325-1bfcdd28f1e4?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1759374517325-1bfcdd28f1e4?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1727965201052-1519a4660735?w=600&h=600&fit=crop&auto=format",
    ],
    category: "Ramos", badge: "Más vendido", inStock: true,
    flowerType: "Rosa (Rosa × hybrida) — variedad Freedom",
    origin: "Sabana de Bogotá, Cundinamarca",
    description: "Exquisito ramo de 24 rosas rojas de la variedad Freedom, cultivadas a 2.600 m de altitud en la Sabana de Bogotá. Su intenso color y largo tallo las convierten en el regalo perfecto para expresar amor y pasión.",
    careTips: [
      { icon: <Droplets size={16} />, label: "Hidratación", text: "Cambia el agua cada 2 días y corta los tallos 2 cm en diagonal para mayor absorción." },
      { icon: <Sun size={16} />,      label: "Luz",         text: "Luz indirecta, lejos de corrientes de aire frío y calefacción directa." },
      { icon: <Leaf size={16} />,     label: "Durabilidad", text: "Con los cuidados correctos, estas rosas duran entre 7 y 12 días en jarrón." },
    ],
  },
  {
    id: 2, name: "Arreglo Tropical Silvestre", florist: "La Orquídea Dorada", city: "Medellín",
    price: 65000, rating: 4.7, reviews: 84,
    image: "https://images.unsplash.com/photo-1606101083393-bded314215cd?w=600&h=600&fit=crop&auto=format",
    category: "Arreglos", inStock: true,
    flowerType: "Orquídea Cattleya trianae + Heliconias",
    origin: "Antioquia y Eje Cafetero, Colombia",
    description: "Arreglo silvestre con flores tropicales nativas de Colombia. Incluye heliconias, orquídeas y follaje exótico del Eje Cafetero, creando una composición vibrante con carácter colombiano.",
  },
  {
    id: 3, name: "Bouquet Primavera Pastel", florist: "Casa Florentina", city: "Cali",
    price: 72000, rating: 4.8, reviews: 56,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop&auto=format",
    category: "Ramos", badge: "Nuevo", inStock: true,
    flowerType: "Rosas Garden + Lisianthus + Ranúnculos",
    origin: "Valle del Cauca, Colombia",
    description: "Bouquet artesanal de tonos pastel que combina rosas garden rosadas, lisianthus blancos y ranúnculos lavanda. Ideal para baby shower, cumpleaños femeninos y celebraciones de primavera.",
  },
  {
    id: 4, name: "Corona Fúnebre Clásica", florist: "Flores del Valle", city: "Bogotá",
    price: 180000, rating: 4.9, reviews: 201,
    image: "https://images.unsplash.com/photo-1589244159943-460088ed5c92?w=600&h=600&fit=crop&auto=format",
    category: "Coronas", inStock: true,
    flowerType: "Crisantemos blancos + Rosas + Gladiolos",
    origin: "Cundinamarca y Boyacá, Colombia",
    description: "Corona fúnebre de diseño clásico y elegante elaborada con flores frescas de cultivos nacionales. Disponible en tamaños estándar y extra-grande con mensaje personalizado incluido.",
  },
  {
    id: 5, name: "Centro de Mesa Bodas", florist: "Bloom & Co", city: "Barranquilla",
    price: 150000, originalPrice: 190000, rating: 5.0, reviews: 43,
    image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=600&h=600&fit=crop&auto=format",
    category: "Eventos", badge: "Oferta", inStock: true,
    flowerType: "Peonías + Rosas Avalanche + Eucalipto",
    origin: "Sabana de Bogotá + Importadas",
    description: "Centro de mesa de alto impacto visual para bodas y eventos. Composición en altura con peonías, rosas avalanche y eucalipto plateado. Precio por unidad; descuento por volumen disponible.",
  },
  {
    id: 6, name: "Rosas Ecuatorianas XL", florist: "La Orquídea Dorada", city: "Medellín",
    price: 95000, rating: 4.6, reviews: 37,
    image: "https://images.unsplash.com/photo-1727965201052-1519a4660735?w=600&h=600&fit=crop&auto=format",
    category: "Ramos", inStock: false,
    flowerType: "Rosa (Rosa × hybrida) — variedad Explorer",
    origin: "Cundinamarca, Colombia",
    description: "Ramo de 12 rosas de tallo extra-largo (80 cm), de la variedad Explorer cultivada en las alturas de Cundinamarca. Su follaje denso y botones grandes las hacen ideales para arreglos de lujo.",
  },
  {
    id: 7, name: "Jardín Miniatura Suculentas", florist: "Verde Vivo", city: "Manizales",
    price: 48000, rating: 4.5, reviews: 92,
    image: "https://images.unsplash.com/photo-1585732496782-aa5e03787bfa?w=600&h=600&fit=crop&auto=format",
    category: "Plantas", inStock: true,
    flowerType: "Echeveria, Sedum, Haworthia y Aloe",
    origin: "Viveros del Eje Cafetero, Colombia",
    description: "Jardín de suculentas en maceta de barro artesanal con 5 variedades distintas. Bajo mantenimiento, larga vida y excelente opción de regalo para quienes no tienen experiencia con plantas.",
  },
  {
    id: 8, name: "Ramo Silvestre Colombiano", florist: "Flor de Páramo", city: "Tunja",
    price: 55000, rating: 4.8, reviews: 61,
    image: "https://images.unsplash.com/photo-1531058240690-006c446962d8?w=600&h=600&fit=crop&auto=format",
    category: "Ramos", inStock: true,
    flowerType: "Frailejón + Flores de páramo mixtas",
    origin: "Páramo de Rabanal, Boyacá",
    description: "Ramo silvestre inspirado en los paisajes del páramo boyacense, con flores nativas recolectadas de forma sostenible. Una pieza única que celebra la biodiversidad del ecosistema de alta montaña colombiano.",
  },
];

const CATEGORIES = ["Todos", "Ramos", "Arreglos", "Coronas", "Eventos", "Plantas"];
const CITIES = ["Todas", "Bogotá", "Medellín", "Cali", "Barranquilla", "Manizales", "Tunja"];

const BADGE_STYLE: Record<string, { bg: string; color: string }> = {
  "Más vendido": { bg: "#5a7a4a", color: "#fff" },
  "Nuevo":       { bg: "#7b5ea7", color: "#fff" },
  "Oferta":      { bg: "#c9a843", color: "#2a1a0e" },
};

export function MarketplacePage({ onAddToCart }: { onAddToCart: (p: ProductFull) => void }) {
  const [category, setCategory]         = useState("Todos");
  const [city, setCity]                 = useState("Todas");
  const [search, setSearch]             = useState("");
  const [sort, setSort]                 = useState("popular");
  const [wishlist, setWishlist]         = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductFull | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    if (category !== "Todos" && p.category !== category) return false;
    if (city !== "Todas" && p.city !== city) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.florist.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <div className="bg-[#2a1a0e] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.2rem", marginBottom: "0.4rem" }}>
            Marketplace de Flores
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, opacity: 0.75 }}>
            {PRODUCTS.length} productos · {new Set(PRODUCTS.map(p => p.florist)).size} floristerías colombianas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center bg-white border border-[rgba(58,38,14,0.1)] rounded-full px-4 py-2 gap-2 flex-1 min-w-[200px]">
            <Search size={14} className="text-[#7a6555]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar flores, floristerías..."
              className="bg-transparent outline-none text-sm flex-1 text-[#2a1a0e] placeholder:text-[#7a6555]"
              style={{ fontFamily: "'Lato', sans-serif" }} />
          </div>
          <select value={city} onChange={(e) => setCity(e.target.value)}
            className="bg-white border border-[rgba(58,38,14,0.1)] rounded-full px-4 py-2 text-sm text-[#2a1a0e] outline-none cursor-pointer"
            style={{ fontFamily: "'Lato', sans-serif" }}>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-[rgba(58,38,14,0.1)] rounded-full px-4 py-2 text-sm text-[#2a1a0e] outline-none cursor-pointer"
            style={{ fontFamily: "'Lato', sans-serif" }}>
            <option value="popular">Más populares</option>
            <option value="rating">Mejor calificados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                category === cat
                  ? "bg-[#7b5ea7] text-white border-[#7b5ea7]"
                  : "bg-white border-[rgba(58,38,14,0.12)] text-[#7a6555] hover:border-[#7b5ea7] hover:text-[#7b5ea7]"
              }`}
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: category === cat ? 700 : 400 }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => {
            const badge = product.badge ? BADGE_STYLE[product.badge] : null;
            return (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden border border-[rgba(58,38,14,0.07)] hover:shadow-lg hover:shadow-[#7b5ea7]/10 transition-all group cursor-pointer"
                onClick={() => setSelectedProduct(product)}>
                <div className="relative aspect-square overflow-hidden bg-[#ede5f5]">
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px]"
                      style={{ background: badge.bg, color: badge.color, fontFamily: "'DM Mono', monospace" }}>
                      {product.badge}
                    </span>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="text-sm text-[#7a6555]" style={{ fontFamily: "'DM Mono', monospace" }}>Agotado</span>
                    </div>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setWishlist(prev => prev.includes(product.id) ? prev.filter(x => x !== product.id) : [...prev, product.id]); }}
                    className="absolute top-2 right-2 p-1.5 bg-white/85 rounded-full hover:bg-white transition-colors">
                    <Heart size={13} className={wishlist.includes(product.id) ? "fill-[#c9a843] text-[#c9a843]" : "text-[#7a6555]"} />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin size={10} className="text-[#7a6555]" />
                    <span className="text-[11px] text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>
                      {product.florist} · {product.city}
                    </span>
                  </div>
                  <h3 className="mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "0.88rem", color: "#2a1a0e" }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star size={11} className="fill-[#c9a843] text-[#c9a843]" />
                    <span className="text-[11px] text-[#7a6555]" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.98rem", color: "#2a1a0e" }}>
                        ${product.price.toLocaleString("es-CO")}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-[#7a6555] line-through" style={{ fontFamily: "'DM Mono', monospace" }}>
                          ${product.originalPrice.toLocaleString("es-CO")}
                        </div>
                      )}
                    </div>
                    <button disabled={!product.inStock}
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="p-2 rounded-full bg-[#7b5ea7] text-white hover:bg-[#6a4f92] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      <ShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>
            No se encontraron productos con los filtros seleccionados.
          </div>
        )}
      </div>

      {/* Product Detail slide-over */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

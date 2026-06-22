import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartItem {
  id: number; name: string; florist: string;
  price: number; image: string; qty: number;
}

interface CartDrawerProps {
  open: boolean; onClose: () => void;
  items: CartItem[];
  onUpdate: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export function CartDrawer({ open, onClose, items, onUpdate, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/30 z-50" />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#f5f0e8] z-50 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(58,38,14,0.1)]">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.25rem", color: "#2a1a0e" }}>
                Mi Carrito
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[#ece5d8] transition-colors">
                <X size={18} className="text-[#7a6555]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#ede5f5] flex items-center justify-center">
                    <ShoppingCart size={28} className="text-[#7b5ea7]" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#2a1a0e", fontSize: "1.05rem" }}>
                      Tu carrito está vacío
                    </div>
                    <div className="text-sm text-[#7a6555] mt-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                      Agrega flores del marketplace
                    </div>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-white rounded-xl border border-[rgba(58,38,14,0.08)] p-3">
                    <img src={item.image} alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-[#ede5f5]" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-snug mb-0.5" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#2a1a0e" }}>
                        {item.name}
                      </div>
                      <div className="text-xs text-[#7a6555] mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                        {item.florist}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button onClick={() => item.qty > 1 ? onUpdate(item.id, item.qty - 1) : onRemove(item.id)}
                            className="w-6 h-6 rounded-full border border-[rgba(58,38,14,0.15)] flex items-center justify-center hover:bg-[#ede5f5] transition-colors">
                            <Minus size={10} />
                          </button>
                          <span className="w-6 text-center text-sm" style={{ fontFamily: "'DM Mono', monospace" }}>{item.qty}</span>
                          <button onClick={() => onUpdate(item.id, item.qty + 1)}
                            className="w-6 h-6 rounded-full border border-[rgba(58,38,14,0.15)] flex items-center justify-center hover:bg-[#ede5f5] transition-colors">
                            <Plus size={10} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, color: "#2a1a0e", fontSize: "0.85rem" }}>
                            ${(item.price * item.qty).toLocaleString("es-CO")}
                          </span>
                          <button onClick={() => onRemove(item.id)} className="text-[#c84848] hover:opacity-70 transition-opacity">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[rgba(58,38,14,0.1)] px-5 py-5 space-y-3">
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Lato', sans-serif", color: "#7a6555" }}>Subtotal</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", color: "#2a1a0e" }}>${total.toLocaleString("es-CO")}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Lato', sans-serif", color: "#7a6555" }}>Domicilio</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", color: "#5a7a4a" }}>Gratis</span>
                </div>
                <div className="h-px bg-[rgba(58,38,14,0.1)]" />
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2a1a0e" }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#2a1a0e" }}>
                    ${total.toLocaleString("es-CO")}
                  </span>
                </div>
                <button className="w-full py-3 bg-[#7b5ea7] text-white rounded-full hover:bg-[#6a4f92] transition-colors"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                  Finalizar pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

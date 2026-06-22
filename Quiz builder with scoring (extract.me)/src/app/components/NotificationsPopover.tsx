import { useEffect, useRef } from "react";
import { Bell, X, Truck, AlertTriangle, CheckCircle, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
  id: number;
  type: "dispatch" | "stock" | "delivered" | "order";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: "dispatch",  title: "Pedido despachado",         body: "Tu pedido BH-2847 ha sido entregado al repartidor.",      time: "hace 10 min", read: false },
  { id: 2, type: "delivered", title: "Entrega confirmada",        body: "El pedido BH-2844 fue entregado exitosamente.",           time: "hace 1 hora",  read: false },
  { id: 3, type: "stock",     title: "Alerta de stock mínimo",    body: "Orquídeas Moradas en Flores del Valle: 5 unidades.",      time: "hace 2 horas", read: true  },
  { id: 4, type: "order",     title: "Nuevo pedido recibido",     body: "Centro de Mesa Bodas — Bloom & Co — $150.000 COP.",       time: "hace 3 horas", read: true  },
  { id: 5, type: "stock",     title: "Alerta de stock mínimo",    body: "Girasoles Colombianos en Casa Florentina: 3 unidades.",   time: "ayer",         read: true  },
];

const TYPE_CONFIG = {
  dispatch:  { icon: <Truck size={14} />,          color: "#c9a843", bg: "#fdf5dd" },
  delivered: { icon: <CheckCircle size={14} />,    color: "#5a7a4a", bg: "#edf5ea" },
  stock:     { icon: <AlertTriangle size={14} />,  color: "#c84848", bg: "#fff4f4" },
  order:     { icon: <Package size={14} />,         color: "#7b5ea7", bg: "#ede5f5" },
};

interface NotificationsPopoverProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPopover({ open, onClose }: NotificationsPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <div className="relative" ref={ref}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-2 w-80 bg-white rounded-2xl shadow-xl border border-[rgba(58,38,14,0.1)] overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(58,38,14,0.08)]">
              <div className="flex items-center gap-2">
                <Bell size={15} className="text-[#7b5ea7]" />
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", color: "#2a1a0e" }}>
                  Notificaciones
                </span>
                {unread > 0 && (
                  <span className="w-5 h-5 bg-[#7b5ea7] rounded-full flex items-center justify-center text-white text-[10px]"
                    style={{ fontFamily: "'DM Mono', monospace" }}>
                    {unread}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-[#f5f0e8] transition-colors">
                <X size={13} className="text-[#7a6555]" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {NOTIFICATIONS.map((n) => {
                const cfg = TYPE_CONFIG[n.type];
                return (
                  <div key={n.id}
                    className={`flex gap-3 px-4 py-3 border-b border-[rgba(58,38,14,0.05)] last:border-0 ${!n.read ? "bg-[#faf8ff]" : ""}`}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#2a1a0e" }}>
                          {n.title}
                        </span>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#7b5ea7] flex-shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-xs text-[#7a6555] leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>{n.body}</p>
                      <span className="text-[10px] text-[#b0a090]" style={{ fontFamily: "'DM Mono', monospace" }}>{n.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-4 py-2.5 border-t border-[rgba(58,38,14,0.06)]">
              <button className="w-full text-center text-xs text-[#7b5ea7] hover:text-[#6a4f92] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                Ver todas las notificaciones
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface BellButtonProps {
  onClick: () => void;
}

export function BellButton({ onClick }: BellButtonProps) {
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  return (
    <button onClick={onClick}
      className="relative p-2 rounded-full hover:bg-[#ece5d8] transition-colors text-[#7a6555] hover:text-[#2a1a0e]">
      <Bell size={17} />
      {unread > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c84848] rounded-full flex items-center justify-center text-white text-[9px]"
          style={{ fontFamily: "'DM Mono', monospace" }}>
          {unread}
        </span>
      )}
    </button>
  );
}

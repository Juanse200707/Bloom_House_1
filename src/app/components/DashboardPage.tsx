import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Package, TrendingUp, Store, Truck, Bell, CheckCircle, Clock, AlertCircle } from "lucide-react";

const MONTHLY_SALES = [
  { mes: "Ene", ventas: 8200000 }, { mes: "Feb", ventas: 11500000 },
  { mes: "Mar", ventas: 14200000 }, { mes: "Abr", ventas: 12800000 },
  { mes: "May", ventas: 18600000 }, { mes: "Jun", ventas: 22100000 },
];

const CATEGORY_DATA = [
  { name: "Ramos", value: 42, color: "#7b5ea7" },
  { name: "Arreglos", value: 28, color: "#c9a843" },
  { name: "Eventos", value: 18, color: "#5a7a4a" },
  { name: "Plantas", value: 12, color: "#b89ecf" },
];

const RECENT_ORDERS = [
  { id: "BH-2847", customer: "María Camila Ruiz", product: "Ramo de Rosas Premium", florist: "Flores del Valle", amount: 85000, status: "entregado", date: "09 Jun" },
  { id: "BH-2846", customer: "Jorge Andrés López", product: "Arreglo Tropical Silvestre", florist: "La Orquídea Dorada", amount: 65000, status: "en camino", date: "09 Jun" },
  { id: "BH-2845", customer: "Ana Sofía García", product: "Centro de Mesa Bodas", florist: "Bloom & Co", amount: 150000, status: "preparando", date: "09 Jun" },
  { id: "BH-2844", customer: "Pedro Hernández", product: "Bouquet Primavera", florist: "Casa Florentina", amount: 72000, status: "entregado", date: "08 Jun" },
  { id: "BH-2843", customer: "Lucia Morales", product: "Jardín Suculentas", florist: "Verde Vivo", amount: 48000, status: "cancelado", date: "08 Jun" },
];

const INVENTORY_ALERTS = [
  { product: "Rosas Rojas Premium", florist: "Flores del Valle", stock: 12, threshold: 20 },
  { product: "Orquídeas Moradas", florist: "La Orquídea Dorada", stock: 5, threshold: 15 },
  { product: "Girasoles Colombianos", florist: "Casa Florentina", stock: 3, threshold: 10 },
];

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  "entregado":  { color: "#5a7a4a", icon: <CheckCircle size={12} />, label: "Entregado" },
  "en camino":  { color: "#c9a843", icon: <Truck size={12} />,       label: "En camino" },
  "preparando": { color: "#7b5ea7", icon: <Clock size={12} />,       label: "Preparando" },
  "cancelado":  { color: "#c84848", icon: <AlertCircle size={12} />, label: "Cancelado" },
};

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Resumen" },
    { id: "orders",   label: "Pedidos" },
    { id: "inventory", label: "Inventarios" },
    { id: "distribution", label: "Distribución" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Top bar */}
      <div className="bg-white border-b border-[rgba(58,38,14,0.08)] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#2a1a0e" }}>
              Panel de Control
            </h1>
            <p className="text-sm text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>Bloom House · Junio 2026</p>
          </div>
          <button className="relative p-2 rounded-full hover:bg-[#ece5d8] transition-colors">
            <Bell size={18} className="text-[#7a6555]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a843] rounded-full" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab bar */}
        <div className="flex gap-1 bg-white rounded-xl border border-[rgba(58,38,14,0.08)] p-1 mb-6 w-fit">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === t.id ? "bg-[#7b5ea7] text-white shadow-sm" : "text-[#7a6555] hover:text-[#2a1a0e]"}`}
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: activeTab === t.id ? 700 : 400 }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Ventas este mes", value: "$22.1M", change: "+19%", icon: <TrendingUp size={18} />, color: "#7b5ea7" },
                { label: "Pedidos activos", value: "263",    change: "+12%", icon: <Package size={18} />,    color: "#c9a843" },
                { label: "Floristerías activas", value: "240", change: "+8%", icon: <Store size={18} />,    color: "#5a7a4a" },
                { label: "Despachos en curso",   value: "34",  change: "-3%", icon: <Truck size={18} />,    color: "#c87850" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl" style={{ background: kpi.color + "18", color: kpi.color }}>{kpi.icon}</div>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: kpi.change.startsWith("+") ? "#5a7a4a18" : "#c8484818", color: kpi.change.startsWith("+") ? "#5a7a4a" : "#c84848", fontFamily: "'DM Mono', monospace" }}>
                      {kpi.change}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1a0e" }}>{kpi.value}</div>
                  <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{kpi.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-6">
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.05rem", color: "#2a1a0e", marginBottom: "1.25rem" }}>
                  Ventas mensuales (COP)
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={MONTHLY_SALES} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(58,38,14,0.06)" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fill: "#7a6555" }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} tick={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fill: "#7a6555" }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`$${v.toLocaleString("es-CO")}`, "Ventas"]}
                      contentStyle={{ fontFamily: "'Lato', sans-serif", borderRadius: 12, border: "1px solid rgba(58,38,14,0.1)", fontSize: 12 }} />
                    <Bar dataKey="ventas" fill="#7b5ea7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-6">
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.05rem", color: "#2a1a0e", marginBottom: "1.25rem" }}>
                  Por categoría
                </h3>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ fontFamily: "'Lato', sans-serif", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {CATEGORY_DATA.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                        <span style={{ fontFamily: "'Lato', sans-serif", color: "#7a6555" }}>{c.name}</span>
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", color: "#2a1a0e", fontSize: "0.78rem" }}>{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-6">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.05rem", color: "#2a1a0e", marginBottom: "1rem" }}>
                Alertas de Inventario
              </h3>
              <div className="space-y-3">
                {INVENTORY_ALERTS.map((a) => (
                  <div key={a.product} className="flex items-center justify-between p-3 bg-[#fff4f4] border border-[#c84848]/15 rounded-xl">
                    <div>
                      <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#2a1a0e" }}>{a.product}</div>
                      <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{a.florist}</div>
                    </div>
                    <div className="text-right">
                      <div style={{ fontFamily: "'DM Mono', monospace", color: "#c84848", fontWeight: 500 }}>{a.stock} unidades</div>
                      <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>mín: {a.threshold}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] overflow-hidden">
            <div className="p-5 border-b border-[rgba(58,38,14,0.07)]">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.1rem", color: "#2a1a0e" }}>Pedidos Recientes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(58,38,14,0.06)]">
                    {["ID", "Cliente", "Producto", "Floristería", "Total", "Estado", "Fecha"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs text-[#7a6555] whitespace-nowrap" style={{ fontFamily: "'DM Mono', monospace" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order) => {
                    const s = STATUS_CONFIG[order.status];
                    return (
                      <tr key={order.id} className="border-b border-[rgba(58,38,14,0.04)] hover:bg-[#f5f0e8] transition-colors">
                        <td className="px-4 py-3 text-sm" style={{ fontFamily: "'DM Mono', monospace", color: "#7a6555" }}>{order.id}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap" style={{ fontFamily: "'Lato', sans-serif", color: "#2a1a0e" }}>{order.customer}</td>
                        <td className="px-4 py-3 text-sm text-[#7a6555] whitespace-nowrap" style={{ fontFamily: "'Lato', sans-serif" }}>{order.product}</td>
                        <td className="px-4 py-3 text-sm text-[#7a6555] whitespace-nowrap" style={{ fontFamily: "'Lato', sans-serif" }}>{order.florist}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap" style={{ fontFamily: "'DM Mono', monospace", color: "#2a1a0e" }}>${order.amount.toLocaleString("es-CO")}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full w-fit whitespace-nowrap"
                            style={{ background: s.color + "18", color: s.color, fontFamily: "'Lato', sans-serif" }}>
                            {s.icon}{s.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#7a6555] whitespace-nowrap" style={{ fontFamily: "'DM Mono', monospace" }}>{order.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── INVENTORY ── */}
        {activeTab === "inventory" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "SKUs totales", value: "1,284", color: "#7b5ea7" },
                { label: "Stock crítico", value: "23",    color: "#c84848" },
                { label: "Rotación 30d",  value: "78%",  color: "#c9a843" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-5 text-center">
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2rem", color: s.color }}>{s.value}</div>
                  <div className="text-sm text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-6">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.05rem", color: "#2a1a0e", marginBottom: "1rem" }}>
                Productos con stock crítico
              </h3>
              <div className="space-y-4">
                {INVENTORY_ALERTS.map((a) => {
                  const pct = Math.round((a.stock / a.threshold) * 100);
                  return (
                    <div key={a.product} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span style={{ fontFamily: "'Lato', sans-serif", color: "#2a1a0e" }}>{a.product} <span className="text-[#7a6555]">· {a.florist}</span></span>
                        <span style={{ fontFamily: "'DM Mono', monospace", color: "#c84848", fontSize: "0.78rem" }}>{a.stock}/{a.threshold}</span>
                      </div>
                      <div className="h-1.5 bg-[#ece5d8] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c84848] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── DISTRIBUTION ── */}
        {activeTab === "distribution" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { city: "Bogotá",       orders: 142, time: "2.4h", drivers: 18 },
                { city: "Medellín",     orders: 67,  time: "3.1h", drivers: 8 },
                { city: "Cali",         orders: 38,  time: "2.8h", drivers: 5 },
                { city: "Barranquilla", orders: 16,  time: "4.2h", drivers: 3 },
              ].map((c) => (
                <div key={c.city} className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-5">
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#2a1a0e", marginBottom: "0.75rem" }}>{c.city}</div>
                  {[
                    { label: "Pedidos activos", val: c.orders,  color: "#7b5ea7" },
                    { label: "Tiempo promedio", val: c.time,    color: "#c9a843" },
                    { label: "Repartidores",    val: c.drivers, color: "#2a1a0e" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{row.label}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", color: row.color }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[rgba(58,38,14,0.07)] p-6">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.05rem", color: "#2a1a0e", marginBottom: "1rem" }}>
                Trazabilidad de despachos en tiempo real
              </h3>
              <div className="space-y-3">
                {[
                  { id: "DSP-9021", from: "Flores del Valle, Bogotá",      to: "Cl. 127 #14-32, Bogotá",        driver: "Carlos Vélez", status: "En camino",  eta: "14:35" },
                  { id: "DSP-9020", from: "La Orquídea Dorada, Medellín",  to: "Cra. 43A #6-15, Medellín",      driver: "Ana Ríos",     status: "Entregado",  eta: "—" },
                  { id: "DSP-9019", from: "Bloom & Co, Barranquilla",      to: "Cl. 79B #53-75, Barranquilla",  driver: "Juan Polo",    status: "Recogiendo", eta: "16:10" },
                ].map((d) => {
                  const statusColor = d.status === "Entregado" ? "#5a7a4a" : d.status === "En camino" ? "#c9a843" : "#7b5ea7";
                  return (
                    <div key={d.id} className="flex items-center justify-between p-4 border border-[rgba(58,38,14,0.08)] rounded-xl">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#7a6555" }}>{d.id}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: statusColor + "18", color: statusColor, fontFamily: "'Lato', sans-serif" }}>
                            {d.status}
                          </span>
                        </div>
                        <div className="text-sm text-[#2a1a0e] truncate" style={{ fontFamily: "'Lato', sans-serif" }}>{d.from} → {d.to}</div>
                        <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>Repartidor: {d.driver}</div>
                      </div>
                      {d.eta !== "—" && (
                        <div className="ml-4 text-right flex-shrink-0">
                          <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>ETA</div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, color: "#2a1a0e" }}>{d.eta}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

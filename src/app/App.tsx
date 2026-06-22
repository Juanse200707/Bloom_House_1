import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { MarketplacePage } from "./components/MarketplacePage";
import { FloristsPage } from "./components/FloristsPage";
import { DashboardPage } from "./components/DashboardPage";
import { CartDrawer } from "./components/CartDrawer";
import { AuthModal, type AuthUser } from "./components/AuthModal";
import { AboutPage } from "./components/AboutPage";
import { SiteFooter } from "./components/SiteFooter";
import { LanguageProvider } from "./contexts/LanguageContext";
import "../styles/fonts.css";

interface CartItem {
  id: number;
  name: string;
  florist: string;
  price: number;
  image: string;
  qty: number;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const addToCart = (product: { id: number; name: string; florist: string; price: number; image: string }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: number, qty: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case "marketplace":
        return <MarketplacePage onAddToCart={addToCart} />;
      case "florists":
        return <FloristsPage />;
      case "distribution":
      case "dashboard":
        return <DashboardPage />;
      case "about":
        return <AboutPage onNavigate={setPage} />;
      default:
        return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <LanguageProvider>
    <div className="min-h-screen bg-[#f5f0e8]" style={{ scrollbarWidth: "none" }}>
      <style>{`*::-webkit-scrollbar { display: none; }`}</style>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        currentPage={page}
        onNavigate={setPage}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={() => setUser(null)}
      />
      {renderPage()}
      <SiteFooter onNavigate={setPage} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdate={updateQty}
        onRemove={removeItem}
      />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={(u) => { setUser(u); setAuthOpen(false); }}
      />
    </div>
    </LanguageProvider>
  );
}

import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, ChevronDown, LogOut, User, Store, Shield, LayoutDashboard, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../imports/image-1.png";
import { NotificationsPopover, BellButton } from "./NotificationsPopover";
import type { AuthUser } from "./AuthModal";
import { useLang, type Lang } from "../contexts/LanguageContext";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  user: AuthUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const ROLE_ICON: Record<string, React.ReactNode> = {
  client:  <User size={14} />,
  company: <Store size={14} />,
  admin:   <Shield size={14} />,
};

const ROLE_COLOR: Record<string, string> = {
  client:  "#7b5ea7",
  company: "#c9a843",
  admin:   "#5a7a4a",
};

export function Navbar({ cartCount, onCartOpen, currentPage, onNavigate, user, onOpenAuth, onLogout }: NavbarProps) {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen]         = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [userDropdown, setUserDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [notiOpen, setNotiOpen]         = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t("nav_marketplace"),  page: "marketplace",  show: true },
    { label: t("nav_florists"),     page: "florists",      show: true },
    { label: t("nav_mystore"),      page: "dashboard",     show: user?.role === "company" },
    { label: t("nav_distribution"), page: "distribution",  show: user?.role === "admin" },
    { label: t("nav_about"),        page: "about",         show: true },
  ].filter(l => l.show);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setUserDropdown(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const avatarColor = user ? ROLE_COLOR[user.role] : "#7b5ea7";
  const initials = user ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "";

  return (
    <nav className="sticky top-0 z-50 bg-[#f5f0e8]/96 backdrop-blur-sm border-b border-[rgba(58,38,14,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2 group">
            <img src={logoImg} alt="Bloom House logo" className="w-10 h-10 object-contain" />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.01em", color: "#2a1a0e" }}>
              Bloom House
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button key={link.page} onClick={() => onNavigate(link.page)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  currentPage === link.page
                    ? "text-[#7b5ea7] bg-[#7b5ea7]/10"
                    : "text-[#7a6555] hover:text-[#2a1a0e] hover:bg-[#ece5d8]"
                }`}
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: currentPage === link.page ? 700 : 400 }}>
                {link.label}
              </button>
            ))}
            {user?.role === "admin" && (
              <button onClick={() => onNavigate("admin")}
                className={`px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-1.5 ${
                  currentPage === "admin" ? "text-[#5a7a4a] bg-[#5a7a4a]/10" : "text-[#7a6555] hover:text-[#5a7a4a] hover:bg-[#edf5ea]"
                }`}
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: currentPage === "admin" ? 700 : 400 }}>
                <LayoutDashboard size={14} /> {t("nav_admin")}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div key="open" initial={{ width: 0, opacity: 0 }} animate={{ width: 210, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center bg-[#ece5d8] rounded-full px-3 py-1.5 gap-2 overflow-hidden">
                  <Search size={14} className="text-[#7a6555] flex-shrink-0" />
                  <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("nav_search")}
                    className="bg-transparent outline-none text-sm text-[#2a1a0e] placeholder:text-[#7a6555] w-full"
                    style={{ fontFamily: "'Lato', sans-serif" }} />
                  <button onClick={() => setSearchOpen(false)}><X size={13} className="text-[#7a6555]" /></button>
                </motion.div>
              ) : (
                <motion.button key="icon" onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-[#ece5d8] transition-colors text-[#7a6555] hover:text-[#2a1a0e]">
                  <Search size={17} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Language toggle — desktop */}
            <div className="relative hidden md:block" ref={langRef}>
              <button onClick={() => setLangDropdown(o => !o)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-[#ece5d8] transition-colors text-[#7a6555] hover:text-[#2a1a0e]">
                <Globe size={15} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "0.75rem" }}>{lang}</span>
                <ChevronDown size={11} className={`transition-transform ${langDropdown ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langDropdown && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl border border-[rgba(58,38,14,0.1)] shadow-lg overflow-hidden z-50">
                    {(["ES", "EN"] as Lang[]).map((l) => (
                      <button key={l} onClick={() => { setLang(l); setLangDropdown(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                          lang === l ? "bg-[#7b5ea7]/10 text-[#7b5ea7]" : "text-[#7a6555] hover:bg-[#f5f0e8] hover:text-[#2a1a0e]"
                        }`}
                        style={{ fontFamily: "'Lato', sans-serif", fontWeight: lang === l ? 700 : 400 }}>
                        <span className="text-base">{l === "ES" ? "🇨🇴" : "🇺🇸"}</span>
                        {l === "ES" ? "Español" : "English"}
                        {lang === l && <span className="ml-auto text-[#7b5ea7] text-xs">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications bell */}
            <div className="relative">
              <BellButton onClick={() => setNotiOpen(o => !o)} />
              <NotificationsPopover open={notiOpen} onClose={() => setNotiOpen(false)} />
            </div>

            {/* Cart */}
            <button onClick={onCartOpen}
              className="relative p-2 rounded-full hover:bg-[#ece5d8] transition-colors text-[#7a6555] hover:text-[#2a1a0e]">
              <ShoppingCart size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a843] rounded-full flex items-center justify-center text-[#2a1a0e] text-[10px]"
                  style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* User / Auth */}
            {user ? (
              <div className="relative hidden md:block" ref={dropRef}>
                <button onClick={() => setUserDropdown(o => !o)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(58,38,14,0.15)] hover:bg-[#ece5d8] transition-colors">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px]"
                    style={{ background: avatarColor, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>
                    {initials}
                  </div>
                  <span className="text-sm text-[#2a1a0e] max-w-[100px] truncate" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={13} className={`text-[#7a6555] transition-transform ${userDropdown ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userDropdown && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-[rgba(58,38,14,0.1)] shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-[rgba(58,38,14,0.07)]">
                        <div className="flex items-center gap-2">
                          <div style={{ color: avatarColor }}>{ROLE_ICON[user.role]}</div>
                          <div>
                            <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1a0e" }}>{user.name}</div>
                            <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{user.email}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button onClick={() => { onNavigate("dashboard"); setUserDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#7a6555] hover:bg-[#f5f0e8] hover:text-[#2a1a0e] rounded-lg transition-colors text-left"
                          style={{ fontFamily: "'Lato', sans-serif" }}>
                          <LayoutDashboard size={14} /> {t("nav_mypanel")}
                        </button>
                        <button onClick={() => { onLogout(); setUserDropdown(false); onNavigate("home"); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#c84848] hover:bg-[#fff4f4] rounded-lg transition-colors text-left"
                          style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                          <LogOut size={14} /> {t("nav_logout")}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={onOpenAuth}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#7b5ea7] text-white rounded-full text-sm hover:bg-[#6a4f92] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                {t("nav_account")}
              </button>
            )}

            <button className="md:hidden p-2 rounded-full hover:bg-[#ece5d8] transition-colors text-[#7a6555]"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-[rgba(58,38,14,0.08)] py-3 space-y-1">
              {navLinks.map((link) => (
                <button key={link.page} onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-sm text-[#7a6555] hover:text-[#2a1a0e] hover:bg-[#ece5d8]"
                  style={{ fontFamily: "'Lato', sans-serif" }}>
                  {link.label}
                </button>
              ))}
              {/* Mobile language toggle */}
              <div className="flex gap-2 px-3 pt-1">
                {(["ES", "EN"] as Lang[]).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                      lang === l ? "bg-[#7b5ea7] text-white" : "bg-[#ece5d8] text-[#7a6555]"
                    }`}
                    style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
                    {l === "ES" ? "🇨🇴" : "🇺🇸"} {l}
                  </button>
                ))}
              </div>
              {user ? (
                <button onClick={() => { onLogout(); setMenuOpen(false); onNavigate("home"); }}
                  className="block w-full text-left px-3 py-2.5 text-sm text-[#c84848]"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                  {t("nav_logout")}
                </button>
              ) : (
                <button onClick={() => { onOpenAuth(); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2.5 text-sm text-[#7b5ea7]"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                  {t("nav_account")}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

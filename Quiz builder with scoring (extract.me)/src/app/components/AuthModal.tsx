import { useState } from "react";
import { X, Eye, EyeOff, User, Store, Shield, ChevronLeft, Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "../contexts/LanguageContext";

export type UserRole = "client" | "company" | "admin";

export interface AuthUser {
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}

type Step = "role" | "login" | "register" | "forgot" | "forgot_sent";

const DEMO_USERS: Record<UserRole, AuthUser> = {
  client:  { role: "client",  name: "María Camila Ruiz", email: "maria@bloom.co",   avatar: "MC" },
  company: { role: "company", name: "Flores del Valle",  email: "flores@bloom.co",  avatar: "FV" },
  admin:   { role: "admin",   name: "Admin Bloom House", email: "admin@bloom.co",   avatar: "AD" },
};

export function AuthModal({ open, onClose, onLogin }: AuthModalProps) {
  const { t } = useLang();
  const [step, setStep]               = useState<Step>("role");
  const [mode, setMode]               = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPass, setShowPass]       = useState(false);
  const [form, setForm]               = useState({ email: "", password: "", name: "", nit: "", phone: "", address: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [error, setError]             = useState("");

  const ROLES = [
    { id: "client"  as UserRole, icon: <User size={22} />,  label: t("role_client"),  desc: t("role_client_desc"),  color: "#7b5ea7", bg: "#ede5f5" },
    { id: "company" as UserRole, icon: <Store size={22} />, label: t("role_company"), desc: t("role_company_desc"), color: "#c9a843", bg: "#fdf5dd" },
    { id: "admin"   as UserRole, icon: <Shield size={22} />,label: t("role_admin"),   desc: t("role_admin_desc"),   color: "#5a7a4a", bg: "#edf5ea" },
  ];

  const reset = () => {
    setStep("role");
    setMode("login");
    setSelectedRole(null);
    setForm({ email: "", password: "", name: "", nit: "", phone: "", address: "" });
    setForgotEmail("");
    setError("");
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setStep("login");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    if (!form.email || !form.password) { setError("Completa todos los campos requeridos."); return; }
    if (mode === "register" && !form.name) { setError("El nombre es requerido."); return; }
    const demo = DEMO_USERS[selectedRole];
    onLogin({ ...demo, email: form.email, name: mode === "register" ? form.name : demo.name });
    reset();
    onClose();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setStep("forgot_sent");
  };

  const roleInfo = ROLES.find(r => r.id === selectedRole);

  const getBackAction = () => {
    if (step === "login")       return () => { setStep("role"); setError(""); };
    if (step === "forgot")      return () => { setStep("login"); setError(""); };
    if (step === "forgot_sent") return () => { setStep("login"); setForgotEmail(""); };
    return null;
  };

  const getTitle = () => {
    if (step === "role")        return t("auth_title");
    if (step === "forgot")      return t("forgot_title");
    if (step === "forgot_sent") return t("forgot_ok_title");
    return mode === "login" ? t("auth_login") : t("auth_register");
  };

  const backAction = getBackAction();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(58,38,14,0.08)]">
                <div className="flex items-center gap-2">
                  {backAction && (
                    <button onClick={backAction}
                      className="p-1.5 rounded-full hover:bg-[#f5f0e8] transition-colors mr-1">
                      <ChevronLeft size={16} className="text-[#7a6555]" />
                    </button>
                  )}
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#2a1a0e" }}>
                    {getTitle()}
                  </h2>
                </div>
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-[#f5f0e8] transition-colors">
                  <X size={16} className="text-[#7a6555]" />
                </button>
              </div>

              <div className="px-6 py-6">
                <AnimatePresence mode="wait">

                  {/* ── STEP: Role selection ── */}
                  {step === "role" && (
                    <motion.div key="role" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                      <p className="text-sm text-[#7a6555] mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                        {t("auth_select")}
                      </p>
                      {ROLES.map((role) => (
                        <button key={role.id} onClick={() => handleSelectRole(role.id)}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl border border-[rgba(58,38,14,0.1)] hover:border-[#7b5ea7]/40 hover:bg-[#faf8ff] transition-all text-left group">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: role.bg, color: role.color }}>
                            {role.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#2a1a0e", fontSize: "0.95rem" }}>{role.label}</div>
                            <div className="text-xs text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>{role.desc}</div>
                          </div>
                          <ChevronLeft size={16} className="text-[#7a6555] rotate-180 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* ── STEP: Login / Register ── */}
                  {step === "login" && roleInfo && (
                    <motion.div key="login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      {/* Role badge */}
                      <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl" style={{ background: roleInfo.bg }}>
                        <div style={{ color: roleInfo.color }}>{roleInfo.icon}</div>
                        <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: roleInfo.color, fontSize: "0.88rem" }}>
                          {roleInfo.label}
                        </span>
                      </div>

                      {/* Mode toggle */}
                      <div className="flex gap-1 bg-[#f5f0e8] rounded-xl p-1 mb-5">
                        {(["login", "register"] as const).map((m) => (
                          <button key={m} onClick={() => { setMode(m); setError(""); }}
                            className={`flex-1 py-2 rounded-lg text-sm transition-all ${mode === m ? "bg-white shadow-sm text-[#2a1a0e]" : "text-[#7a6555]"}`}
                            style={{ fontFamily: "'Lato', sans-serif", fontWeight: mode === m ? 700 : 400 }}>
                            {m === "login" ? t("auth_login") : t("auth_register")}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        {mode === "register" && (
                          <>
                            <div>
                              <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                                {selectedRole === "company" ? t("auth_company") : t("auth_name_full")}
                              </label>
                              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder={selectedRole === "company" ? "Ej. Flores del Valle SAS" : "Ej. María Camila Ruiz"}
                                className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 placeholder:text-[#b0a090]"
                                style={{ fontFamily: "'Lato', sans-serif" }} />
                            </div>
                            {selectedRole === "company" && (
                              <div>
                                <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>{t("auth_nit")}</label>
                                <input value={form.nit} onChange={e => setForm(f => ({ ...f, nit: e.target.value }))}
                                  placeholder="Ej. 900.123.456-7"
                                  className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 placeholder:text-[#b0a090]"
                                  style={{ fontFamily: "'Lato', sans-serif" }} />
                              </div>
                            )}
                            {selectedRole === "client" && (
                              <div>
                                <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>{t("auth_address")}</label>
                                <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                                  placeholder="Ej. Cl. 80 #12-34, Bogotá"
                                  className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 placeholder:text-[#b0a090]"
                                  style={{ fontFamily: "'Lato', sans-serif" }} />
                              </div>
                            )}
                          </>
                        )}

                        <div>
                          <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>{t("auth_email")}</label>
                          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder={selectedRole === "admin" ? "admin@bloomhouse.co" : "tucorreo@ejemplo.com"}
                            className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 placeholder:text-[#b0a090]"
                            style={{ fontFamily: "'Lato', sans-serif" }} />
                        </div>

                        <div>
                          <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>{t("auth_password")}</label>
                          <div className="relative">
                            <input type={showPass ? "text" : "password"} value={form.password}
                              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                              placeholder="••••••••"
                              className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 pr-10 placeholder:text-[#b0a090]"
                              style={{ fontFamily: "'Lato', sans-serif" }} />
                            <button type="button" onClick={() => setShowPass(s => !s)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6555] hover:text-[#2a1a0e]">
                              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                        </div>

                        {error && (
                          <p className="text-xs text-[#c84848] bg-[#fff4f4] px-3 py-2 rounded-lg" style={{ fontFamily: "'Lato', sans-serif" }}>
                            {error}
                          </p>
                        )}

                        <button type="submit"
                          className="w-full py-3 rounded-xl text-white transition-all hover:opacity-90 mt-1"
                          style={{ background: roleInfo.color, fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                          {mode === "login" ? t("auth_enter") : t("auth_create")}
                        </button>

                        {/* Forgot password link — only on login mode */}
                        {mode === "login" && (
                          <div className="text-center pt-1">
                            <button type="button" onClick={() => { setStep("forgot"); setError(""); }}
                              className="text-xs text-[#7b5ea7] hover:underline transition-all"
                              style={{ fontFamily: "'Lato', sans-serif" }}>
                              {t("auth_forgot")}
                            </button>
                          </div>
                        )}

                        {selectedRole === "admin" && mode === "login" && (
                          <p className="text-xs text-center text-[#7a6555]" style={{ fontFamily: "'Lato', sans-serif" }}>
                            {t("auth_admin_note")}
                          </p>
                        )}
                      </form>
                    </motion.div>
                  )}

                  {/* ── STEP: Forgot password — email input ── */}
                  {step === "forgot" && (
                    <motion.div key="forgot" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <div className="flex justify-center mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#ede5f5] flex items-center justify-center">
                          <Mail size={26} className="text-[#7b5ea7]" />
                        </div>
                      </div>
                      <p className="text-sm text-[#7a6555] text-center mb-6" style={{ fontFamily: "'Lato', sans-serif", lineHeight: 1.6 }}>
                        {t("forgot_sub")}
                      </p>
                      <form onSubmit={handleForgotSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs text-[#7a6555] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>{t("forgot_label")}</label>
                          <input type="email" required value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            className="w-full px-4 py-2.5 bg-[#f5f0e8] rounded-xl text-sm text-[#2a1a0e] outline-none focus:ring-2 focus:ring-[#7b5ea7]/30 placeholder:text-[#b0a090]"
                            style={{ fontFamily: "'Lato', sans-serif" }} />
                        </div>
                        <button type="submit"
                          className="w-full py-3 rounded-xl text-white bg-[#7b5ea7] hover:bg-[#6a4f92] transition-colors"
                          style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                          {t("forgot_btn")}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* ── STEP: Forgot password — success state ── */}
                  {step === "forgot_sent" && (
                    <motion.div key="forgot_sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="text-center py-2">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                        className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-full bg-[#edf5ea] flex items-center justify-center">
                          <CheckCircle size={32} className="text-[#5a7a4a]" />
                        </div>
                      </motion.div>
                      <p className="text-sm text-[#7a6555] mb-6 px-2" style={{ fontFamily: "'Lato', sans-serif", lineHeight: 1.7 }}>
                        {t("forgot_ok_msg")}
                      </p>
                      <div className="bg-[#f5f0e8] rounded-xl px-4 py-2.5 mb-6 inline-block">
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#2a1a0e" }}>{forgotEmail}</span>
                      </div>
                      <button onClick={() => { setStep("login"); setForgotEmail(""); }}
                        className="w-full py-3 rounded-xl text-[#7b5ea7] border border-[#7b5ea7]/30 hover:bg-[#ede5f5] transition-colors"
                        style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                        {t("forgot_back")}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "ES" | "EN";

const translations = {
  ES: {
    // Navbar
    nav_marketplace:  "Marketplace",
    nav_florists:     "Floristerías",
    nav_mystore:      "Mi Tienda",
    nav_distribution: "Distribución",
    nav_about:        "Nosotros",
    nav_admin:        "Panel Admin",
    nav_account:      "Mi Cuenta",
    nav_mypanel:      "Mi Panel",
    nav_logout:       "Cerrar Sesión",
    nav_search:       "Buscar flores...",

    // Hero
    hero_badge:       "100% Producto Nacional",
    hero_title1:      "El Marketplace de",
    hero_title2:      "flores colombianas",
    hero_title3:      "más grande del país",
    hero_subtitle:    "Conectamos floristerías artesanales y floricultores locales con todo Colombia. Centralizamos la oferta, gestionamos inventarios y coordinamos la distribución para que el talento floral colombiano llegue a cada rincón.",
    hero_cta1:        "Explorar Marketplace",
    hero_cta2:        "Ver Floristerías",
    hero_stat1:       "Floristerías aliadas",
    hero_stat2:       "Departamentos",
    hero_stat3:       "Calificación promedio",
    hero_strip1:      "Distribución express en Bogotá, Medellín y Cali",
    hero_strip2:      "Flores frescas de cultivos nacionales",
    hero_strip3:      "Garantía de calidad floral certificada",

    // HomePage sections
    home_cat_title:   "Explora por categoría",
    home_cat_all:     "Ver todo",
    home_how_title:   "¿Cómo funciona?",
    home_how_sub:     "Una plataforma tecnológica que conecta la belleza del campo colombiano con el hogar de cada cliente.",
    home_how_s1_t:    "Descubre",
    home_how_s1_d:    "Explora cientos de productos de floristerías artesanales certificadas en todo el país.",
    home_how_s2_t:    "Pide",
    home_how_s2_d:    "Selecciona tus flores favoritas. El sistema gestiona automáticamente inventario y disponibilidad.",
    home_how_s3_t:    "Recibe",
    home_how_s3_d:    "Nuestra red de distribución coordina el despacho directo desde la floristería a tu puerta.",
    home_feat_title:  "Una plataforma pensada para impulsar el talento",
    home_feat_em:     "floral colombiano",
    home_cta_title:   "¿Tienes una floristería?",
    home_cta_em:      "Únete a Bloom House",
    home_cta_sub:     "Amplía tu alcance a toda Colombia. Nosotros gestionamos la plataforma, el inventario centralizado y la logística de distribución. Tú te enfocas en lo que mejor sabes hacer: crear flores hermosas.",
    home_cta_btn:     "Registrar mi floristería",
    home_rating:      "CALIFICACIÓN GLOBAL",
    home_reviews:     "+12,000 reseñas verificadas",

    // Auth modal
    auth_title:       "Acceder a Bloom House",
    auth_select:      "Selecciona tu tipo de cuenta para continuar",
    auth_login:       "Iniciar sesión",
    auth_register:    "Registrarse",
    auth_email:       "Correo electrónico",
    auth_password:    "Contraseña",
    auth_name_full:   "Nombre completo",
    auth_company:     "Nombre de la empresa",
    auth_address:     "Dirección de envío",
    auth_nit:         "NIT",
    auth_enter:       "Ingresar",
    auth_create:      "Crear cuenta",
    auth_admin_note:  "Acceso exclusivo de personal técnico autorizado",
    auth_forgot:      "¿Olvidó su contraseña?",
    forgot_title:     "Recuperar contraseña",
    forgot_sub:       "Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.",
    forgot_label:     "Correo electrónico",
    forgot_btn:       "Enviar enlace de recuperación",
    forgot_ok_title:  "Revisa tu correo",
    forgot_ok_msg:    "Hemos enviado un enlace a su correo para restablecer su contraseña. Revisa también tu carpeta de spam.",
    forgot_back:      "Volver al inicio de sesión",
    role_client:      "Cliente",
    role_client_desc: "Compra flores y realiza pedidos a domicilio",
    role_company:     "Floristería Aliada",
    role_company_desc:"Gestiona tu tienda y catálogo de productos",
    role_admin:       "Administrador",
    role_admin_desc:  "Acceso completo al sistema de gestión",
  },
  EN: {
    // Navbar
    nav_marketplace:  "Marketplace",
    nav_florists:     "Florists",
    nav_mystore:      "My Store",
    nav_distribution: "Distribution",
    nav_about:        "About",
    nav_admin:        "Admin Panel",
    nav_account:      "My Account",
    nav_mypanel:      "My Panel",
    nav_logout:       "Log Out",
    nav_search:       "Search flowers...",

    // Hero
    hero_badge:       "100% Domestic Product",
    hero_title1:      "Colombia's largest",
    hero_title2:      "flower marketplace",
    hero_title3:      "connecting you to local growers",
    hero_subtitle:    "We connect artisan florists and local flower growers across Colombia. We centralize supply, manage inventory, and coordinate distribution so Colombian floral talent reaches every corner.",
    hero_cta1:        "Explore Marketplace",
    hero_cta2:        "View Florists",
    hero_stat1:       "Partner florists",
    hero_stat2:       "Departments",
    hero_stat3:       "Average rating",
    hero_strip1:      "Express delivery in Bogotá, Medellín & Cali",
    hero_strip2:      "Fresh flowers from local farms",
    hero_strip3:      "Certified floral quality guarantee",

    // HomePage sections
    home_cat_title:   "Explore by category",
    home_cat_all:     "View all",
    home_how_title:   "How does it work?",
    home_how_sub:     "A technology platform connecting the beauty of the Colombian countryside with every customer's home.",
    home_how_s1_t:    "Discover",
    home_how_s1_d:    "Browse hundreds of products from certified artisan florists across the country.",
    home_how_s2_t:    "Order",
    home_how_s2_d:    "Pick your favorite flowers. The system automatically manages inventory and availability.",
    home_how_s3_t:    "Receive",
    home_how_s3_d:    "Our distribution network coordinates direct delivery from the florist to your door.",
    home_feat_title:  "A platform designed to boost",
    home_feat_em:     "Colombian floral talent",
    home_cta_title:   "Do you have a flower shop?",
    home_cta_em:      "Join Bloom House",
    home_cta_sub:     "Expand your reach across Colombia. We manage the platform, centralized inventory, and distribution logistics. You focus on what you do best: creating beautiful flowers.",
    home_cta_btn:     "Register my florist",
    home_rating:      "GLOBAL RATING",
    home_reviews:     "+12,000 verified reviews",

    // Auth modal
    auth_title:       "Access Bloom House",
    auth_select:      "Select your account type to continue",
    auth_login:       "Sign in",
    auth_register:    "Sign up",
    auth_email:       "Email address",
    auth_password:    "Password",
    auth_name_full:   "Full name",
    auth_company:     "Company name",
    auth_address:     "Shipping address",
    auth_nit:         "Tax ID (NIT)",
    auth_enter:       "Sign in",
    auth_create:      "Create account",
    auth_admin_note:  "Exclusive access for authorized technical staff",
    auth_forgot:      "Forgot your password?",
    forgot_title:     "Reset password",
    forgot_sub:       "Enter your email and we'll send you a link to reset your password.",
    forgot_label:     "Email address",
    forgot_btn:       "Send recovery link",
    forgot_ok_title:  "Check your inbox",
    forgot_ok_msg:    "We've sent a link to your email to reset your password. Check your spam folder too.",
    forgot_back:      "Back to sign in",
    role_client:      "Customer",
    role_client_desc: "Buy flowers and place home delivery orders",
    role_company:     "Partner Florist",
    role_company_desc:"Manage your store and product catalog",
    role_admin:       "Administrator",
    role_admin_desc:  "Full access to the management system",
  },
} as const;

export type TranslationKey = keyof typeof translations.ES;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ES",
  setLang: () => {},
  t: (key) => translations.ES[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ES");
  const t = (key: TranslationKey) => translations[lang][key];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

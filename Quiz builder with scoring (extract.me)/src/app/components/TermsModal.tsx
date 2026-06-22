import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export function TermsModal({ open, onClose }: TermsModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[82vh] flex flex-col pointer-events-auto">
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(58,38,14,0.08)] flex-shrink-0">
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.25rem", color: "#2a1a0e" }}>
                  Términos y Condiciones
                </h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[#f5f0e8] transition-colors">
                  <X size={16} className="text-[#7a6555]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#7a6555", fontSize: "0.9rem", lineHeight: 1.75 }}>

                {[
                  {
                    title: "1. Aceptación de los Términos",
                    body: "Al acceder y utilizar la plataforma Bloom House, usted acepta estar legalmente vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestros servicios.",
                  },
                  {
                    title: "2. Descripción del Servicio",
                    body: "Bloom House es una plataforma digital de marketplace que actúa como intermediario tecnológico entre compradores finales y floristerías artesanales aliadas de Colombia. No somos fabricantes ni propietarios de los productos listados; actuamos como canal de distribución y gestión de pedidos.",
                  },
                  {
                    title: "3. Registro y Cuentas de Usuario",
                    body: "Para realizar compras o acceder a funcionalidades avanzadas, deberá crear una cuenta proporcionando información veraz y actualizada. Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta.",
                  },
                  {
                    title: "4. Floristerías Aliadas",
                    body: "Las floristerías que participan en Bloom House han sido verificadas y deben cumplir con nuestros estándares de calidad. Sin embargo, Bloom House no garantiza la disponibilidad permanente de productos específicos ni se hace responsable por variaciones en la presentación final de los arreglos.",
                  },
                  {
                    title: "5. Pagos y Precios",
                    body: "Todos los precios se expresan en Pesos Colombianos (COP) e incluyen IVA cuando aplica. Los precios pueden cambiar sin previo aviso. El cobro se realizará en el momento de confirmar el pedido. Bloom House utiliza pasarelas de pago certificadas y no almacena datos de tarjetas de crédito.",
                  },
                  {
                    title: "6. Política de Devoluciones",
                    body: "Dado que los productos florales son perecederos, aceptamos solicitudes de devolución o compensación únicamente cuando el producto llegue en condiciones notoriamente diferentes a las descritas o dañado durante el transporte. Las solicitudes deben realizarse dentro de las 4 horas posteriores a la entrega con evidencia fotográfica.",
                  },
                  {
                    title: "7. Distribución y Tiempos de Entrega",
                    body: "Los tiempos de entrega son estimados y pueden variar según la ciudad, la disponibilidad del producto y las condiciones logísticas. Bloom House no se hace responsable por retrasos causados por fuerza mayor, condiciones climáticas adversas o eventos fuera de nuestro control.",
                  },
                  {
                    title: "8. Propiedad Intelectual",
                    body: "Todo el contenido de la plataforma Bloom House, incluyendo logotipos, imágenes, textos y código, está protegido por derechos de autor y otras leyes de propiedad intelectual de la República de Colombia.",
                  },
                  {
                    title: "9. Privacidad y Datos Personales",
                    body: "El tratamiento de sus datos personales se rige por nuestra Política de Privacidad, la cual cumple con la Ley 1581 de 2012 (Protección de Datos Personales) de Colombia. Sus datos nunca serán vendidos a terceros.",
                  },
                  {
                    title: "10. Modificaciones",
                    body: "Bloom House se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios serán notificados a través de la plataforma y entrarán en vigor a los 30 días de su publicación.",
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#2a1a0e", marginBottom: "0.5rem" }}>
                      {section.title}
                    </h3>
                    <p>{section.body}</p>
                  </div>
                ))}

                <div className="pt-2 border-t border-[rgba(58,38,14,0.08)]">
                  <p className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#b0a090" }}>
                    Última actualización: 10 de junio de 2026 · Bloom House S.A.S. · Bogotá, Colombia · NIT 901.234.567-8
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[rgba(58,38,14,0.08)] flex-shrink-0">
                <button onClick={onClose}
                  className="w-full py-3 bg-[#7b5ea7] text-white rounded-xl hover:bg-[#6a4f92] transition-colors"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

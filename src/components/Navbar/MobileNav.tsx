

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Videos", href: "/videos" },
    { label: "Reportes", href: "/reportes" },
    { label: "Soporte", href: "/soportes" },
    { label: "Mi Perfil", href: "/mi-perfil" },
    { label: "Tienda", href: "/tienda" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative md:hidden">
      {/* Header Bar */}
      <header className=" fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md ">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex gap-3 items-center">
            <span className="text-xl font-light tracking-wide text-white">
              IAgro
            </span>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="relative w-12 h-12 flex items-center justify-center rounded-lg transition-colors cursor-pointer text-white duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-[#282627]"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-6 relative">
              {/* Top line */}
              <span
                className={`absolute left-0 top-1 w-6 h-0.5 bg-[#D7D5CC] transform transition-all duration-300 ease-in-out origin-center ${isOpen ? "rotate-45 translate-y-2" : "rotate-0 translate-y-0"
                  }`}
              />
              {/* Middle line */}
              <span
                className={`absolute left-0 top-2.5 w-6 h-0.5 bg-[#D7D5CC] transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
              />
              {/* Bottom line */}
              <span
                className={`absolute left-0 top-4 w-6 h-0.5 bg-[#D7D5CC] transform transition-all duration-300 ease-in-out origin-center ${isOpen
                    ? "-rotate-45 -translate-y-2"
                    : "rotate-0 translate-y-0"
                  }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-20 bg-black/95 backdrop-blur-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación principal"
          >
            {/* Menu Content */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full px-8"
            >
              <nav className="w-full max-w-md">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.2 + index * 0.05,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-white text-3xl md:text-4xl font-light tracking-wide py-4 px-6 rounded-lg hover:bg-[#282627] transition-all duration-250 ease-in-out hover:translate-x-2 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-white/30"
                        style={{ minHeight: "44px" }}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Additional Info */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                className="mt-16 text-center"
              >
                <p className="text-white/60 text-sm mb-4 tracking-wide">
                  Contáctanos
                </p>
                <div className="space-y-2">
                  <p className="text-white/80 text-lg font-light">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-white/80 text-lg font-light">
                    <a
                      href="mailto:info@insideuco.com.ar"
                      className="hover:text-gray-400"
                    >
                      info@ganadovision.com.ar
                    </a>
                  </p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
                className="mt-12 flex space-x-8"
              >
                { /*   {["Instagram", "Facebook", "LinkedIn"].map((social, index) => (
                  <motion.a
                    key={social}
                    href={
                      social === "Facebook"
                        ? "https://www.facebook.com/uco.wineshop"
                        : social === "Instagram"
                        ? "https://www.instagram.com/casadeuco"
                        : "https://ar.linkedin.com/company/casa-de-uco-vineyards-&-wine-resort" // link por defecto
                    }
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-sm tracking-widest uppercase focus:outline-none focus:text-white focus:ring-2 focus:ring-white/30 rounded px-2 py-1"
                  >
                    {social}
                  </motion.a>
                ))}  */}
              </motion.div>
            </motion.div>

            {/* Close overlay on background click */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

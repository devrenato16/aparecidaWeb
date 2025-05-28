import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Sobre", path: "/sobre" },
    { label: "Horários", path: "/horarios" },
    { label: "Inscrições", path: "/inscricoes" },
    { label: "Dízimo", path: "/dizimo" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary-900 header-shadow py-2" : "bg-primary-900 py-4"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <Logo className="h-10 w-auto" />
          <span className="ml-3 font-serif text-white text-base sm:text-lg md:text-xl font-semibold">
            Paróquia de Aparecida
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-sm ${
                location.pathname === item.path
                  ? "text-white font-semibold animated-underline after:w-full"
                  : "text-white animated-underline"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white absolute right-6 top-1/2 transform -translate-y-1/2 z-[100]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay escuro */}

            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Mobile - Slide da Direita */}
            <motion.div
              initial={{ x: "100%" }} // Começa fora da tela à direita
              animate={{ x: 0 }} // Vai para posição normal
              exit={{ x: "100%" }} // Sai indo para a direita
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-xs z-50 bg-primary-900 pt-20 px-6 overflow-y-auto shadow-xl"
            >
              <div className="flex flex-col space-y-6 py-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-lg font-medium ${
                      location.pathname === item.path
                        ? "text-white font-semibold"
                        : "text-white/80"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

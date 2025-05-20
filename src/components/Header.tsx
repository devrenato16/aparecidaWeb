import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Sobre", path: "/sobre" },
    { label: "Horários", path: "/horarios" },
    { label: "Inscrições", path: "/inscricoes" },
    { label: "Dízimo", path: "/dizimo" },
    { label: "Localização", path: "/localizacao" },
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
          <span className="ml-3 font-serif text-white text-xl font-semibold">
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
                  ? "text-secondary-200 font-semibold animated-underline after:w-full"
                  : "text-white animated-underline"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <div className="relative group">
              <button className="flex items-center font-medium text-sm text-white">
                Admin <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
          {!currentUser && (
            <Link
              to="/login"
              className="btn btn-primary text-sm py-2"
              onClick={closeMenu}
            >
              Área Restrita
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-20 px-6 overflow-y-auto">
          <nav className="flex flex-col space-y-6 py-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium ${
                  location.pathname === item.path
                    ? "text-secondar"
                    : "text-primary-800"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="text-lg font-medium text-primary-800"
                  onClick={closeMenu}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-lg font-medium text-red-600 text-left"
                >
                  Sair
                </button>
              </>
            )}
            {!currentUser && (
              <Link
                to="/login"
                className="btn btn-primary w-full"
                onClick={closeMenu}
              >
                Área Restrita
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

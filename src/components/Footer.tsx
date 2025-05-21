import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="border-t border-primary-600 pt-6 pb-6">
        <div className="container-custom flex justify-between items-center">
          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/paroquiadeaparecida/ "
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-300 transition duration-300"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://instagram.com/paroquiadeaparecida "
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-300 transition duration-300"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="https://youtube.com/paroquiaaparecida "
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-300 transition duration-300"
              aria-label="YouTube"
            >
              <Youtube />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} Paróquia de Aparecida. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

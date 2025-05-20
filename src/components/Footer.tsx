import { Link } from "react-router-dom";
import {
  Phone,
  Clock,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Info */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center mb-4">
              <Logo className="h-12 w-auto" />
              <div className="ml-3">
                <h3 className="text-white font-serif text-xl">Paróquia</h3>
                <h4 className="text-white font-serif text-lg">de Aparecida</h4>
              </div>
            </Link>
            <p className="text-gray-300 mt-2 text-sm">
              Servindo a comunidade com fé, esperança e caridade sob a proteção
              de Nossa Senhora Aparecida.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-serif text-xl mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-300 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Rua Mariângela Lucena Peixoto, 49 - Valentinda de Figueiredo I
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-300 mr-2 flex-shrink-0" />
                <a
                  href="tel:+551199999999"
                  className="text-gray-300 hover:text-white text-sm transition duration-300"
                >
                  (11) 9999-9999
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle className="h-5 w-5 text-amber-300 mr-2 flex-shrink-0" />
                <a
                  href="https://wa.me/5583991846416"
                  className="text-gray-300 hover:text-white text-sm transition duration-300"
                >
                  (83) 99184-6416
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-xl mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/horarios"
                  className="text-gray-300 hover:text-white text-sm transition duration-300"
                >
                  Horários de Missas
                </Link>
              </li>
              <li>
                <Link
                  to="/inscricoes"
                  className="text-gray-300 hover:text-white text-sm transition duration-300"
                >
                  Inscrições
                </Link>
              </li>
              <li>
                <Link
                  to="/dizimo"
                  className="text-gray-300 hover:text-white text-sm transition duration-300"
                >
                  Dízimo
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-gray-300 hover:text-white text-sm transition duration-300"
                >
                  História
                </Link>
              </li>
            </ul>
          </div>

          {/* Mass Times */}
          <div>
            <h3 className="text-white font-serif text-xl mb-4">
              Horários de Missas
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-amber-300 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Domingo</p>
                  <p className="text-gray-300 text-sm">8h, 10h e 19h</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-amber-300 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">
                    Terça a Sexta
                  </p>
                  <p className="text-gray-300 text-sm">19h30</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-amber-300 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Sábado</p>
                  <p className="text-gray-300 text-sm">18h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center mt-12 space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-amber-300 transition duration-300"
            aria-label="Facebook"
          >
            <Facebook />
          </a>
          <a
            href="https://instagram.com/paroquiadeaparecida"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-amber-300 transition duration-300"
            aria-label="Instagram"
          >
            <Instagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-amber-300 transition duration-300"
            aria-label="YouTube"
          >
            <Youtube />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-800 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Paróquia Nossa Senhora Aparecida. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

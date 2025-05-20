import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Logo from '../components/Logo';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Página Não Encontrada | Paróquia Nossa Senhora Aparecida</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo className="h-24 w-24 mx-auto" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-6xl font-serif font-bold text-primary-800"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-2xl font-serif text-primary-700 text-center"
        >
          Página Não Encontrada
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 text-center text-gray-600 max-w-md"
        >
          A página que você está procurando não existe ou foi movida.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Link to="/" className="btn btn-primary flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Voltar para a página inicial</span>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;
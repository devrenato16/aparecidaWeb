import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  LogOut,
  ChevronRight,
  PlusCircle,
  Flame,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import { getRegistrations } from "../../firebase/firestore";
import SectionTitle from "../../components/SectionTitle";
import { PiHandsPrayingBold } from "react-icons/pi";

const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    batismo: 0,
    catecismo: 0,
    crisma: 0,
    casamento: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const registrations = await getRegistrations();

        const newStats = {
          batismo: 0,
          catecismo: 0,
          crisma: 0,
          casamento: 0,
        };

        registrations.forEach((reg) => {
          if (reg.formType && newStats[reg.formType] !== undefined) {
            newStats[reg.formType]++;
          }
        });

        setStats(newStats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    {
      name: "Inscrições",
      description: "Gerenciar todas as inscrições recebidas",
      icon: <FileText className="h-6 w-6" />,
      link: "/admin/registrations",
      color: "bg-blue-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Painel Administrativo | Paróquia Nossa Senhora Aparecida</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 pt-24 pb-12">
        <div className="container-custom">
          <SectionTitle
            title="Painel Administrativo"
            subtitle="Bem-vindo ao painel de gerenciamento da paróquia"
          />

          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 "
              >
                <div className="bg-white rounded-lg shadow-elevation-1 p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <PiHandsPrayingBold className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Batismos</p>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {stats.batismo}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-elevation-1 p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <PlusCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Catecismo</p>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {stats.catecismo}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-elevation-1 p-6">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <Flame className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Crisma</p>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {stats.crisma}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-elevation-1 p-6">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Flame className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Crisma Adulto</p>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {stats.casamento}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Admin Menu Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.link}
                      className="block bg-white rounded-lg shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-shadow duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <div
                          className={`${item.color} text-white p-3 rounded-full mr-4`}
                        >
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-medium text-gray-800">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-4">{item.description}</p>

                      <div className="flex items-center text-primary-700 font-medium">
                        Acessar
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
                >
                  <button
                    onClick={handleLogout}
                    className="w-full bg-white rounded-lg shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-red-500 text-white p-3 rounded-full mr-4">
                        <LogOut className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-800">
                        Sair
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4">
                      Encerrar a sessão atual do painel administrativo
                    </p>

                    <div className="flex items-center text-red-600 font-medium">
                      Sair do sistema
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </button>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;

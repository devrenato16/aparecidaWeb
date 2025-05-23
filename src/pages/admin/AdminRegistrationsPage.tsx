import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Filter, Trash2, Eye, X } from "lucide-react";
import toast from "react-hot-toast";
import SectionTitle from "../../components/SectionTitle";
import {
  getRegistrations,
  deleteRegistration,
  FormData,
} from "../../firebase/firestore";
import { generatePDF } from "../../utils/gereneratePDF";
import { formatDate } from "../../utils/dateUtils";

const AdminRegistrationsPage = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedRegistration, setSelectedRegistration] =
    useState<FormData | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, [activeFilter]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const data = await getRegistrations(activeFilter || undefined);
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Erro ao carregar inscrições");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta inscrição?"))
      return;
    try {
      const result = await deleteRegistration(id);
      if (result.success) {
        toast.success("Inscrição excluída com sucesso!");
        setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
        if (selectedRegistration?.id === id) {
          setSelectedRegistration(null);
        }
      } else {
        toast.error("Erro ao excluir inscrição");
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast.error("Erro ao excluir inscrição");
    }
  };

  const formTypeLabels = {
    batismo: "Batismo",
    catecismo: "Catecismo",
    crisma: "Crisma",
    crismaAdulto: "Crisma Adulto",
  };

  return (
    <>
      <Helmet>
        <title>Gerenciar Inscrições | Paróquia Nossa Senhora Aparecida</title>
      </Helmet>

      {/* Template oculto para PDF */}
      <div
        id="pdf-template"
        className="hidden p-6 max-w-md bg-white border border-gray-200 rounded"
      >
        <div id="pdf-content"></div>
      </div>

      <div className="min-h-screen bg-gray-100 pt-24 pb-12">
        <div className="container-custom">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center mr-4 text-primary-700 hover:text-primary-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Voltar</span>
            </button>
            <SectionTitle
              title="Gerenciar Inscrições"
              subtitle="Visualize ou exclua as inscrições recebidas"
              className="mb-0"
            />
          </div>
          <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary-800" />
                <span className="text-sm font-semibold text-gray-600">
                  Filtrar por:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveFilter(null)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === null
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setActiveFilter("batismo")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === "batismo"
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Batismo
                  </button>
                  <button
                    onClick={() => setActiveFilter("catecismo")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === "catecismo"
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Catecismo
                  </button>
                  <button
                    onClick={() => setActiveFilter("crisma")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === "crisma"
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Crisma
                  </button>
                  <button
                    onClick={() => setActiveFilter("crismaAdulto")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === "crismaAdulto"
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Crisma Adulto
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center p-12">
                <p className="text-primary-800">Nenhuma inscrição encontrada</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider">
                        E-mail
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider">
                        Telefone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-primary-800 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((registration) => (
                      <tr key={registration.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {registration.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-primary-800">
                            {registration.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-primary-800">
                            {registration.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            {formTypeLabels[registration.formType] ||
                              registration.formType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800">
                          {formatDate(registration.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
                          <button
                            onClick={() =>
                              setSelectedRegistration(registration)
                            }
                            className="text-primary-600 hover:text-primary-900 mx-2"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteRegistration(registration.id!)
                            }
                            className="text-red-600 hover:text-red-900 mx-2"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detalhes da Inscrição */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-primary-800 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-elevation-3 w-full max-w-3xl max-h-[90vh] overflow-auto"
          >
            <div className="p-6 flex justify-between items-start border-b border-gray-200">
              <div>
                <h3 className="text-xl font-serif text-primary-800 font-semibold">
                  Detalhes da Inscrição
                </h3>
                <p className="text-primary-800 text-sm">
                  {formTypeLabels[selectedRegistration.formType] ||
                    selectedRegistration.formType}{" "}
                  - {formatDate(selectedRegistration.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campos Básicos */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Nome
                  </h4>
                  <p className="text-gray-800">{selectedRegistration.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    E-mail
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.email || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Telefone
                  </h4>
                  <p className="text-gray-800">{selectedRegistration.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Data de Nascimento
                  </h4>
                  <p className="text-primary-800 text-sm">
                    {formatDate(selectedRegistration.birthdate)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Endereço
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.address}
                  </p>
                </div>

                {/* Campos Específicos do Crisma Adulto */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Nome do Pai
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.fatherName || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Nome da Mãe
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.motherName || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Comunidade
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.community || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Escolaridade
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.schooling || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Participa de algum grupo?
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.groupParticipation || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    É Batizado?
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.isBaptized === "sim"
                      ? "Sim"
                      : selectedRegistration.isBaptized === "nao"
                      ? "Não"
                      : "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Fez a Primeira Eucaristia?
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.firstEucharist === "sim"
                      ? "Sim"
                      : selectedRegistration.firstEucharist === "nao"
                      ? "Não"
                      : "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Possui alguma necessidade especial?
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.specialNeeds || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Estado Civil
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.maritalStatus || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Horário Disponível
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.availableTime || "Não informado"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Quem é Jesus para você?
                  </h4>
                  <p className="text-gray-800">
                    {selectedRegistration.jesusAnswer || "Não informado"}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedRegistration(null)}
                className="btn btn-outline"
              >
                Fechar
              </button>

              <button
                onClick={() =>
                  generatePDF(
                    selectedRegistration!,
                    `Cadastro_${selectedRegistration!.name}_${
                      new Date().toISOString().split("T")[0]
                    }.pdf`
                  )
                }
                className="btn bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
              >
                Baixar PDF
              </button>
              <button
                onClick={() =>
                  handleDeleteRegistration(selectedRegistration!.id!)
                }
                className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              >
                Excluir
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AdminRegistrationsPage;

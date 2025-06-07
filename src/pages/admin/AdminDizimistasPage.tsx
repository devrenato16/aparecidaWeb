import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { ArrowLeft, Trash2, Eye, X, Calendar, Filter } from "lucide-react";
import toast from "react-hot-toast";

// Componentes e utils do seu projeto
import SectionTitle from "../../components/SectionTitle";
import { getDizimistas, deleteDizimista } from "../../firebase/firestore"; // Funções personalizadas
import { formatBirthDate, formatDate, parseDate } from "../../utils/dateUtils";
import { generateDizimistasPDF } from "../../utils/generateDizimistasPDF";

// Interface do dizimista (ajuste conforme seus dados)
interface Dizimista {
  id: string;
  fullName: string;
  birthdate: string;
  availableSex: string;
  availableState: string;
  phone: string;
  address: string;
  community: string;
  createdAt: string;
}

const AdminDizimistasPage = () => {
  const navigate = useNavigate();
  const [dizimistas, setDizimistas] = useState<Dizimista[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dizimistaToDelete, setDizimistaToDelete] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [selectedDizimista, setSelectedDizimista] = useState<Dizimista | null>(
    null
  );
  const [filterDate, setFilterDate] = useState<string>("");

  const filteredDizimistas = filterDate
    ? dizimistas.filter((dizimista) => {
        const registrationDate = parseDate(dizimista.createdAt);

        if (!registrationDate) return false;

        const formattedRegistrationDate = registrationDate
          .toISOString()
          .split("T")[0];

        return formattedRegistrationDate === filterDate;
      })
    : dizimistas;

  useEffect(() => {
    fetchDizimistas();
  }, []);

  const fetchDizimistas = async () => {
    setLoading(true);
    try {
      const data = await getDizimistas(); // Busca dizimistas do Firebase
      setDizimistas(data);
    } catch (error) {
      console.error("Erro ao carregar dizimistas:", error);
      toast.error("Erro ao carregar os dizimistas");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDizimista = async (id: string) => {
    setDizimistaToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Função para formatar estado civil
  const formatMaritalStatus = (status: string): string => {
    switch (status) {
      case "solteiro":
        return "Solteiro(a)";
      case "casado":
        return "Casado(a)";
      case "divorciado":
        return "Divorciado(a)";
      case "uniaoestavel":
        return "União Estável";
      default:
        return status || "Não informado";
    }
  };

  // Função para formatar sexo
  const formatGender = (gender: string): string => {
    switch (gender) {
      case "masculino":
        return "Masculino";
      case "feminino":
        return "Feminino";
      case "naoinformar":
        return "Prefere não informar";
      default:
        return gender || "Não informado";
    }
  };

  return (
    <>
      <Helmet>
        <title>Dizimistas | Paróquia Nossa Senhora Aparecida</title>
      </Helmet>

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
          </div>

          <SectionTitle
            title="Gerenciar Dizimistas"
            subtitle="Visualize ou exclua os dizimistas cadastrados"
            className="mb-0"
            center
          />
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary-800" />
              <span className="text-sm font-semibold text-gray-600">
                Filtrar por:
              </span>
              <div className="relative max-w-xs">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredDizimistas.length === 0 ? (
              <div className="text-center p-12">
                <p className="text-primary-800">Nenhum dizimista encontrado</p>
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
          Telefone
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider">
          Comunidade
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider">
          Data Cadastro
        </th>
        <th className="px-6 py-3 text-right text-xs font-semibold text-primary-800 uppercase tracking-wider">
          Ações
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredDizimistas.map((dizimista) => (
        <tr key={dizimista.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-semibold text-gray-900">
              {dizimista.fullName}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-primary-800">{dizimista.phone}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-primary-800">{dizimista.community}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-800">
            {formatDate(dizimista.createdAt)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
            <button
              onClick={() => setSelectedDizimista(dizimista)}
              className="text-primary-600 hover:text-primary-900 mx-2"
              aria-label="Ver detalhes"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDeleteDizimista(dizimista.id)}
              className="text-red-600 hover:text-red-900 mx-2"
              aria-label="Excluir"
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

      {/* Modal Detalhes do Dizimista */}
      {selectedDizimista && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-elevation-3 w-full max-w-3xl max-h-[90vh] overflow-auto"
          >
            <div className="p-6 flex justify-between items-start border-b border-gray-200">
              <div>
                <h3 className="text-xl font-serif text-primary-800 font-semibold">
                  Detalhes do Dizimista
                </h3>
                <p className="text-primary-800 text-sm">
                  {formatDate(selectedDizimista.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedDizimista(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Nome Completo
                  </h4>
                  <p className="text-gray-800">{selectedDizimista.fullName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Data de Nascimento
                  </h4>
                  <p className="text-primary-800 text-sm">
                    {formatBirthDate(selectedDizimista.birthdate)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Sexo
                  </h4>
                  <p className="text-gray-800">
                    {formatGender(selectedDizimista.availableSex)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Estado Civil
                  </h4>
                  <p className="text-gray-800">
                    {formatMaritalStatus(selectedDizimista.availableState)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Telefone
                  </h4>
                  <p className="text-gray-800">{selectedDizimista.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Endereço
                  </h4>
                  <p className="text-gray-800">{selectedDizimista.address}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Comunidade
                  </h4>
                  <p className="text-gray-800">{selectedDizimista.community}</p>
                </div>
                <div className="md:col-span-2 mt-4">
                  <h4 className="text-sm font-semibold text-primary-800 mb-2">
                    Termo de Compromisso
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    Eu, <strong>{selectedDizimista.fullName}</strong>, declaro
                    meu compromisso em contribuir com a vida da Igreja por meio
                    do pagamento do dízimo. Assumo essa responsabilidade com fé
                    e generosidade, apoiando a obra de Deus em nossa comunidade.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedDizimista(null)}
                className="btn btn-outline"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  if (!selectedDizimista) return;

                  const filename = `Dizimista_${selectedDizimista.fullName}_${
                    new Date().toISOString().split("T")[0]
                  }.pdf`;

                  generateDizimistasPDF(selectedDizimista, filename);
                }}
                className="btn bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
              >
                Baixar PDF
              </button>
              <button
                onClick={() => handleDeleteDizimista(selectedDizimista.id)}
                className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              >
                Excluir
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Confirmação de Exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-elevation-3 w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-primary-800">
                Confirmar Exclusão
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Tem certeza que deseja excluir este dizimista? Esta ação não
                pode ser desfeita.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancelar
                </button>

                <button
                  onClick={async () => {
                    if (!dizimistaToDelete) return;
                    try {
                      const result = await deleteDizimista(dizimistaToDelete);
                      if (result.success) {
                        toast.success("Dizimista excluído com sucesso!");
                        setDizimistas((prev) =>
                          prev.filter((d) => d.id !== dizimistaToDelete)
                        );
                        if (selectedDizimista?.id === dizimistaToDelete) {
                          setSelectedDizimista(null);
                        }
                      } else {
                        toast.error("Erro ao excluir dizimista");
                      }
                    } catch (error) {
                      console.error("Erro ao excluir dizimista:", error);
                      toast.error("Erro ao excluir dizimista");
                    } finally {
                      setIsDeleteModalOpen(false);
                      setDizimistaToDelete(null);
                    }
                  }}
                  className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                >
                  Excluir
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AdminDizimistasPage;

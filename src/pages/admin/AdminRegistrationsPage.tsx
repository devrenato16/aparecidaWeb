// AdminRegistrationsPage.tsx

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

import { generateCatequesePDF } from "../../utils/generateCatequesePDF";

import { formatBirthDate, formatDate } from "../../utils/dateUtils";
import { generateBatismPDF } from "../../utils/generateBatismPDF";
import { generateCrismaAdultoPDF } from "../../utils/generateCrismaAdultoPDF";
import { generateCrismaJovemPDF } from "../../utils/gerenerateCrismaJovemPDF";

const AdminRegistrationsPage = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<FormData[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<
    string | null
  >(null);
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
    setRegistrationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Funções de formatação dos dados
  const formatMaritalStatus = (status: string): string => {
    switch (status) {
      case "casado":
        return "Casado(a)";
      case "moraJunto":
        return "Mora junto";
      case "solteiro":
        return "Não sou casado(a)";
      default:
        return status || "Não informado";
    }
  };

  const formatAvailableTime = (time: string): string => {
    const options = {
      sab_9h30: "Sábado, 9h30 - 11h00",
      sab_11h30: "Sábado, 11h30 - 13h00",
      sab_15h00: "Sábado, 15h00 - 16h30",
      sexta_19h30: "Sexta-Feira, 19h30 - 21h00",
    };
    return options[time as keyof typeof options] || time || "Não informado";
  };
  const formatAvailableDay = (day: string): string => {
    const options = {
      matriz_7h30: "Matriz de Aparecida, 7h30 - 9h00",
      matriz_11h30: "Matriz de Aparecida, 9h30 - 11h00",
      matriz_13h00: "Matriz de Aparecida, 13h00 - 15h00",
      cap_8h00: "Capela São Sebastião, 8h00 - 10h00",
      cap_16h00: "Capela São Pedro e São Paulo, 16h00 - 18h00",
    };
    return options[day as keyof typeof options] || day || "Não informado";
  };

  const formatAvailableLocate = (locate: string): string => {
    const options = {
      matriz: "Matriz de Aparecida",
      capSaoPedro: "Capela São Pedro e São Paulo",
      capSaoSebastiao: "Capela São Sebastião",
    };
    return options[locate as keyof typeof options] || locate || "Não informado";
  };

  const formatSchooling = (schooling: string): string => {
    const options = {
      fundamental_incompleto: "Ensino Fundamental Incompleto",
      fundamental_completo: "Ensino Fundamental Completo",
      medio_incompleto: "Ensino Médio Incompleto",
      medio_completo: "Ensino Médio Completo",
      superior_incompleto: "Ensino Superior Incompleto",
      superior_completo: "Ensino Superior Completo",
      pos_graduacao: "Pós-graduação",
      mestrado: "Mestrado",
      doutorado: "Doutorado",
    };
    return options[schooling as keyof typeof options] || "Não informado";
  };

  const formatDateOfBirth = (date: string): string => {
    return formatBirthDate(date) || "Não informado";
  };

  const formTypeLabels = {
    batismo: "Batismo",
    catecismo: "Catecismo",
    crismaJovem: "Crisma Jovem",
    crismaAdulto: "Crisma Adulto",
  };

  return (
    <>
      <Helmet>
        <title>Gerenciar Inscrições | Paróquia Nossa Senhora Aparecida</title>
      </Helmet>

      {/* Template oculto para PDF */}
      <div id="pdf-template" className="hidden">
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
          </div>
          <SectionTitle
            title="Gerenciar Inscrições"
            subtitle="Visualize ou exclua as inscrições recebidas"
            className="mb-0"
            center
          />

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
                    onClick={() => setActiveFilter("crismaJovem")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === "crismaJovem"
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Crisma Jovem
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-primary-800 uppercase tracking-wider"></th>
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
                {selectedRegistration.formType === "crismaJovem" ||
                  (selectedRegistration.formType === "crismaAdulto" && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Telefone
                      </h4>
                      <p className="text-gray-800">
                        {selectedRegistration.phone}
                      </p>
                    </div>
                  ))}
                {(selectedRegistration.formType === "catecismo" ||
                  selectedRegistration.formType === "batismo") && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Telefone do Responsável
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.phone}
                    </p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-primary-800 mb-1">
                    Data de Nascimento
                  </h4>
                  <p className="text-primary-800 text-sm">
                    {formatDateOfBirth(selectedRegistration.birthdate)}
                  </p>
                </div>
                {selectedRegistration.formType !== "batismo" && (
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Endereço
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.address}
                    </p>
                  </div>
                )}

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

                {selectedRegistration.formType !== "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Comunidade
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.community || "Não informado"}
                    </p>
                  </div>
                )}
                {selectedRegistration.formType !== "batismo" &&
                  selectedRegistration.formType !== "catecismo" && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Escolaridade
                      </h4>
                      <p className="text-gray-800">
                        {formatSchooling(selectedRegistration.schooling)}
                      </p>
                    </div>
                  )}
                {selectedRegistration.formType === "catecismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Série Escolar
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.schooling || "Não informado"}
                    </p>
                  </div>
                )}

                {selectedRegistration.formType !== "catecismo" &&
                  selectedRegistration.formType !== "batismo" && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Participa de algum grupo?
                      </h4>
                      <p className="text-gray-800">
                        {selectedRegistration.groupParticipation ||
                          "Não informado"}
                      </p>
                    </div>
                  )}
                {selectedRegistration.formType !== "batismo" && (
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
                )}
                {selectedRegistration.formType !== "catecismo" &&
                  selectedRegistration.formType !== "batismo" && (
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
                  )}
                {selectedRegistration.formType !== "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Possui alguma necessidade especial?
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.specialNeeds === "sim"
                        ? "Sim"
                        : selectedRegistration.specialNeeds === "nao"
                        ? "Não"
                        : "Não informado"}
                    </p>

                    {selectedRegistration.specialNeeds === "sim" && (
                      <div className="mt-5">
                        <h5 className="text-sm font-semibold text-primary-800">
                          Qual?
                        </h5>
                        <p className="text-gray-800">
                          {selectedRegistration.specialNeedsDetails ||
                            "Não informado"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {selectedRegistration.formType !== "catecismo" &&
                  selectedRegistration.formType !== "batismo" && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Estado Civil
                      </h4>
                      <p className="text-gray-800">
                        {formatMaritalStatus(
                          selectedRegistration.maritalStatus
                        )}
                      </p>
                    </div>
                  )}
                {selectedRegistration.formType !== "batismo" &&
                  selectedRegistration.formType !== "catecismo" && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Horário
                      </h4>
                      <p className="text-gray-800">
                        {formatAvailableTime(
                          selectedRegistration.availableTime
                        )}
                      </p>
                    </div>
                  )}
                {selectedRegistration.formType !== "batismo" &&
                  selectedRegistration.formType === "catecismo" && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Horário
                      </h4>
                      <p className="text-gray-800">
                        {formatAvailableDay(selectedRegistration.availableDay)}
                      </p>
                    </div>
                  )}
                {selectedRegistration.formType === "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Nome da Madrinha
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.godmotherName || "Não informado"}
                    </p>
                  </div>
                )}
                {selectedRegistration.formType === "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Nome do Padrinho
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.godfatherName || "Não informado"}
                    </p>
                  </div>
                )}
                {selectedRegistration.formType === "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Local do Batismo
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.availableLocate
                        ? formatAvailableLocate(
                            selectedRegistration.availableLocate
                          )
                        : "Não informado"}
                    </p>
                  </div>
                )}
                {selectedRegistration.formType === "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Data do Batismo
                    </h4>
                    <p className="text-primary-800 text-sm">
                      {formatDateOfBirth(selectedRegistration.baptismDate)}
                    </p>
                  </div>
                )}
                {selectedRegistration.formType === "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Data da Reunião
                    </h4>
                    <p className="text-primary-800 text-sm">
                      {formatDateOfBirth(selectedRegistration.meetingDate)}
                    </p>
                  </div>
                )}
                {selectedRegistration.formType === "batismo" && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary-800 mb-1">
                      Observações
                    </h4>
                    <p className="text-gray-800">
                      {selectedRegistration.observations || "Não informado"}
                    </p>
                  </div>
                )}

                {selectedRegistration.formType !== "batismo" &&
                  selectedRegistration.formType !== "catecismo" && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Quem é Jesus para você?
                      </h4>
                      <p className="text-gray-800">
                        {selectedRegistration.jesusAnswer || "Não informado"}
                      </p>
                    </div>
                  )}
              </div>
              {selectedRegistration.formType !== "batismo" &&
                selectedRegistration.formType !== "catecismo" && (
                  <div className="md:col-span-2 mt-4">
                    <h4 className="text-sm font-semibold text-primary-800 mb-2">
                      Termo de Compromisso
                    </h4>
                    <p className="text-gray-800 leading-relaxed">
                      Eu,{" "}
                      <strong>
                        {selectedRegistration.name ||
                          selectedRegistration.fullName}
                      </strong>
                      , comprometo-me a participar dos ENCONTROS DE FORMAÇÕES
                      NECESSÁRIOS PARA RECEBER O SACRAMENTO DA CRISMA E
                      PARTICIPAR DA MISSA DOMINICAL e estou consciente que
                      faltando a esses COMPROMISSOS, NÃO poderei ser crismado(a)
                    </p>
                  </div>
                )}
              {selectedRegistration.formType === "catecismo" && (
                <div className="md:col-span-2 mt-4">
                  <h4 className="text-sm font-semibold text-primary-800 mb-2">
                    Termo de Compromisso
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    Eu,{" "}
                    <strong>
                      {selectedRegistration.motherName ||
                        selectedRegistration.fatherName}
                    </strong>
                    , comprometo-me a participar dos ENCONTROS DE FORMAÇÕES
                    NECESSÁRIOS PARA RECEBER O SACRAMENTO DA CRISMA E PARTICIPAR
                    DA MISSA DOMINICAL e estou consciente que faltando a esses
                    COMPROMISSOS, NÃO poderei ser crismado(a)
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedRegistration(null)}
                className="btn btn-outline"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  if (!selectedRegistration) return;

                  const filename = `Cadastro_${selectedRegistration.name}_${
                    new Date().toISOString().split("T")[0]
                  }.pdf`;

                  switch (selectedRegistration.formType) {
                    case "catecismo":
                      generateCatequesePDF(selectedRegistration, filename);
                      break;
                    case "crismaJovem":
                      generateCrismaJovemPDF(selectedRegistration, filename);
                      break;
                    case "crismaAdulto":
                      generateCrismaAdultoPDF(selectedRegistration, filename);
                      break;
                    case "batismo":
                      generateBatismPDF(selectedRegistration, filename);
                      break;
                    default:
                      alert(
                        "Tipo de formulário não suportado para geração de PDF."
                      );
                  }
                }}
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
      {/* Modal de Confirmação de Exclusão */}
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
                Tem certeza que deseja excluir esta inscrição? Esta ação não
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
                    if (!registrationToDelete) return;

                    try {
                      const result = await deleteRegistration(
                        registrationToDelete
                      );
                      if (result.success) {
                        toast.success("Inscrição excluída com sucesso!");
                        setRegistrations((prev) =>
                          prev.filter((reg) => reg.id !== registrationToDelete)
                        );
                        if (selectedRegistration?.id === registrationToDelete) {
                          setSelectedRegistration(null);
                        }
                      } else {
                        toast.error("Erro ao excluir inscrição");
                      }
                    } catch (error) {
                      console.error("Error deleting registration:", error);
                      toast.error("Erro ao excluir inscrição");
                    } finally {
                      setIsDeleteModalOpen(false);
                      setRegistrationToDelete(null);
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

export default AdminRegistrationsPage;

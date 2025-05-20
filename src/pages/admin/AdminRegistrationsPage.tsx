import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Filter, Download, 
  Trash2, Edit, Eye, X 
} from 'lucide-react';
import toast from 'react-hot-toast';

import SectionTitle from '../../components/SectionTitle';
import { getRegistrations, deleteRegistration, FormData } from '../../firebase/firestore';

const AdminRegistrationsPage = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<FormData | null>(null);
  
  useEffect(() => {
    fetchRegistrations();
  }, [activeFilter]);
  
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const data = await getRegistrations(activeFilter || undefined);
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Erro ao carregar inscrições');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteRegistration = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta inscrição?')) return;
    
    try {
      const result = await deleteRegistration(id);
      
      if (result.success) {
        toast.success('Inscrição excluída com sucesso!');
        // Remove from local state
        setRegistrations(prev => prev.filter(reg => reg.id !== id));
        
        // Close details modal if open
        if (selectedRegistration?.id === id) {
          setSelectedRegistration(null);
        }
      } else {
        toast.error('Erro ao excluir inscrição');
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
      toast.error('Erro ao excluir inscrição');
    }
  };
  
  const exportRegistrationsToCSV = () => {
    if (registrations.length === 0) {
      toast.error('Não há inscrições para exportar');
      return;
    }
    
    // Get headers (properties) from the first registration
    const headers = Object.keys(registrations[0]).filter(
      key => key !== 'id' && key !== 'createdAt'
    );
    
    // Add id and formatted date as first columns
    headers.unshift('id', 'data');
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    registrations.forEach(reg => {
      const formattedDate = reg.createdAt instanceof Date 
        ? reg.createdAt.toLocaleDateString() 
        : new Date(reg.createdAt.seconds * 1000).toLocaleDateString();
      
      const row = headers.map(header => {
        if (header === 'id') return reg.id || '';
        if (header === 'data') return formattedDate;
        
        let value = reg[header];
        
        // Handle values with commas by enclosing them in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        
        return value !== undefined ? value : '';
      }).join(',');
      
      csvContent += row + '\n';
    });
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `inscricoes_${activeFilter || 'todas'}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Relatório exportado com sucesso!');
  };
  
  const formatDate = (date: Date | any) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('pt-BR');
    }
    
    return new Date(date.seconds * 1000).toLocaleDateString('pt-BR');
  };
  
  const formTypeLabels = {
    'batismo': 'Batismo',
    'catecismo': 'Catecismo',
    'crisma': 'Crisma',
    'casamento': 'Casamento'
  };
  
  return (
    <>
      <Helmet>
        <title>Gerenciar Inscrições | Paróquia Nossa Senhora Aparecida</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-100 pt-24 pb-12">
        <div className="container-custom">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/admin')} 
              className="flex items-center mr-4 text-primary-700 hover:text-primary-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Voltar</span>
            </button>
            
            <SectionTitle 
              title="Gerenciar Inscrições" 
              subtitle="Visualize, edite ou exclua as inscrições recebidas"
              className="mb-0"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Filtrar por:</span>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveFilter(null)} 
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === null 
                        ? 'bg-primary-700 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  
                  <button 
                    onClick={() => setActiveFilter('batismo')} 
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === 'batismo' 
                        ? 'bg-primary-700 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Batismo
                  </button>
                  
                  <button 
                    onClick={() => setActiveFilter('catecismo')} 
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === 'catecismo' 
                        ? 'bg-primary-700 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Catecismo
                  </button>
                  
                  <button 
                    onClick={() => setActiveFilter('crisma')} 
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === 'crisma' 
                        ? 'bg-primary-700 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Crisma
                  </button>
                  
                  <button 
                    onClick={() => setActiveFilter('casamento')} 
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeFilter === 'casamento' 
                        ? 'bg-primary-700 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Casamento
                  </button>
                </div>
              </div>
              
              <button 
                onClick={exportRegistrationsToCSV} 
                className="flex items-center text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-1" />
                Exportar CSV
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center p-12">
                <p className="text-gray-500">Nenhuma inscrição encontrada</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        E-mail
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telefone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((registration) => (
                      <tr key={registration.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{registration.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{registration.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            {formTypeLabels[registration.formType] || registration.formType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(registration.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setSelectedRegistration(registration)}
                            className="text-primary-600 hover:text-primary-900 mx-2"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRegistration(registration.id!)}
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
      
      {/* Registration Details Modal */}
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
                <p className="text-gray-500 text-sm">
                  {formTypeLabels[selectedRegistration.formType] || selectedRegistration.formType} - {formatDate(selectedRegistration.createdAt)}
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
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Nome</h4>
                  <p className="text-gray-800">{selectedRegistration.name}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">E-mail</h4>
                  <p className="text-gray-800">{selectedRegistration.email}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Telefone</h4>
                  <p className="text-gray-800">{selectedRegistration.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Data de Nascimento</h4>
                  <p className="text-gray-800">{selectedRegistration.birthdate}</p>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Endereço</h4>
                  <p className="text-gray-800">{selectedRegistration.address}</p>
                </div>
                
                {selectedRegistration.formType === 'batismo' && (
                  <>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Nome dos Pais</h4>
                      <p className="text-gray-800">{selectedRegistration.parentName}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Nome dos Padrinhos</h4>
                      <p className="text-gray-800">{selectedRegistration.godparentName}</p>
                    </div>
                  </>
                )}
                
                {selectedRegistration.formType === 'casamento' && (
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Nome do(a) Noivo(a)</h4>
                    <p className="text-gray-800">{selectedRegistration.partnerName}</p>
                  </div>
                )}
                
                {selectedRegistration.notes && (
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Observações</h4>
                    <p className="text-gray-800">{selectedRegistration.notes}</p>
                  </div>
                )}
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
                onClick={() => handleDeleteRegistration(selectedRegistration.id!)}
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
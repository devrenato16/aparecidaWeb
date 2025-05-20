import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import SectionTitle from '../../components/SectionTitle';
import FormField from '../../components/FormField';
import { getSiteSettings, updateSiteSettings } from '../../firebase/firestore';
import { uploadFile } from '../../firebase/storage';

interface SiteSettingsForm {
  churchName: string;
  address: string;
  phone: string;
  email: string;
  pixKey: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  heroTitle: string;
  heroSubtitle: string;
}

const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SiteSettingsForm>();
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getSiteSettings();
        
        if (settings) {
          reset({
            churchName: settings.churchName || '',
            address: settings.address || '',
            phone: settings.phone || '',
            email: settings.email || '',
            pixKey: settings.pixKey || '',
            facebookUrl: settings.facebookUrl || '',
            instagramUrl: settings.instagramUrl || '',
            youtubeUrl: settings.youtubeUrl || '',
            heroTitle: settings.heroTitle || '',
            heroSubtitle: settings.heroSubtitle || '',
          });
          
          if (settings.heroImageUrl) {
            setHeroImagePreview(settings.heroImageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
        toast.error('Erro ao carregar as configurações do site');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [reset]);
  
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setHeroImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: SiteSettingsForm) => {
    setSaving(true);
    
    try {
      let heroImageUrl = heroImagePreview;
      
      // Upload new hero image if provided
      if (heroImage) {
        const filePath = `settings/hero-${Date.now()}.${heroImage.name.split('.').pop()}`;
        const uploadResult = await uploadFile(heroImage, filePath);
        
        if (uploadResult.success) {
          heroImageUrl = uploadResult.downloadURL;
        } else {
          throw new Error('Failed to upload hero image');
        }
      }
      
      // Update site settings
      const result = await updateSiteSettings({
        ...data,
        heroImageUrl,
        updatedAt: new Date()
      });
      
      if (result.success) {
        toast.success('Configurações atualizadas com sucesso!');
      } else {
        throw new Error('Failed to update site settings');
      }
    } catch (error) {
      console.error('Error saving site settings:', error);
      toast.error('Erro ao salvar as configurações do site');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Configurações | Paróquia Nossa Senhora Aparecida</title>
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
              title="Configurações do Site" 
              subtitle="Altere as informações exibidas no site"
              className="mb-0"
            />
          </div>
          
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-elevation-1 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Informações da Paróquia
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Nome da Paróquia"
                    name="churchName"
                    register={register}
                    error={errors.churchName}
                    options={{ required: 'O nome da paróquia é obrigatório' }}
                  />
                  
                  <FormField
                    label="Endereço"
                    name="address"
                    register={register}
                    error={errors.address}
                    options={{ required: 'O endereço é obrigatório' }}
                  />
                  
                  <FormField
                    label="Telefone"
                    name="phone"
                    register={register}
                    error={errors.phone}
                    options={{ required: 'O telefone é obrigatório' }}
                  />
                  
                  <FormField
                    label="E-mail"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email}
                    options={{ required: 'O e-mail é obrigatório' }}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Configurações de Pagamento
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Chave PIX"
                    name="pixKey"
                    register={register}
                    error={errors.pixKey}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Redes Sociais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Facebook URL"
                    name="facebookUrl"
                    register={register}
                    error={errors.facebookUrl}
                  />
                  
                  <FormField
                    label="Instagram URL"
                    name="instagramUrl"
                    register={register}
                    error={errors.instagramUrl}
                  />
                  
                  <FormField
                    label="YouTube URL"
                    name="youtubeUrl"
                    register={register}
                    error={errors.youtubeUrl}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Banner Principal
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <FormField
                    label="Título do Banner"
                    name="heroTitle"
                    register={register}
                    error={errors.heroTitle}
                    options={{ required: 'O título do banner é obrigatório' }}
                  />
                  
                  <FormField
                    label="Subtítulo do Banner"
                    name="heroSubtitle"
                    register={register}
                    error={errors.heroSubtitle}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagem do Banner
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer">
                      <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Imagem
                      </div>
                      <input 
                        type="file"
                        accept="image/*" 
                        onChange={handleHeroImageChange}
                        className="hidden"
                      />
                    </label>
                    
                    <span className="text-xs text-gray-500">
                      Tamanho recomendado: 1920x1080px
                    </span>
                  </div>
                  
                  {heroImagePreview && (
                    <div className="mt-4 relative">
                      <img 
                        src={heroImagePreview} 
                        alt="Banner preview" 
                        className="w-full max-h-64 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setHeroImagePreview(null);
                          setHeroImage(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="btn btn-primary flex items-center"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      <span>Salvar Configurações</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSettingsPage;
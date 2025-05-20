import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../contexts/AuthContext';
import FormField from '../components/FormField';
import Logo from '../components/Logo';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';
  
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    try {
      const result = await login(data.email, data.password);
      
      if (result.user) {
        toast.success('Login realizado com sucesso!');
        navigate(from, { replace: true });
      } else {
        toast.error(result.error || 'Falha na autenticação. Verifique suas credenciais.');
      }
    } catch (error) {
      toast.error('Ocorreu um erro. Por favor, tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Login | Paróquia Nossa Senhora Aparecida</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-elevation-2">
          <div className="text-center">
            <div className="flex justify-center">
              <Logo className="h-16 w-16" />
            </div>
            <h2 className="mt-6 text-3xl font-serif font-bold text-primary-800">
              Área Restrita
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Acesso administrativo da Paróquia Nossa Senhora Aparecida
            </p>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <div className="bg-primary-50 p-3 rounded-full text-primary-700">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="E-mail"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              options={{ 
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido'
                }
              }}
              placeholder="seu@email.com"
            />
            
            <FormField
              label="Senha"
              name="password"
              type="password"
              register={register}
              error={errors.password}
              options={{ required: 'Senha é obrigatória' }}
              placeholder="Sua senha"
            />
            
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
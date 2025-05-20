import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';

const LocationPage = () => {
  // Sample coordinates - replace with actual church coordinates
  const position = [-23.550520, -46.633308];

  return (
    <>
      <Helmet>
        <title>Localização e Contato | Paróquia Nossa Senhora Aparecida</title>
        <meta 
          name="description" 
          content="Encontre a Paróquia Nossa Senhora Aparecida. Veja nosso endereço, telefone e como chegar." 
        />
      </Helmet>
      
      <Hero
        title="Localização e Contato"
        subtitle="Encontre nossa paróquia e entre em contato conosco"
        backgroundImage="https://images.pexels.com/photos/258076/pexels-photo-258076.jpeg"
      />
      
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionTitle 
                title="Nossa Localização" 
                subtitle="Venha nos visitar e participar das nossas celebrações"
              />
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-secondary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-800 text-lg">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Nossa Senhora Aparecida, 100<br />
                      Centro - São Paulo/SP<br />
                      CEP: 01000-000
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-secondary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-800 text-lg">Telefones</h3>
                    <p className="text-gray-600">
                      Secretaria: (11) 9999-9999<br />
                      Pastoral: (11) 9999-8888
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-secondary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-800 text-lg">E-mail</h3>
                    <p className="text-gray-600">
                      contato@paroquiaaparecida.com.br
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-secondary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-800 text-lg">Horário de Atendimento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 8h às 12h e 14h às 18h<br />
                      Sábado: 8h às 12h
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-full min-h-[400px]"
            >
              <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Paróquia Nossa Senhora Aparecida
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Como Chegar" 
            subtitle="Confira as opções para chegar até nossa paróquia"
            center
          />
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-elevation-1"
            >
              <h3 className="font-serif text-xl text-primary-800 mb-3">De Carro</h3>
              <p className="text-gray-600">
                Estacionamento próprio com entrada pela Rua das Flores, 100. Gratuito para participantes das missas.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-elevation-1"
            >
              <h3 className="font-serif text-xl text-primary-800 mb-3">Transporte Público</h3>
              <p className="text-gray-600">
                Metrô: Estação Aparecida (Linha Azul), saída norte, 5 minutos a pé.
                Ônibus: Linhas 123, 456 e 789 param em frente à igreja.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-elevation-1"
            >
              <h3 className="font-serif text-xl text-primary-800 mb-3">Acessibilidade</h3>
              <p className="text-gray-600">
                A paróquia possui acesso facilitado para pessoas com mobilidade reduzida, com rampas e elevador.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionTitle 
              title="Entre em Contato" 
              subtitle="Envie-nos uma mensagem, ficaremos felizes em atendê-lo"
              center
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <form className="bg-white p-8 rounded-lg shadow-elevation-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="input-field" 
                      placeholder="Seu nome completo" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="input-field" 
                      placeholder="seu@email.com" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="input-field" 
                      placeholder="(00) 00000-0000" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Assunto
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="input-field" 
                      placeholder="Assunto da mensagem" 
                    />
                  </div>
                  
                  <div className="mb-4 md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem
                    </label>
                    <textarea 
                      id="message" 
                      className="input-field h-32 resize-none" 
                      placeholder="Digite sua mensagem"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button type="submit" className="btn btn-primary w-full">
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
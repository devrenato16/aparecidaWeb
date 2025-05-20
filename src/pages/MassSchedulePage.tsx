import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';

const MassSchedulePage = () => {
  const schedules = [
    {
      day: 'Domingo',
      times: ['8h00', '10h00', '19h00'],
      type: 'Missa'
    },
    {
      day: 'Segunda-feira',
      times: [],
      type: 'Não há celebrações'
    },
    {
      day: 'Terça-feira',
      times: ['19h30'],
      type: 'Missa'
    },
    {
      day: 'Quarta-feira',
      times: ['19h30'],
      type: 'Missa'
    },
    {
      day: 'Quinta-feira',
      times: ['19h30'],
      type: 'Missa e Adoração ao Santíssimo'
    },
    {
      day: 'Sexta-feira',
      times: ['19h30'],
      type: 'Missa'
    },
    {
      day: 'Sábado',
      times: ['18h00'],
      type: 'Missa'
    }
  ];

  const specialCelebrations = [
    {
      title: 'Missa da Família',
      schedule: 'Primeiro domingo do mês às 10h',
      description: 'Celebração especial com bênção das famílias'
    },
    {
      title: 'Adoração ao Santíssimo',
      schedule: 'Quintas-feiras das 15h às 19h30',
      description: 'Momento de oração e intimidade com o Senhor'
    },
    {
      title: 'Confissões',
      schedule: 'Quartas e sextas das 15h às 17h',
      description: 'Sacramento da Reconciliação'
    },
    {
      title: 'Novena Perpétua',
      schedule: 'Terças-feiras às 19h',
      description: 'Novena em honra a Nossa Senhora Aparecida'
    },
  ];

  return (
    <>
      <Helmet>
        <title>Horários de Missas | Paróquia Nossa Senhora Aparecida</title>
        <meta 
          name="description" 
          content="Confira os horários de missas, confissões e eventos na Paróquia Nossa Senhora Aparecida." 
        />
      </Helmet>
      
      <Hero
        title="Horários de Missas"
        subtitle="Confira os horários das celebrações em nossa paróquia"
        backgroundImage="https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg"
      />
      
      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="Missas Semanais" 
            subtitle="Participe das nossas celebrações eucarísticas"
            center
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {schedules.map((schedule, index) => (
              <motion.div
                key={schedule.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  title={schedule.day}
                  icon={<Calendar className="h-6 w-6" />}
                >
                  <div>
                    {schedule.times.length > 0 ? (
                      <>
                        <p className="text-gray-700 font-medium mb-2">{schedule.type}</p>
                        <div className="flex flex-col space-y-1">
                          {schedule.times.map((time) => (
                            <div key={time} className="flex items-center">
                              <Clock className="h-4 w-4 text-primary-600 mr-2" />
                              <span className="text-gray-600">{time}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500 italic">Não há celebrações</p>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Celebrações Especiais" 
            subtitle="Momentos especiais na vida da nossa comunidade"
            center
          />
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialCelebrations.map((celebration, index) => (
              <motion.div
                key={celebration.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-elevation-1 p-6"
              >
                <h3 className="text-xl font-serif text-primary-800 mb-2">
                  {celebration.title}
                </h3>
                <p className="text-gray-600 font-medium flex items-center mb-2">
                  <Clock className="h-4 w-4 text-secondary mr-2" />
                  {celebration.schedule}
                </p>
                <p className="text-gray-600">
                  {celebration.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section relative bg-primary-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'url(/src/assets/pattern-light.svg)',
            opacity: 0.05
          }}
        ></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle 
              title="Festa da Padroeira" 
              subtitle={
                <p className="text-white/90">
                  A festa de Nossa Senhora Aparecida é celebrada anualmente em 12 de outubro, 
                  com novenas, procissão e programação especial. Participe conosco deste momento 
                  de fé e devoção à Mãe Aparecida.
                </p>
              }
              center
              lineColor="secondary"
              className="text-white"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10 bg-white/10 backdrop-blur-sm p-6 rounded-lg"
            >
              <h3 className="text-xl font-serif font-semibold mb-4 text-secondary">
                Programação da Festa 2025
              </h3>
              
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">3 a 11 de Outubro</p>
                    <p className="text-white/80">Novena em honra à Nossa Senhora Aparecida, às 19h30</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">12 de Outubro</p>
                    <p className="text-white/80">Missas às 7h, 9h, 11h, 15h e 19h</p>
                    <p className="text-white/80">Procissão às 17h</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Heart className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Quermesse</p>
                    <p className="text-white/80">Dias 11, 12 e 13 de Outubro, após as celebrações</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Local</p>
                    <p className="text-white/80">Praça da Matriz e dependências da Paróquia</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MassSchedulePage;
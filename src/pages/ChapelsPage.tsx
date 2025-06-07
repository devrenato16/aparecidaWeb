import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

import capelas from "../assets/capelas.webp";

const ChapelsPage = () => {
  const schedules = [
    {
      name: "São Pedro e São Paulo",
      times: ["Sábado às 18h30"],
    },
    {
      name: "Santa Maria Mãe de Deus",
      times: ["2º e 4º sábado às 18h30"],
    },
    {
      name: "São Sebastião",
      times: ["Domingo às 16h00"],
    },
    {
      name: "Nossa Senhora de Guadalupe",
      times: ["1º e 3º sábado às 19h00"],
    },
  ];

  const specialCelebrations = [
    {
      title: "Adoração Capela São Pedro e São Paulo",
      schedule: "Terça-feira às 19h30",
      description: "Momento de oração e intimidade com o Senhor",
    },
    {
      title: "Cenáculo Mariano Capela São Sebastião",
      schedule: "Terça-feira às 19h30",
      description: "Orações à Nossa Senhora",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Horários | Paróquia de Aparecida</title>
        <meta
          name="description"
          content="Confira os horários de capelas, confissões e eventos na Paróquia de Aparecida."
        />
      </Helmet>

      <Hero
        title="Capelas"
        subtitle="Confira os horários em nossas capelas"
        backgroundImage={capelas}
      />

      <section className="section">
        <div className="container-custom">
          <SectionTitle title="Missas" center />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {schedules.map((schedule, index) => (
              <motion.div
                key={schedule.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  title={schedule.name}
                  icon={<Calendar className="h-6 w-6" />}
                >
                  <div>
                    {schedule.times.length > 0 ? (
                      <>
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
          <SectionTitle title="Adorações e Momentos de Oração" center />

          <div className="mt-10 grid grid-cols1 md:grid-cols-2 gap-8">
            {specialCelebrations.map((celebration, index) => (
              <motion.div
                key={celebration.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-elevation-1 p-6"
              >
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-1">
                  {celebration.title}
                </h3>
                <p className="text-gray-400 ">{celebration.description}</p>
                <p className="text-gray-600 font-medium flex items-center mt-10">
                  <Clock className="h-4 w-4 text-secondary mr-2" />
                  {celebration.schedule}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ChapelsPage;

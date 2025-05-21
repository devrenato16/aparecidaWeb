import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

import missa from "../assets/missa.webp";

const MassSchedulePage = () => {
  const schedules = [
    {
      day: "Domingo",
      times: ["6h30", "9h30", "17h30"],
    },
    {
      day: "Segunda-feira",
      times: [],
      type: "Não há celebrações",
    },
    {
      day: "Terça-feira",
      times: ["19h00"],
    },
    {
      day: "Quarta-feira",
      times: ["19h00"],
    },
    {
      day: "Quinta-feira",
      times: ["19h00"],
    },
    {
      day: "Sexta-feira",
      times: ["19h00"],
    },
    {
      day: "Sábado",
      times: ["18h00"],
    },
  ];

  const specialCelebrations = [
    {
      title: "Adoração ao Santíssimo Sacramento",
      schedule: "Quintas-feiras das 15h00 às 18h00",
      schedule2: "Quintas-feiras das 20h00 às 21h00",
      description: "Momento de oração e intimidade com o Senhor",
    },
    {
      title: "Confissões",
      schedule: "Quartas e sextas das 15h00 às 18h00",
      schedule2: "Quintas-feiras das 20h00 às 21h00",
      description: "Sacramento da Reconciliação",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Horários | Paróquia de Aparecida</title>
        <meta
          name="description"
          content="Confira os horários de missas, confissões e eventos na Paróquia de Aparecida."
        />
      </Helmet>

      <Hero
        title="Horários de Missas"
        subtitle="Confira os horários em nossa paróquia"
        backgroundImage={missa}
      />

      <section className="section">
        <div className="container-custom">
          <SectionTitle title="Missas Semanais" center />

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
                        <p className="text-gray-700 font-medium mb-2">
                          {schedule.type}
                        </p>
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
          <SectionTitle title="Adorações e Confissões" center />

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
                <h3 className="text-xl font-serif text-primary-800 mb-1">
                  {celebration.title}
                </h3>
                <p className="text-gray-400">{celebration.description}</p>
                <p className="text-gray-600 font-medium flex items-center mt-10">
                  <Clock className="h-4 w-4 text-secondary mr-2" />
                  {celebration.schedule}
                </p>
                <p className="text-gray-600 font-medium flex items-center mt-2">
                  <Clock className="h-4 w-4 text-secondary mr-2" />
                  {celebration.schedule2}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MassSchedulePage;

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  MapPin,
  ChevronRight,
  PlusCircle,
  HandHeart,
  CalendarClock,
  Flame,
} from "lucide-react";

import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

import aparecida from "../assets/aparecida.webp";

import { PiHandsPrayingBold } from "react-icons/pi";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Paróquia Nossa Senhora da Conceição Aparecida</title>
        <meta
          name="description"
          content="Paróquia Nossa Senhora Aparecida - Venha fazer parte da nossa comunidade de fé, esperança e caridade sob a proteção de Nossa Senhora Aparecida."
        />
      </Helmet>

      <Hero
        title="Paróquia Nossa Senhora da Conceição Aparecida"
        subtitle="Acolhendo com fé, esperança e caridade sob a proteção de Nossa Senhora Aparecida"
        backgroundImage={aparecida}
        buttons={
          <>
            <Link to="/inscricoes" className="btn btn-secondary">
              Inscrições Online
            </Link>
            <Link
              to="/dizimo"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-800"
            >
              Contribuir com Dízimo
            </Link>
          </>
        }
      />

      {/* Welcome Section */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-primary-800 mb-6">
              "Bem-aventurados os puros de coração, porque verão a Deus."
            </h2>
            <p className="text-lg text-gray-600 italic">Mateus 5:8</p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle title="Serviços Paroquiais" center />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                title="Batismo"
                icon={<PiHandsPrayingBold className="h-8 w-8" />}
              >
                <p className="text-gray-600 mb-4">
                  Preparação para o Sacramento do Batismo e informações sobre
                  agendamento.
                </p>
                <Link
                  to="/inscricoes"
                  className="text-primary-700 font-medium flex items-center group"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card title="Catequese" icon={<PlusCircle className="h-8 w-8" />}>
                <p className="text-gray-600 mb-4">
                  Primeira Eucaristia, Crisma e formação contínua para todas as
                  idades.
                </p>
                <Link
                  to="/inscricoes"
                  className="text-primary-700 font-medium flex items-center group"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card title="Crisma" icon={<Flame className="h-8 w-8" />}>
                <p className="text-gray-600 mb-4">
                  Preparação para o Sacramento da Crisma e informações sobre
                  agendamento.
                </p>
                <Link
                  to="/inscricoes"
                  className="text-primary-700 font-medium flex items-center group"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card title="Dízimo" icon={<HandHeart className="h-8 w-8" />}>
                <p className="text-gray-600 mb-4">
                  Contribua com a manutenção da paróquia e apoie nossas obras
                  sociais.
                </p>
                <Link
                  to="/dizimo"
                  className="text-primary-700 font-medium flex items-center group"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card
                title="Horários de Missa"
                icon={<CalendarClock className="h-8 w-8" />}
              >
                <p className="text-gray-600 mb-4">
                  Confira os horários das missas, confissões e atendimento
                  paroquial.
                </p>
                <Link
                  to="/horarios"
                  className="text-primary-700 font-medium flex items-center group"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card title="Como Chegar" icon={<MapPin className="h-8 w-8" />}>
                <p className="text-gray-600 mb-4">
                  Veja nosso endereço, localização e formas de contato.
                </p>
                <Link
                  to="/localizacao"
                  className="text-primary-700 font-medium flex items-center group"
                >
                  Saiba mais
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-700 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/src/assets/pattern-light.svg)",
            opacity: 0.03,
          }}
        ></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              title={
                <p className="text-white/80">
                  Venha fazer parte da nossa comunidade
                </p>
              }
              subtitle={
                <p className="text-white/80">
                  Participe das nossas celebrações, grupos de oração e
                  atividades comunitárias. Nossa comunidade acolhe a todos com
                  amor e alegria.
                </p>
              }
              center
              lineColor="white"
              className="text-white"
            />

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/horarios" className="btn btn-secondary">
                Horários de Missas
              </Link>
              <Link
                to="/sobre"
                className="btn border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-700"
              >
                Como Chegar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

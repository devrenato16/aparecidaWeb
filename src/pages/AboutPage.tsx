import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";

import basilica from "../assets/basilica.webp";
import altar from "../assets/altar.webp";
import Location from "../components/LocationSection";
import video from "../assets/video.mp4"

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Sobre a Paróquia | Nossa Senhora Aparecida</title>
        <meta
          name="description"
          content="Conheça a história, missão e valores da Paróquia Nossa Senhora Aparecida."
        />
      </Helmet>

      <Hero
        title="Sobre Nossa Paróquia"
        subtitle="Conheça um pouco mais sobre nossa história e missão"
        backgroundImage={altar}
      />

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                title="Nossa História"
                subtitle="A Paróquia Nossa Senhora Aparecida foi fundada em 1970, tornando-se um importante centro de fé e devoção mariana."
              />

              <p className="text-gray-600 mb-4">
                Nossa comunidade nasceu do sonho de um grupo de devotos que
                desejavam ter um espaço dedicado à Nossa Senhora Aparecida. A
                primeira missa foi celebrada no dia 12 de outubro de 1970, na
                festa da padroeira do Brasil.
              </p>

              <p className="text-gray-600 mb-4">
                Desde então, nossa paróquia tem crescido e se tornado um farol
                de fé, esperança e caridade para toda a comunidade. Milhares de
                fiéis já passaram por aqui, recebendo os sacramentos e
                participando ativamente da vida em comunidade.
              </p>

              <p className="text-gray-600">
                Hoje, contamos com diversos grupos e pastorais, sempre
                trabalhando para levar a Palavra de Deus e o amor de Nossa
                Senhora Aparecida a todos os corações.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-elevation-2"
            >
              <video
                src={video}
                controls
                autoPlay
                loop
                className="w-full h-60 sm:h-80 md:h-96 object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle title="Nossa Missão" center />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-elevation-1 border-t-4 border-primary-700"
            >
              <h3 className="font-serif text-xl text-primary-800 mb-3">
                Evangelização
              </h3>
              <p className="text-gray-600">
                Anunciar a Boa Nova de Jesus Cristo, formando discípulos
                missionários à luz dos ensinamentos da Igreja Católica e sob a
                proteção de Nossa Senhora Aparecida.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-elevation-1 border-t-4 border-primary-800"
            >
              <h3 className="font-serif text-xl text-primary-800 mb-3">
                Comunhão
              </h3>
              <p className="text-gray-600">
                Promover a unidade entre os fiéis, construindo uma comunidade
                acolhedora, onde todos possam se sentir parte da família de Deus
                e crescer juntos na fé.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-elevation-1 border-t-4 border-primary-800"
            >
              <h3 className="font-serif text-xl text-primary-800 mb-3">
                Caridade
              </h3>
              <p className="text-gray-600">
                Servir aos mais necessitados com amor e dedicação, seguindo o
                exemplo de Jesus Cristo e manifestando concretamente o amor de
                Deus através de ações sociais.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-elevation-2 order-2 md:order-1"
            >
              <img
                src={basilica}
                alt="Nossa Senhora Aparecida"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <SectionTitle
                title="Nossa Padroeira"
                subtitle="Nossa Senhora Aparecida, padroeira do Brasil, é nosso modelo de fé e serviço a Deus."
              />

              <p className="text-gray-600 mb-4">
                A história de Nossa Senhora Aparecida começou em outubro de
                1717, quando três pescadores encontraram a imagem da Virgem
                Maria nas águas do Rio Paraíba do Sul. Após esse encontro, os
                pescadores tiveram uma pesca abundante, o que foi considerado o
                primeiro milagre atribuído à santa.
              </p>

              <p className="text-gray-600 mb-4">
                A devoção à Nossa Senhora Aparecida cresceu por todo o Brasil, e
                em 1930 ela foi proclamada oficialmente como Padroeira do Brasil
                pelo Papa Pio XI.
              </p>

              <p className="text-gray-600">
                Em nossa paróquia, honramos especialmente Nossa Senhora
                Aparecida, buscando seguir seu exemplo de fé, humildade e
                serviço a Deus e ao próximo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="section bg-primary-700 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-6 text-white">
              Localização e Contato
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-center text-secondary-500">
              Saiba como chegar à nossa paróquia e entre em contato conosco.
            </p>
          </div>
        </div>
        <Location />
      </section>
    </>
  );
};

export default AboutPage;

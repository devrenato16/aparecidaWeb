import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Heart,
  DollarSign,
  BrickWall,
  HandHeart,
  BookOpenText,
} from "lucide-react";
import toast from "react-hot-toast";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

import hands from "../assets/hands.webp";

const TithePage = () => {
  return (
    <>
      <Helmet>
        <title>Dízimo | Paróquia Nossa Senhora Aparecida</title>
        <meta
          name="description"
          content="Contribua com o dízimo da Paróquia Nossa Senhora Aparecida e ajude a manter as obras sociais e pastorais."
        />
      </Helmet>

      <Hero
        title="Dízimo"
        subtitle="Gesto concreto de amor e partilha"
        backgroundImage={hands}
      />

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                title="O que é o Dízimo?"
                subtitle="O dízimo é um gesto concreto de gratidão a Deus e corresponsabilidade com a comunidade."
              />

              <p className="text-gray-600 mb-4">
                O dízimo não é uma taxa ou mensalidade, mas um compromisso livre
                e consciente que nasce da fé. É a devolução a Deus de uma parte
                do que Ele nos concede, reconhecendo que tudo vem dEle.
              </p>

              <p className="text-gray-600 mb-4">
                Na Bíblia, encontramos várias referências ao dízimo, como em
                Malaquias 3,10:{" "}
                <em>
                  "Trazei o dízimo integral para o tesouro, para que haja
                  alimento em minha casa. Fazei a prova - diz o Senhor dos
                  Exércitos - e vereis se não vos abro as comportas do céu e não
                  derramo sobre vós bênçãos sem medida!"
                </em>
              </p>

              <p className="text-gray-600">
                O dízimo contribui para a manutenção da igreja, o sustento dos
                ministros, a evangelização e as obras de caridade. É um ato de
                fé, gratidão e partilha.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg"
                alt="Mãos em gesto de partilha"
                className="w-full h-auto rounded-lg shadow-elevation-2"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Para Onde Vai o Dízimo"
            subtitle="Saiba como sua contribuição é utilizada em nossa comunidade"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card title="Manutenção" icon={<BrickWall className="h-8 w-8" />}>
                <p className="text-gray-600">
                  Manutenção da igreja, reformas, limpeza, água, luz, internet e
                  despesas administrativas da paróquia.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                title="Evangelização"
                icon={<BookOpenText className="h-8 w-8" />}
              >
                <p className="text-gray-600">
                  Catequese, liturgia, pastoral da comunicação, formações,
                  eventos e encontros para a comunidade.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card title="Caridade" icon={<HandHeart className="h-8 w-8" />}>
                <p className="text-gray-600">
                  Ações sociais, auxílio a famílias necessitadas, cesta básica e
                  projetos de assistência social.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle
            title="Como Contribuir"
            subtitle="Existem várias formas de fazer sua contribuição"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-elevation-2 border border-gray-100"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-secondary/10 p-4 rounded-full">
                  <DollarSign className="h-10 w-10 text-secondary" />
                </div>
              </div>

              <h3 className="text-xl font-serif text-center text-primary-800 mb-4">
                Transferência ou PIX
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Banco</p>
                  <p className="text-gray-800 font-medium">Banco do Brasil</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Agência</p>
                  <p className="text-gray-800 font-medium">1234-5</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Conta</p>
                  <p className="text-gray-800 font-medium">12345-6</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Chave PIX (CNPJ)</p>
                  <div className="flex items-center justify-between">
                    <p
                      id="pix-key"
                      className="text-gray-800 font-medium truncate flex-1"
                    >
                      00.000.000/0000-00
                    </p>
                    <button
                      onClick={() => {
                        const pixKey = "00.000.000/0000-00";
                        navigator.clipboard.writeText(pixKey).then(() => {
                          toast.success(
                            "Chave PIX copiada! Cole no app do seu banco."
                          );
                        });
                      }}
                      className="ml-2 text-primary-700 focus:outline-none"
                      aria-label="Copiar chave PIX"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-elevation-2 border border-gray-100"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary-700/10 p-4 rounded-full">
                  <Heart className="h-10 w-10 text-primary-700" />
                </div>
              </div>

              <h3 className="text-xl font-serif text-center text-primary-800 mb-4">
                Presencialmente
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">
                    Envelope de Dízimo
                  </p>
                  <p className="text-gray-600">
                    Envelopes disponíveis na secretaria e durante as missas.
                    Você pode depositá-los na caixinha do dízimo.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">
                    Secretaria Paroquial
                  </p>
                  <p className="text-gray-600">
                    Segunda a sexta, das 8h às 12h e das 14h às 18h
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">
                    Pastoral do Dízimo
                  </p>
                  <p className="text-gray-600">
                    Após as missas de domingo, ou durante a semana na
                    secretaria.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              title={<p className="text-white/80">Seja um dizimista</p>}
              subtitle={
                <p className="text-white/80">
                  "Cada um dê conforme determinou em seu coração, não com pesar
                  ou por obrigação, pois Deus ama quem dá com alegria." (2
                  Coríntios 9,7)
                </p>
              }
              center
              lineColor="white"
              className="text-white"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
                <p className="text-white/90 mb-4">
                  Ao se tornar um dizimista, você não apenas contribui
                  financeiramente, mas participa ativamente da missão
                  evangelizadora da Igreja. Sua contribuição regular, planejada
                  e proporcional ajuda a manter as atividades pastorais e
                  assistenciais da paróquia.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <a href="#" className="btn btn-secondary">
                    Cadastre-se como Dizimista
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TithePage;

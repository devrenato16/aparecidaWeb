import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { PlusCircle, Flame } from "lucide-react";
import toast from "react-hot-toast";

import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

import { addRegistration } from "../firebase/firestore";

import sacramentos from "../assets/sacramentos.webp";
import { PiHandsPrayingBold } from "react-icons/pi";
import BatismoForm from "../components/BatsimoForm";
import CrismaForm from "../components/CrismaForm";

import { CatequeseForm } from "../components/CatequeseForm";
import { CrismaAdultoForm } from "../components/CrismaAdultoForm";

type RegistrationType = "batismo" | "catecismo" | "crisma" | "crismaAdulto";

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
  formType: RegistrationType;
  // Additional fields
  parentName?: string;
  godparentName?: string;
  partnerName?: string;
  notes?: string;
}

const RegistrationPage = () => {
  const [activeForm, setActiveForm] = useState<RegistrationType | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const onSubmit = async (data: RegistrationFormData) => {
    if (!activeForm) return;

    setLoading(true);

    try {
      const result = await addRegistration({
        ...data,
        formType: activeForm,
      });

      if (result.success) {
        toast.success("Inscrição realizada com sucesso!");
        reset();
        setActiveForm(null);
      } else {
        toast.error("Erro ao realizar inscrição. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao realizar inscrição. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formTypes = [
    {
      id: "batismo",
      title: "Batismo",
      icon: <PiHandsPrayingBold className="h-8 w-8" />,
      description:
        "Sacramento de iniciação cristã, pelo qual nos tornamos filhos de Deus.",
    },
    {
      id: "catecismo",
      title: "Catecismo",
      icon: <PlusCircle className="h-8 w-8" />,
      description:
        "Preparação para a Primeira Eucaristia, destinada a crianças a partir de 9 anos.",
    },
    {
      id: "crisma",
      title: "Crisma",
      icon: <Flame className="h-8 w-8" />,
      description:
        "Sacramento que confirma o Batismo e fortalece os dons do Espírito Santo.",
    },
    {
      id: "crismaAdulto",
      title: "Crisma Adulto",
      icon: <Flame className="h-8 w-8" />,
      description:
        "Para adultos que ainda não receberam o Sacramento da Crisma.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Inscrições | Paróquia Nossa Senhora Aparecida</title>
        <meta
          name="description"
          content="Faça sua inscrição para Batismo, Catecismo, Crisma na Paróquia de Aparecida."
        />
      </Helmet>

      <Hero
        title="Inscrições Online"
        subtitle="Faça sua inscrição para os sacramentos e catequese"
        backgroundImage={sacramentos}
      />

      <section className="section">
        <div className="container-custom">
          {!activeForm ? (
            <>
              <SectionTitle title="Escolha o Sacramento" center />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 mt-10 justify-center">
                {formTypes.map((form, index) => (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      title={form.title}
                      icon={form.icon}
                      onClick={() => setActiveForm(form.id as RegistrationType)}
                      className="hover:border-primary-600 hover:border transition-all hover:shadow-elevation-3"
                    >
                      <p className="text-gray-600 mb-4">{form.description}</p>
                      <button
                        onClick={() =>
                          setActiveForm(form.id as RegistrationType)
                        }
                        className="btn btn-primary w-full mt-4"
                      >
                        Inscrever-se
                      </button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SectionTitle
                  title={`Inscrição para ${
                    formTypes.find((f) => f.id === activeForm)?.title
                  }`}
                  subtitle="Preencha o formulário abaixo para realizar sua inscrição"
                  center
                />

                <div className="max-w-3xl mx-auto mt-10">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 rounded-lg shadow-elevation-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeForm === "batismo" && (
                        <CatequeseForm register={register} errors={errors} />
                      )}

                      {activeForm === "catecismo" && (
                        <BatismoForm register={register} errors={errors} />
                      )}

                      {activeForm === "crisma" && (
                        <CrismaForm register={register} errors={errors} />
                      )}

                      {activeForm === "crismaAdulto" && (
                        <CrismaAdultoForm
                          register={register}
                          control={control}
                          errors={errors}
                        />
                      )}
                    </div>

                    <div className="flex flex-wrap justify-between mt-8 gap-4">
                      <button
                        type="button"
                        onClick={() => setActiveForm(null)}
                        className="btn btn-outline"
                      >
                        Voltar
                      </button>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Enviando..." : "Enviar Inscrição"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default RegistrationPage;

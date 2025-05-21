import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Heart } from "lucide-react";
import toast from "react-hot-toast";

import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import FormField from "../components/FormField";
import { addRegistration } from "../firebase/firestore";

type RegistrationType = "batismo" | "catecismo" | "crisma" | "casamento";

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
      icon: <BookOpen className="h-8 w-8" />,
      description:
        "Sacramento de iniciação cristã, pelo qual nos tornamos filhos de Deus.",
    },
    {
      id: "catecismo",
      title: "Catecismo",
      icon: <Users className="h-8 w-8" />,
      description:
        "Preparação para a Primeira Eucaristia, destinada a crianças a partir de 9 anos.",
    },
    {
      id: "crisma",
      title: "Crisma",
      icon: <Award className="h-8 w-8" />,
      description:
        "Sacramento que confirma o Batismo e fortalece os dons do Espírito Santo.",
    },
    {
      id: "casamento",
      title: "Casamento",
      icon: <Heart className="h-8 w-8" />,
      description:
        "Sacramento que une homem e mulher em uma aliança indissolúvel perante Deus.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Inscrições | Paróquia Nossa Senhora Aparecida</title>
        <meta
          name="description"
          content="Faça sua inscrição para Batismo, Catecismo, Crisma ou Casamento na Paróquia Nossa Senhora Aparecida."
        />
      </Helmet>

      <Hero
        title="Inscrições Online"
        subtitle="Faça sua pré-inscrição para os sacramentos e catequese"
        backgroundImage="https://images.pexels.com/photos/14796863/pexels-photo-14796863.jpeg"
      />

      <section className="section">
        <div className="container-custom">
          {!activeForm ? (
            <>
              <SectionTitle
                title="Escolha o Tipo de Inscrição"
                subtitle="Selecione abaixo a opção de inscrição que deseja realizar"
                center
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
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
                      <FormField
                        label="Nome completo"
                        name="name"
                        register={register}
                        error={errors.name}
                        options={{ required: "O nome é obrigatório" }}
                        placeholder="Digite seu nome completo"
                      />

                      <FormField
                        label="E-mail"
                        name="email"
                        type="email"
                        register={register}
                        error={errors.email}
                        options={{
                          required: "O e-mail é obrigatório",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "E-mail inválido",
                          },
                        }}
                        placeholder="seu@email.com"
                      />

                      <FormField
                        label="Telefone"
                        name="phone"
                        register={register}
                        error={errors.phone}
                        options={{ required: "O telefone é obrigatório" }}
                        placeholder="(00) 00000-0000"
                      />

                      <FormField
                        label="Data de Nascimento"
                        name="birthdate"
                        type="date"
                        register={register}
                        error={errors.birthdate}
                        options={{
                          required: "A data de nascimento é obrigatória",
                        }}
                      />

                      <FormField
                        label="Endereço"
                        name="address"
                        register={register}
                        error={errors.address}
                        options={{ required: "O endereço é obrigatório" }}
                        placeholder="Rua, número, bairro, cidade, CEP"
                        className="md:col-span-2"
                      />

                      {activeForm === "batismo" && (
                        <>
                          <FormField
                            label="Nome dos pais"
                            name="parentName"
                            register={register}
                            error={errors.parentName}
                            options={{
                              required: "O nome dos pais é obrigatório",
                            }}
                            placeholder="Nome completo dos pais"
                          />

                          <FormField
                            label="Nome dos padrinhos"
                            name="godparentName"
                            register={register}
                            error={errors.godparentName}
                            options={{
                              required: "O nome dos padrinhos é obrigatório",
                            }}
                            placeholder="Nome completo dos padrinhos"
                          />
                        </>
                      )}

                      {activeForm === "casamento" && (
                        <FormField
                          label="Nome do(a) noivo(a)"
                          name="partnerName"
                          register={register}
                          error={errors.partnerName}
                          options={{
                            required: "O nome do(a) noivo(a) é obrigatório",
                          }}
                          placeholder="Nome completo do(a) seu(sua) noivo(a)"
                          className="md:col-span-2"
                        />
                      )}

                      <FormField
                        label="Observações (opcional)"
                        name="notes"
                        register={register}
                        className="md:col-span-2"
                      >
                        <textarea
                          id="notes"
                          className="input-field h-32 resize-none"
                          placeholder="Informações adicionais relevantes para sua inscrição"
                          {...register("notes")}
                        />
                      </FormField>
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

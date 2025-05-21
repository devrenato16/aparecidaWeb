import React from "react";
import { useForm } from "react-hook-form";

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
  formType: string;
  parentName?: string;
  godparentName?: string;
  partnerName?: string;
  notes?: string;

  naturalPlace?: string;
  fatherName?: string;
  motherName?: string;
  community?: string;
  educationLevel?: string;
  groupParticipation?: string;
  isBaptized?: string;
  firstEucharist?: string;
  specialNeeds?: string;
  maritalStatus?: string;
  availableTime?: string;
  whoIsJesus?: string;
  commitmentAccepted?: boolean;
}

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
    // Aqui você pode enviar para o Firebase ou outro backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto p-4"
    >
      <h2 className="text-xl font-semibold">Ficha de Inscrição</h2>

      <input
        {...register("name", { required: true })}
        placeholder="Nome completo"
        className="input-field"
      />
      <input
        {...register("email", { required: true })}
        placeholder="E-mail"
        className="input-field"
      />
      <input
        {...register("phone", { required: true })}
        placeholder="Telefone"
        className="input-field"
      />
      <input
        {...register("birthdate", { required: true })}
        placeholder="Data de nascimento"
        type="date"
        className="input-field"
      />
      <input
        {...register("naturalPlace")}
        placeholder="Natural de (Cidade/Estado)"
        className="input-field"
      />
      <input
        {...register("fatherName")}
        placeholder="Nome do pai"
        className="input-field"
      />
      <input
        {...register("motherName")}
        placeholder="Nome da mãe"
        className="input-field"
      />
      <input
        {...register("address", { required: true })}
        placeholder="Endereço"
        className="input-field"
      />
      <input
        {...register("community")}
        placeholder="Comunidade"
        className="input-field"
      />
      <input
        {...register("educationLevel")}
        placeholder="Escolaridade"
        className="input-field"
      />
      <input
        {...register("groupParticipation")}
        placeholder="Participa de algum grupo? Qual?"
        className="input-field"
      />

      <select {...register("isBaptized")} className="input-field">
        <option value="">É Batizado?</option>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>

      <select {...register("firstEucharist")} className="input-field">
        <option value="">Fez a Primeira Eucaristia?</option>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>

      <input
        {...register("specialNeeds")}
        placeholder="Possui alguma necessidade especial?"
        className="input-field"
      />

      <select {...register("maritalStatus")} className="input-field">
        <option value="">É casado(a) ou mora junto?</option>
        <option value="Casado(a)">Casado(a)</option>
        <option value="Mora Junto">Mora junto</option>
        <option value="Não">Não</option>
      </select>

      <input
        {...register("availableTime")}
        placeholder="Qual horário poderá participar?"
        className="input-field"
      />
      <textarea
        {...register("whoIsJesus")}
        placeholder="Quem é Jesus para você?"
        className="input-field"
      />

      {/* Termo de compromisso */}
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>TERMO DE COMPROMISSO:</strong> Comprometo-me a participar dos{" "}
          <strong>
            ENCONTROS DE FORMAÇÕES NECESSÁRIOS PARA RECEBER O SACRAMENTO DA
            CRISMA E PARTICIPAR DA MISSA DOMINICAL
          </strong>
          . Estou ciente que faltando a esses <strong>COMPROMISSOS</strong>,{" "}
          <strong>NÃO</strong> poderei ser crismado(a)!
        </p>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            {...register("commitmentAccepted", { required: true })}
          />
          <span>Aceito o compromisso acima.</span>
        </label>
        {errors.commitmentAccepted && (
          <p className="text-red-500 text-sm">
            Você deve aceitar o compromisso.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar Inscrição
      </button>
    </form>
  );
};

export default RegistrationForm;

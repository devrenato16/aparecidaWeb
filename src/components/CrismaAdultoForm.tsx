// components/forms/CrismaAdultoForm.tsx
import { useWatch } from "react-hook-form";
import { format } from "date-fns";
import FormField from "./FormField";
import { FormSelect } from "./FormSelect";

type CrismaAdultoFormProps = {
  register: any;
  control: any;
  errors: any;
};

export const CrismaAdultoForm = ({
  register,
  errors,
  control,
}: CrismaAdultoFormProps) => {
  const fullName = useWatch({ name: "name", control });
  const currentDate = format(new Date(), "dd/MM/yyyy");

  const specialNeeds = useWatch({ name: "specialNeeds", control });

  return (
    <>
      <FormField
        label="Nome completo:"
        name="name"
        register={register}
        error={errors.name}
        options={{ required: "O nome é obrigatório" }}
        placeholder="Digite seu nome completo"
        className="md:col-span-2"
      />

      <FormField
        label="Telefone:"
        name="phone"
        register={register}
        error={errors.phone}
        options={{ required: "O telefone é obrigatório" }}
        placeholder="(00) 00000-0000"
      />

      <FormField
        label="Data de Nascimento:"
        name="birthdate"
        type="date"
        register={register}
        error={errors.birthdate}
        options={{ required: "A data de nascimento é obrigatória" }}
      />

      <FormField
        label="Naturalidade:"
        name="birthplace"
        register={register}
        error={errors.birthplace}
        options={{ required: "Este campo é obrigatório" }}
      />

      <FormField
        label="Endereço:"
        name="address"
        register={register}
        error={errors.address}
        options={{ required: "O endereço é obrigatório" }}
        placeholder="Rua, número, bairro, cidade."
      />

      <FormField
        label="Nome do Pai:"
        name="fatherName"
        register={register}
        error={errors.fatherName}
        options={{ required: "Este campo é obrigatório" }}
        className="md:col-span-2"
      />

      <FormField
        label="Nome da Mãe:"
        name="motherName"
        register={register}
        error={errors.motherName}
        options={{ required: "Este campo é obrigatório" }}
        className="md:col-span-2"
      />

      <FormField
        label="Comunidade:"
        name="community"
        register={register}
        error={errors.community}
        options={{ required: "Este campo é obrigatório" }}
      />

      <FormSelect
        label="Escolaridade"
        name="schooling"
        register={register}
        error={errors.schooling}
        options={[
          {
            value: "fundamental_incompleto",
            label: "Ensino Fundamental Incompleto",
          },
          {
            value: "fundamental_completo",
            label: "Ensino Fundamental Completo",
          },
          { value: "medio_incompleto", label: "Ensino Médio Incompleto" },
          { value: "medio_completo", label: "Ensino Médio Completo" },
          { value: "superior_incompleto", label: "Ensino Superior Incompleto" },
          { value: "superior_completo", label: "Ensino Superior Completo" },
          { value: "pos_graduacao", label: "Pós-graduação" },
          { value: "mestrado", label: "Mestrado" },
          { value: "doutorado", label: "Doutorado" },
        ]}
      />

      {/* Questões com radio buttons */}
      <FormField
        label="Você participa de algum grupo ? "
        name="groupParticipation"
        register={register}
        error={errors.groupParticipation}
        placeholder="Qual?"
        className="md:col-span-2"
      />

      <FormField
        label="É Batizado? :"
        name="isBaptized"
        register={register}
        error={errors.isBaptized}
        options={{ required: "Campo obrigatório" }}
      >
        <div className="flex gap-4">
          <label>
            <input type="radio" value="sim" {...register("isBaptized")} /> Sim
          </label>
          <label>
            <input type="radio" value="nao" {...register("isBaptized")} /> Não
          </label>
        </div>
      </FormField>
      <FormField
        label="Fez a Primeira Eucaristia?"
        name="firstEucharist"
        register={register}
        error={errors.firstEucharist}
        options={{ required: "Campo obrigatório" }}
      >
        <div className="flex gap-4">
          <label>
            <input type="radio" value="sim" {...register("firstEucharist")} />{" "}
            Sim
          </label>
          <label>
            <input type="radio" value="nao" {...register("firstEucharist")} />{" "}
            Não
          </label>
        </div>
      </FormField>

      <FormField
        label="É casado(a) ou convive maritalmente com alguém?"
        name="maritalStatus"
        register={register}
        error={errors.maritalStatus}
        options={{ required: "Campo obrigatório" }}
      >
        <div className="flex gap-4 flex-wrap">
          <label>
            <input type="radio" value="casado" {...register("maritalStatus")} />{" "}
            Casado(a)
          </label>
          <label>
            <input
              type="radio"
              value="moraJunto"
              {...register("maritalStatus")}
            />{" "}
            Mora junto
          </label>
          <label>
            <input
              type="radio"
              value="solteiro"
              {...register("maritalStatus")}
            />{" "}
            Não sou
          </label>
        </div>
      </FormField>

      <FormField
        label="Possui necessidade especial?"
        name="specialNeeds"
        register={register}
        error={errors.specialNeeds}
        options={{ required: "Campo obrigatório" }}
      >
        <div className="flex gap-4">
          <label>
            <input type="radio" value="sim" {...register("specialNeeds")} /> Sim
          </label>
          <label>
            <input type="radio" value="nao" {...register("specialNeeds")} /> Não
          </label>
        </div>
      </FormField>

      {/* Campo condicional */}
      {specialNeeds === "sim" && (
        <FormField
          label="Se sim, qual?"
          name="specialNeedsDetails"
          register={register}
          error={errors.specialNeedsDetails}
          placeholder="Qual?"
          className="md:col-span-2"
          options={{
            validate: (value) =>
              specialNeeds === "sim" && !value
                ? "Este campo é obrigatório quando a resposta é 'Sim'"
                : true,
          }}
        />
      )}

      <FormSelect
        label="Qual horário você poderá participar?"
        name="availableTime"
        register={register}
        error={errors.availableTime}
        options={[
          { value: "sexta_19h30", label: "Sexta-feira, 19h30 - 21h00" },
        ]}
        className="md:col-span-2"
      />

      <FormField
        label="Quem é Jesus para você?"
        name="jesusAnswer"
        register={register}
        error={errors.jesusAnswer}
        placeholder="Sua resposta"
        className="md:col-span-2"
      />
      {/* Termo de Compromisso */}
      <div className="mb-4 md:col-span-2">
        <h3 className="text-lg font-bold text-center mb-6">
          TERMO DE COMPROMISSO
        </h3>
        <p className="text-justify">
          <span className="font-bold inline-block w-full">
            <span className="font-normal">Eu,</span>
            <span className="font-bold inline-block w-full sm:max-w-md p-1 rounded">
              {fullName || ""}
            </span>
          </span>
          comprometo-me a participar dos ENCONTROS DE FORMAÇÕES NECESSÁRIOS PARA
          RECEBER O SACRAMENTO DA CRISMA E PARTICIPAR DA MISSA DOMINICAL e estou
          consciente que faltando a esses COMPROMISSOS, NÃO poderei ser
          crismado(a)!
        </p>
        {errors.termName && (
          <p className="text-red-500 text-sm mt-1">{errors.termName.message}</p>
        )}
      </div>

      {/* Data da Inscrição */}
      <div className="mb-4 text-center md:col-span-2">
        <input
          type="text"
          id="inscriptionDate"
          value={`Data de Inscrição: ${currentDate}`}
          readOnly
          className="text-primary-600 p-2 w-full md:w-1/2 text-center  font-bold "
        />
      </div>
    </>
  );
};

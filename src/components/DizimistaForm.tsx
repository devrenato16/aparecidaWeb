import { useWatch } from "react-hook-form";
import { format } from "date-fns";
import FormField from "./FormField";
import { FormSelect } from "./FormSelect";

type DizimistaFormProps = {
  register: any;
  control: any;
  errors: any;
};

export const DizimistaForm = ({
  register,
  errors,
  control,
}: DizimistaFormProps) => {
  const motherName = useWatch({ name: "motherName", control });
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
        className="md:col-span-2 w-full"
      />

      <FormField
        label="Data de Nascimento:"
        name="birthdate"
        type="date"
        register={register}
        error={errors.birthdate}
        options={{ required: "A data de nascimento é obrigatória" }}
        className="mt-1"
      />

      <FormSelect
        label="Sexo:"
        name="availableSex"
        register={register}
        error={errors.availableSex}
        options={[
          { value: "masculino", label: "Masculino" },
          { value: "feminino", label: "Feminino" },
          { value: "naoinformar", label: "Prefiro não informar" },
        ]}
      />
      <FormSelect
        label="Estado Civil:"
        name="availableState"
        register={register}
        error={errors.availableState}
        options={[
          { value: "solteiro", label: "Solteiro(a)" },
          { value: "casado", label: "Casado(a)" },
          { value: "divorciado", label: "Divorciado(a)" },
          { value: "uniaoestavel", label: "União Estável" },
        ]}
      />

      <FormField
        label="Telefone do Responsável:"
        name="phone"
        register={register}
        error={errors.phone}
        options={{ required: "O telefone é obrigatório" }}
        placeholder="(00) 00000-0000"
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
        label="Endereço:"
        name="address"
        register={register}
        error={errors.address}
        options={{ required: "O endereço é obrigatório" }}
        placeholder="Rua, número, bairro, cidade."
        className="md:col-span-2"
      />

      <FormField
        label="Comunidade:"
        name="community"
        register={register}
        error={errors.community}
        options={{ required: "Este campo é obrigatório" }}
      />

      <FormField
        label="Série Escolar:"
        name="schooling"
        register={register}
        error={errors.schooling}
        options={{ required: "Este campo é obrigatório" }}
      />

      {/* Batizado */}
      <FormField
        label="A Criança é batizada?"
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

      {/* Necessidade especial */}
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

      {/* Horário de participação */}
      <FormSelect
        label="Qual horário a criança poderá participar?"
        name="availableDay"
        register={register}
        error={errors.availableDay}
        options={[
          { value: "matriz_7h30", label: "Matriz de Aparecida, 7h30 - 9h00" },
          { value: "matriz_11h30", label: "Matriz de Aparecida, 9h30 - 11h00" },
          {
            value: "matriz_13h00",
            label: "Matriz de Aparecida, 13h00 - 15h00",
          },
          { value: "cap_8h00", label: "Capela São Sebastião, 8h00 - 10h00" },
          {
            value: "cap_16h00",
            label: "Capela São Pedro e São Paulo, 16h00 - 18h00",
          },
        ]}
        className="md:col-span-2"
      />

      {/* Termo de Compromisso */}
      <div className="mb-4 md:col-span-2">
        <h3 className="text-lg font-bold text-center mb-6 whitespace-nowrap">
          TERMO DE COMPROMISSO
        </h3>
        <p className="text-left">
          <span className="font-normal">Eu, </span>
          <span className="font-bold inline-block w-full sm:max-w-md p-1 rounded">
            {motherName || ""}
          </span>
          , a observar e motivar a participação do meu filho (a) nos ENCONTROS
          DE FORMAÇÕES DA CATEQUESE, NECESSÁRIOS PARA O MESMO(A) RECEBER O
          SACRAMENTO DA PRIMEIRA EUCARISTIA, e estou consciente que, faltando a
          esses COMPROMISSOS, NÃO poderá receber o SACRAMENTO.
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
          className="text-primary-600 p-2 w-full md:w-1/2 text-center font-bold"
        />
      </div>
    </>
  );
};

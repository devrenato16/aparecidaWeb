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
  const fullName = useWatch({ name: "fullName", control });
  const currentDate = format(new Date(), "dd/MM/yyyy");

  return (
    <>
      <FormField
        label="Nome completo:"
        name="fullName"
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
        label="Telefone:"
        name="phone"
        register={register}
        error={errors.phone}
        options={{ required: "O telefone é obrigatório" }}
        placeholder="(00) 00000-0000"
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

      {/* Termo de Compromisso */}
      <div className="mb-4 md:col-span-2">
        <h3 className="text-lg font-bold text-center mb-6 whitespace-nowrap">
          TERMO DE COMPROMISSO
        </h3>
        <p className="text-left">
          <span className="font-normal">Eu, </span>
          <span className="font-bold inline-block w-full sm:max-w-md p-1 rounded">
            {fullName || ""}
          </span>
          , declaro meu compromisso em contribuir com a vida da Igreja por meio
          do pagamento do dízimo. Assumo essa responsabilidade com fé e
          generosidade, apoiando a obra de Deus em nossa comunidade.
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

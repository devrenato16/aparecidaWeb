// components/forms/BatismoForm.tsx
import { useWatch } from "react-hook-form";
import FormField from "./FormField";
import { format } from "date-fns";
import { FormSelect } from "./FormSelect";

type BatismoFormProps = {
  register: any;
  errors: any;
  control: any;
};

export const BatismoForm = ({ register, errors }: BatismoFormProps) => {
  const currentDate = format(new Date(), "dd/MM/yyyy");

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
        label="Nome do Padrinho:"
        name="godfatherName"
        register={register}
        error={errors.godfatherName}
        options={{ required: "Este campo é obrigatório" }}
        className="md:col-span-2"
      />

      <FormField
        label="Nome da Madrinha:"
        name="godmotherName"
        register={register}
        error={errors.godmotherName}
        options={{ required: "Este campo é obrigatório" }}
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

      <FormSelect
        label="Local:"
        name="availableTime"
        register={register}
        error={errors.availableTime}
        options={[
          { value: "sab_9h30", label: "Matriz de Aparecida" },
          { value: "sab_11h30", label: "Capela São Pedro e São Paulo" },
          { value: "sab_9h30", label: "Capela São Sebastião" },
          {
            value: "sab_11h30",
            label: "Capela São Pedro e São Paulo, 16h00 - 18h00",
          },
        ]}
      />

      <FormField
        label="Data do Batismo:"
        name="baptismdate"
        type="date"
        register={register}
        error={errors.baptismdate}
        options={{ required: "A data de nascimento é obrigatória" }}
      />
      <FormField
        label="Data da Reunião"
        name="meetingdate"
        type="date"
        register={register}
        error={errors.meetingdate}
        options={{ required: "A data de nascimento é obrigatória" }}
      />

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

export default BatismoForm;

// components/forms/BatismoForm.tsx
import FormField from "./FormField";

const BatismoForm = ({ register, errors }: any) => {
  return (
    <>
      <FormField
        label="Nome do responsável"
        name="parentName"
        register={register}
        error={errors.parentName}
        options={{ required: "O nome do responsável é obrigatório" }}
        placeholder="Nome completo do pai ou responsável"
      />

      <FormField
        label="Observações"
        name="notes"
        register={register}
        error={errors.notes}
        placeholder="Informações adicionais (opcional)"
      />
    </>
  );
};

export default BatismoForm;

import FormField from "./FormField";

export const CatequeseForm = ({ register, errors }: any) => {
  return (
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
  );
};

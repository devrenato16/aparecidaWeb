export async function getAddressByCep(cep: string) {
    const sanitizedCep = cep.replace(/\D/g, "");
    if (sanitizedCep.length !== 8) return null;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
        const data = await response.json();
        if (data.erro) return null;
        return data;
    } catch(error) {
        console.error("Erro ao buscar CEP: ", error);
        return null;
    }

}
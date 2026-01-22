import * as yup from 'yup';

enum PixKeyKind {
    cpf = 'cpf',
    email = 'email',
    telefone = 'telefone',
    aleatoria = 'aleatoria',
}

const pixKeySchema = yup.object({
    key_type: yup.string().required('Tipo de chave é obrigatório').oneOf(Object.values(PixKeyKind), 'Tipo de chave inválido'),
    key: yup.string().required('Chave é obrigatória'),
    name: yup.string().required('Nome é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
});

export default pixKeySchema;
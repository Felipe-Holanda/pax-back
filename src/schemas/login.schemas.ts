import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().required('Nome de usuário é obrigatório').matches(/^[a-zA-Z0-9_]+$/, 'Nome de usuário deve conter apenas letras, números e _'),
    password: yup.string().required('Senha é obrigatória'),
});
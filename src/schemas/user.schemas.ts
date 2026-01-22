import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string().required("O nome de usuário é obrigatório").matches(/^[a-zA-Z0-9]+$/, "O nome de usuário deve conter apenas letras e números").min(3, "O nome de usuário deve conter no mínimo 3 caracteres").max(20, "O nome de usuário deve conter no máximo 20 caracteres"),
    password: yup.string().required("A senha é obrigatória").min(6, "A senha deve conter no mínimo 6 caracteres").max(20, "A senha deve conter no máximo 20 caracteres"),
    isAdmin: yup.boolean()
});

export const updateSchema = yup.object().shape({
    username: yup.string().matches(/^[a-zA-Z0-9]+$/, "O nome de usuário deve conter apenas letras e números").min(3, "O nome de usuário deve conter no mínimo 3 caracteres").max(20, "O nome de usuário deve conter no máximo 20 caracteres"),
    password: yup.string().min(6, "A senha deve conter no mínimo 6 caracteres").max(20, "A senha deve conter no máximo 20 caracteres"),
});
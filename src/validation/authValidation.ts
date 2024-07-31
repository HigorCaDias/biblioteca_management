import Joi from 'joi';

export const registerSchema = Joi.object({
    login: Joi.string().min(3).max(30).required().messages({
        'string.base': "O campo 'login' deve ser um tipo de texto",
        'string.empty': "O campo 'login' não pode ser um campo vazio",
        'string.min': "O campo 'login' deve ter um comprimento mínimo de {#limit}",
        'string.max': "O campo 'login' deve ter um comprimento máximo de {#limit}",
        'any.required': "O campo 'login' é um campo obrigatóri",
    }),
    senha: Joi.string().min(6).required().messages({
        'string.base': "O campo 'senha' deve ser um tipo de texto",
        'string.empty': "O campo 'senha' não pode ser um campo vazio",
        'string.min': "O campo 'senha' deve ter um comprimento mínimo de {#limit}",
        'any.required': "O campo 'senha' é um campo obrigatório"
    }),
});

export const loginSchema = Joi.object({
    login: Joi.string().required().messages({
        'string.base': "O campo 'Login' deve ser um tipo de texto.",
        'string.empty': "O campo 'Login' não pode ser um campo vazio.",
        'any.required': "O campo 'Login' é um campo obrigatório.",
    }),
    senha: Joi.string().required().messages({
        'string.base': "O campo 'senha' deve ser um tipo de texto.",
        'string.empty': "O campo 'senha' não pode ser um campo vazio.",
        'any.required': "O campo 'senha' é um campo obrigatório.",
    }),
});

export const updateUserSchema = Joi.object({
    login: Joi.string().min(3).max(30).optional().messages({
        'string.base': 'O nome de usuário deve ser um tipo de texto',
        'string.empty': 'O nome de usuário não pode ser um campo vazio',
        'string.min': 'O nome de usuário deve ter um comprimento mínimo de {#limit}',
        'string.max': 'O nome de usuário deve ter um comprimento máximo de {#limit}',
    }),
    senha: Joi.string().min(6).optional().messages({
        'string.base': 'A senha deve ser um tipo de texto',
        'string.empty': 'A senha não pode ser um campo vazio',
        'string.min': 'A senha deve ter um comprimento mínimo de {#limit}',
    }),
});

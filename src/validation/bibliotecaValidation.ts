import Joi from 'joi';

export const bibliotecaCreatecaSchema = Joi.object({
    nome: Joi.string().min(3).max(50).required().messages({
        'string.base': "O campo 'nome' deve ser um texto.",
        'string.empty': "O campo 'nome' não pode ser vazio.",
        'string.min': "O campo 'nome' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'nome' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'nome' é obrigatório."
    }),
    endereco: Joi.string().min(5).max(100).required().messages({
        'string.base': "O campo 'endereco' deve ser um texto.",
        'string.empty': "O campo 'endereco' não pode ser vazio.",
        'string.min': "O campo 'endereco' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'endereco' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'endereco' é obrigatório."
    })
});

export const bibliotecaUpdateSchema = Joi.object({
    nome: Joi.string().min(3).max(50).optional().messages({
        'string.base': "O campo 'nome' deve ser um texto.",
        'string.empty': "O campo 'nome' não pode ser vazio.",
        'string.min': "O campo 'nome' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'nome' deve ter no máximo {#limit} caracteres.",
    }),
    endereco: Joi.string().min(5).max(100).optional().messages({
        'string.base': "O campo 'endereco' deve ser um texto.",
        'string.empty': "O campo 'endereco' não pode ser vazio.",
        'string.min': "O campo 'endereco' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'endereco' deve ter no máximo {#limit} caracteres.",
    })
});

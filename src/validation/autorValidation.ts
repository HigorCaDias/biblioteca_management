import Joi from 'joi';

export const autorCreateSchema = Joi.object({
    nome: Joi.string().min(3).max(30).required().messages({
        'string.base': "O campo 'nome' deve ser um texto.",
        'string.empty': "O campo 'nome' não pode ser vazio.",
        'string.min': "O campo 'nome' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'nome' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'nome' é obrigatório."
    }),
    nacionalidade: Joi.string().min(3).max(30).required().messages({
        'string.base': "O Campo 'nacionalidade' deve ser um texto.",
        'string.empty': "O Campo 'nacionalidade' não pode ser vazia.",
        'string.min': "O Campo 'nacionalidade' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O Campo 'nacionalidade' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'nacionalidade' é obrigatório."
    })
});
export const autorUpdateSchema = Joi.object({
    nome: Joi.string().min(3).max(30).optional().messages({
        'string.base': "O campo 'nome' deve ser um texto.",
        'string.empty': "O campo 'nome' não pode ser vazio.",
        'string.min': "O campo 'nome' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'nome' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'nome' é obrigatório."
    }),
    nacionalidade: Joi.string().min(3).max(30).optional().messages({
        'string.base': "O campo 'nacionalidade deve ser um texto.",
        'string.empty': "O campo 'nacionalidade não pode ser vazia.",
        'string.min': "O campo 'nacionalidade deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'nacionalidade deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'nacionalidade' é obrigatório."
    })
});

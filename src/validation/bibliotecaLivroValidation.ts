import Joi from 'joi';

export const bibliotecalivroCreateSchema = Joi.object({
    id_biblioteca: Joi.number().required().messages({
        'string.base': "O campo 'id_biblioteca' deve ser numérico.",
        'string.empty': "O campo 'id_biblioteca' não pode ser vazio.",
        'string.min': "O campo 'id_biblioteca' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'id_biblioteca' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'id_biblioteca' é obrigatório",
    }),
    id_titulo: Joi.number().required().messages({
        'string.base': "O campo 'id_titulo' deve ser um numérico.",
        'string.empty': "O campo 'id_titulo' não pode ser vazi0.",
        'string.min': "O campo 'id_titulo' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'id_titulo' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'id_titulo' é obrigatório."
    }),
    quantidade: Joi.number().required().messages({
        'date.base': "O campo 'quantidade' deve ser numérico",
        'any.required': "O campo 'quantidade' é obrigatório."
    }),

});
export const bibliotecalivroUpdateSchema = Joi.object({
    id_biblioteca: Joi.number().optional().messages({
        'string.base': "O campo 'id_biblioteca' deve ser numérico.",
        'string.empty': "O campo 'id_biblioteca' não pode ser vazio.",
        'string.min': "O campo 'id_biblioteca' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'id_biblioteca' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'id_biblioteca' é obrigatório",
    }),
    id_titulo: Joi.number().optional().messages({
        'string.base': "O campo 'id_titulo' deve ser um numérico.",
        'string.empty': "O campo 'id_titulo' não pode ser vazi0.",
        'string.min': "O campo 'id_titulo' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'id_titulo' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'id_titulo' é obrigatório."
    }),
    quantidade: Joi.number().optional().messages({
        'date.base': "O campo 'quantidade' deve ser numérico",
        'any.required': "O campo 'quantidade' é obrigatório."
    }),

});

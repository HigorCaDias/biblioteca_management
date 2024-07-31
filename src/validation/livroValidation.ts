import Joi from 'joi';

export const livroCreateSchema = Joi.object({
    titulo: Joi.string().min(3).max(100).required().messages({
        'string.base': "O campo 'titulo' deve ser um texto.",
        'string.empty': "O campo 'titulo' não pode ser vazio.",
        'string.min': "O campo 'titulo' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'titulo' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'título' é obrigatório",
    }),
    categoria: Joi.string().min(3).max(50).required().messages({
        'string.base': "O campo 'categoria' deve ser um texto.",
        'string.empty': "O campo 'categoria' não pode ser vazia.",
        'string.min': "O campo 'categoria' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'categoria' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'categoria' é obrigatório."
    }),
    dt_lancamento: Joi.date().required().messages({
        'date.base': "O campo 'dt_lancamento' deve ser receber uma data valida: 'yyyy-mm-dd'.",
        'any.required': "O campo 'dt_lancamento' é obrigatório."
    }),
    id_autor: Joi.number().required().messages({
        'date.base': "o campo 'id_autor' deve ser numerico.",
        'any.required': "O campo 'id_autor' é obrigatório."
    })
});

export const livroUpdateSchema = Joi.object({
    titulo: Joi.string().min(3).max(100).optional().messages({
        'string.base': "O campo 'titulo' deve ser um texto.",
        'string.empty': "O campo 'titulo' não pode ser vazio.",
        'string.min': "O campo 'titulo' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'titulo' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'iampo' título é obrigatório",
    }),
    categoria: Joi.string().min(3).max(50).optional().messages({
        'string.base': "O campo 'categoria' deve ser um texto.",
        'string.empty': "O campo 'categoria' não pode ser vazia.",
        'string.min': "O campo 'categoria' deve ter pelo menos {#limit} caracteres.",
        'string.max': "O campo 'categoria' deve ter no máximo {#limit} caracteres.",
        'any.required': "O campo 'categoria' é obrigatório."
    }),
    dt_lancamento: Joi.date().optional().messages({
        'date.base': "O campo 'dt_lancamento' deve ser receber uma data valida: 'yyyy-mm-dd'.",
         'string.empty': "O campo 'dt_lancamento' não pode ser vazia.",
        'any.required': "O campo 'dt_lancamento' é obrigatório."
    }),
    id_autor: Joi.number().optional().messages({
        'date.base': "o campo 'id_autor' deve ser numerico.",
        'string.empty': "O campo 'id_autor' não pode ser vazio.",
        'any.required': "O campo 'id_autor' é obrigatório."
    })
})

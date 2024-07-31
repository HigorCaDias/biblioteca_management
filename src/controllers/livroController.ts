import { Request, Response } from 'express';
import Tb_livro from '../models/tb_livro';
import Tb_biblioteca from '../models/tb_biblioteca';
import Tb_biblioteca_livro from '../models/tb_biblioteca_livro'
import Tb_autor from '../models/tb_autor';
import { handleError } from '../utils/errorHandler';
import { getPagination, getPagingData } from '../utils/paginate';
import { Op } from 'sequelize';
import { parseDate } from '../utils/parseDate';


class LivroController {

    async getAllLivros(req: Request, res: Response) {
        try {
            const { page, size, nome } = req.query;
            const { limit, offset } = getPagination(Number(page), Number(size));
            const condition = nome ? { titulo: { [Op.like]: `%${nome}%` } } : {};

            const data = await Tb_livro.findAndCountAll({
                where: condition,
                limit,
                offset,
                include: [{
                    model: Tb_biblioteca,
                    through: {
                        attributes: ['quantidade']
                    }
                }]
            });

            const response = getPagingData(data, Number(page), limit);
            res.status(200).json({ livros: response });
        } catch (error) {
            handleError(res, error);
        }
    }

    async getLivroById(req: Request, res: Response){
        try {
            const livro = await Tb_livro.findByPk(req.params.id_livro);
            if (livro) {
                res.status(200).json(livro);
            } else {
                res.status(404).json({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    async createLivro(req: Request, res: Response) {
        try {
            const { titulo, categoria, dt_lancamento, id_autor } = req.body;
            const autor = await Tb_autor.findByPk(id_autor);
            if (!autor) {
                res.status(400).json({ message: 'Autor não encontrado, verifique a existencia do autor antes de incluir um livro' });
                return;
            }

            const dt_inclusao = new Date(); // Definindo a data de inclusão como a data atual

            const livro = await Tb_livro.create({
                titulo,
                categoria,
                dt_lancamento,
                id_autor,
                dt_inclusao
            });
            res.status(201).json({ message: 'Livro criado com sucesso!' });
        } catch (err) {
            handleError(res, err);
        }
    }

    async updateLivroById(req: Request, res: Response){
        try {
            const livro = await Tb_livro.findByPk(req.params.id_livro);
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: 'O corpo da requisição não pode estar vazio' });
            }
            if (livro) {
                req.body.dt_atualizacao = new Date();
                await livro.update(req.body);
                res.status(200).json({message: "Livro atualizado com sucesso"});
            } else {
                res.status(404).json({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    async deleteLivroById(req: Request, res: Response){
        try {
            const livro = await Tb_livro.findByPk(req.params.id_livro);
            if (livro) {
                const livroAssociado = await Tb_biblioteca_livro.findOne({
                    where: { id_livro: req.params.id_livro }
                });
                if (livroAssociado) {
                    res.status(400).json({ message: 'Livro não pode ser excluído pois está associado a uma biblioteca' });
                } else {
                    await livro.destroy();
                    res.status(204).json({ message: 'Livro excluido com sucesso!' });
                }
            } else {
                res.status(404).json({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}

export default new LivroController();

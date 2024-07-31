import { Request, Response } from 'express';
import Tb_biblioteca from '../models/tb_biblioteca';
import Tb_biblioteca_livro from '../models/tb_biblioteca_livro';
import { handleError } from '../utils/errorHandler';

class BibliotecaController {

    async getAllBibliotecas(req: Request, res: Response) {
        try {

            const { page = 1, limit = 10 } = req.query;
            const offset = (Number(page) - 1) * Number(limit);

            const { count, rows: bibliotecas } = await Tb_biblioteca.findAndCountAll({
                offset,
                limit: Number(limit),
            });

            const bibliotecasWithCounts = await Promise.all(
                bibliotecas.map(async (biblioteca) => {
                    const livrosCount = await Tb_biblioteca_livro.count({ where: { id_biblioteca: biblioteca.id_biblioteca } });
                    const exemplaresCount = await Tb_biblioteca_livro.sum('quantidade', { where: { id_biblioteca: biblioteca.id_biblioteca } });
                    return { ...biblioteca.toJSON(), "total_de_titulos": livrosCount, "quantidade_de_livros": exemplaresCount };
                })
            );

            res.status(200).json({
                totalItems: count,
                bibliotecas: bibliotecasWithCounts,
                totalPages: Math.ceil(count / Number(limit)),
                currentPage: Number(page),
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    async getBibliotecaById(req: Request, res: Response) {
        try {
            const { id_biblioteca } = req.params;
            const biblioteca = await Tb_biblioteca.findByPk(id_biblioteca);
            if (!biblioteca) {
                return res.status(404).json({ error: 'Biblioteca não encontrada' });
            }
            const livrosCount = await Tb_biblioteca_livro.count({ where: { id_biblioteca: id_biblioteca } });
            const exemplaresCount = await Tb_biblioteca_livro.sum('quantidade', { where: { id_biblioteca: id_biblioteca } });
            res.status(200).json({ ...biblioteca.toJSON(), "total de titulos": livrosCount, "Quantidade de livros": exemplaresCount });
        } catch (err) {
            handleError(res, err);
        }
    }

    async createBiblioteca(req: Request, res: Response) {
        try {
            const { nome, endereco } = req.body;
            const dt_inclusao = new Date();
            const biblioteca = await Tb_biblioteca.create({ nome, endereco, dt_inclusao });
            res.status(201).json({ message: 'Biblioteca criada com sucesso!' });
        } catch (err) {
            handleError(res, err);
        }
    }

    async updateBibliotecaById(req: Request, res: Response) {
        try {
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: 'O corpo da requisição não pode estar vazio' });
            }

            req.body.dt_atualizacao = new Date();

            const biblioteca = await Tb_biblioteca.findByPk(req.params.id);
            if (biblioteca) {
                req.body.dt_atualizacao = new Date();
                await biblioteca.update(req.body);
                return res.status(200).json({ biblioteca, message: "Biblioteca atualizada com sucesso!" });
            } else {
                return res.status(404).json({ message: 'Biblioteca não encontrada' });
            }
        } catch (error) {
            handleError(res, error);
        }
    }


    async deleteBibliotecaById(req: Request, res: Response) {
        try {
            res.status(403).json({ error: 'Exclusão de bibliotecas não permitida' });
        } catch (err) {
            handleError(res, err);
        }
    }

}

export default new BibliotecaController();

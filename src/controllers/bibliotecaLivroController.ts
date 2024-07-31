import { Request, Response } from 'express';
import Tb_livro from '../models/tb_livro';
import Tb_biblioteca_livro from '../models/tb_biblioteca_livro';
import { handleError } from '../utils/errorHandler';
import Tb_biblioteca from '../models/tb_biblioteca';
import { getPagination, getPagingData } from '../utils/paginate';

class BibliotecaLivroController {

    async getAllBibliotecaLivros(req: Request, res: Response): Promise<void> {
        try {
            const { page, size } = req.query;
            const { limit, offset } = getPagination(Number(page), Number(size));

            // Paginação para biblioteca-livros
            const bibliotecaLivroData = await Tb_biblioteca_livro.findAndCountAll({ limit, offset });
            const bibliotecaLivroResponse = getPagingData(bibliotecaLivroData, Number(page), limit);

            res.status(200).json({ bibliotecaLivros: bibliotecaLivroResponse });
        } catch (err) {
            handleError(res, err);
        }
    }

    async getBibliotecaLivroById(req: Request, res: Response) {
        try {
            const { id_biblioteca, id_livro } = req.params;
            const bibliotecaLivro = await Tb_biblioteca_livro.findOne({
                where: { id_biblioteca, id_livro }
            });
            if (bibliotecaLivro) {
                res.status(200).json(bibliotecaLivro);
            } else {
                res.status(404).json({ error: 'Associação não encontrada' });
            }
        } catch (err) {
            handleError(res, err);
        }
    }

    async createBibliotecaLivro(req: Request, res: Response) {
        try {
            const { id_biblioteca, id_livro, quantidade } = req.body;

            // Verifica se a biblioteca existe
            const biblioteca = await Tb_biblioteca.findByPk(id_biblioteca);
            if (!biblioteca) {
                return res.status(400).json({ message: 'Biblioteca não encontrada, verifique a existência da biblioteca antes de inserir um livro' });
            }

            // Verifica se o livro existe
            const livro = await Tb_livro.findByPk(id_livro);
            if (!livro) {
                return res.status(400).json({ message: 'Livro não encontrado, verifique a existência do livro antes de inserir na biblioteca' });
            }

            // Verifica se a combinação de id_biblioteca e id_livro já existe na tabela
            const existingEntry = await Tb_biblioteca_livro.findOne({
                where: {
                    id_biblioteca,
                    id_livro
                }
            });

            if (existingEntry) {
                return res.status(400).json({ message: 'Livro já existente para biblioteca, atualize sua quantidade' });
            }

            const dt_inclusao = new Date();
            const bibliotecaLivro = await Tb_biblioteca_livro.create({ id_biblioteca, id_livro, quantidade, dt_inclusao });
            res.status(201).json({ message: "Livro inserido para a biblioteca com sucesso!" });
        } catch (err) {
            handleError(res, err);
        }
    }

    async updateLivroInBiblioteca(req: Request, res: Response) {
        try {
            const { id_biblioteca, id_livro } = req.params;
            const [updated] = await Tb_biblioteca_livro.update(req.body, {
                where: { id_biblioteca, id_livro },
                returning: true
            });
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: 'O corpo da requisição não pode estar vazio' });
            }
            if (!updated) {
                return res.status(404).json({ error: 'Associação não encontrada' });
            }
            const updatedBibliotecaLivro = await Tb_biblioteca_livro.findOne({
                where: { id_biblioteca, id_livro }
            });
            req.body.dt_atualizacao = new Date();
            res.status(200).json({ message: "Quantidade de livros atualizada com sucesso!" });
        } catch (err) {
            handleError(res, err);
        }
    }

    async deleteBibliotecaLivro(req: Request, res: Response) {
        try {
            const { id_biblioteca, id_livro } = req.params;
            const deleted = await Tb_biblioteca_livro.destroy({ where: { id_biblioteca, id_livro } });
            if (deleted) {
                return res.status(200).send({ message: "Livro excluido com sucesso!" });
            } else {
                return res.status(404).json({ error: 'Associação não encontrada' });
            }
        } catch (err) {
            handleError(res, err);
        }
    }

}

export default new BibliotecaLivroController();

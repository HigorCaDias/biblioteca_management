import { Request, Response } from 'express';
import Tb_Autor from '../models/tb_autor';
import Tb_livro from '../models/tb_livro';
import { handleError } from '../utils/errorHandler';
import { getPagination, getPagingData } from '../utils/paginate';

class AutorController {

    async getAllAutores(req: Request, res: Response): Promise<void> {
        try {
            const { page, size } = req.query;
            const { limit, offset } = getPagination(Number(page), Number(size));
            // Paginação para autores
            const autorData = await Tb_Autor.findAndCountAll({ limit, offset });
            const autorResponse = getPagingData(autorData, Number(page), limit);

            res.status(200).json({ autores: autorResponse });
        } catch (err) {
            handleError(res, err);
        }
    }

    async getAutorById(req: Request, res: Response) {
        try {
            const autor = await Tb_Autor.findByPk(req.params.id_autor);
            if (!autor) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }
            return res.status(200).json(autor);
        } catch (err) {
            return handleError(res, err);
        }
    }

    async createAutor(req: Request, res: Response) {
        try {
            const { nome, nacionalidade } = req.body;
            const dt_inclusao = new Date();
            const autor = await Tb_Autor.create({ nome, nacionalidade, dt_inclusao });
            res.status(201).json({message: 'Autor criado com sucesso!' });
        } catch (err) {
            handleError(res, err);
        }
    }

    async updateAutorById(req: Request, res: Response) {
        try {
            // Verificar se o corpo da requisição está vazio
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: 'O corpo da requisição não pode estar vazio' });
            }
            // Atualizar o campo dt_atualizacao no corpo da requisição
            req.body.dt_atualizacao = new Date();
            const [updated] = await Tb_Autor.update(req.body, {
                where: { id_autor: req.params.id_autor },
            });
    
            if (!updated) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }
    
            const updatedAutor = await Tb_Autor.findByPk(req.params.id_autor);
            return res.status(200).json({ message: "Autor atualizado com sucesso!"});
        } catch (err) {
            return handleError(res, err);
        }
    }

    async deleteAutorById(req: Request, res: Response) {
        try {
            const { id_autor } = req.params;
            const livros = await Tb_livro.findAll({ where: { id_autor } });

            if (livros.length > 0) {
                return res.status(400).json({ error: 'Autor não pode ser excluído, pois possui livros cadastrados' });
            }
            const deleted = await Tb_Autor.destroy({ where: { id_autor } });
            if (deleted) {
                res.status(200).json({ message: "Autor excluido com sucesso!" });
            } else {
                res.status(404).json({ error: 'Autor não encontrado' });
            }
        } catch (err) {
            handleError(res, err);
        }
    }
}

export default new AutorController();

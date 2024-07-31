import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Tb_usuario from '../models/tb_usuario';
import { generateToken } from '../utils/jwt';
import { handleError } from '../utils/errorHandler';
import { getPagination, getPagingData } from '../utils/paginate';


class autHController {

    async usuarioRegister(req: Request, res: Response) {
        try {
            const { login, senha } = req.body;
            const dt_inclusao = new Date();
            const hashedPassword = await bcrypt.hash(senha, 10);
            const usuario = await Tb_usuario.create({ login, senha: hashedPassword, dt_inclusao });

            res.status(201).json({ message: 'Usuario criado com sucesso!' });
        } catch (error) {
            handleError(res, error);
        }
    };

    async usuarioLogin(req: Request, res: Response) {
        try {
            const { login, senha } = req.body;
            const usuario = await Tb_usuario.findOne({ where: { login } });
            if (!usuario) {
                return res.status(400).json({ message: 'Login ou senha incorretos!' });
            }

            const validPassword = await bcrypt.compare(senha, usuario.dataValues.senha);
            if (!validPassword) {
                return res.status(400).json({ message: 'Login ou senha incorretos!' });
            }

            const token = generateToken({ id: usuario.id_usuario, login: usuario.login });

            usuario.token = token;
            await usuario.save();

            res.status(200).json({ message: 'Login realizado com sucesso!', token });
        } catch (error) {
            handleError(res, error);
        }
    };

    async getUsuario(req: Request, res: Response) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(Number(page), Number(size));

        try {
            const data = await Tb_usuario.findAndCountAll({
                limit,
                offset
            });

            const response = getPagingData(data, Number(page), limit);
            res.status(200).json(response);
        } catch (error) {
            handleError(res, error);
        }
    };

    async updateUsuario(req: Request, res: Response) {
        try {
            const { login, senha } = req.body;
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: 'O corpo da requisição não pode estar vazio' });
            }
            const user = await Tb_usuario.findByPk(req.params.id_usuario);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            user.login = login || user.login;
            if (senha) {
                user.senha = await bcrypt.hash(senha, 10);
            }
            user.dt_atualizacao = new Date();
            await user.save();
            res.status(200).json({ message: 'Usuário atualizado com sucesso!'});
        } catch (error) {
            handleError(res, error);
        }
    };

    async deleteUsuario(req: Request, res: Response) {
        try {
            const user = await Tb_usuario.findByPk(req.params.id_usuario);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }
            await user.destroy();
            res.status(200).json({ message: "Usuario exlcuido com sucesso!" });
        } catch (error) {
            handleError(res, error);
        }
    };
}

export default new autHController(); 
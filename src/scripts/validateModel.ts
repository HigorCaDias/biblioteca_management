import sequelize from '../config/database';
import Tb_Autor from '../models/tb_autor';
import Tb_livro from '../models/tb_livro';
import Tb_biblioteca from '../models/tb_biblioteca';
import Tb_biblioteca_livro from '../models/tb_biblioteca_livro'
import tb_usuario from '../models/tb_usuario';
import bcrypt from 'bcryptjs';

async function validateModel() {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso.');

        await sequelize.sync({ force: true }); // use { force: true } para recriar as tabelas
        console.log('Tabelas sincronizadas com sucesso.');

        // Criar uma instância do modelo Tb_autor e salvar no banco de dados
        const autor = await Tb_Autor.create({
            nome: 'Robert Cecil Martin',
            nacionalidade: 'EUA',
            dt_inclusao: new Date()
        });

        console.log('Autor criado:', autor.toJSON());

        // Criar uma instância do modelo Tb_livro e salvar no banco de dados
        const livro = await Tb_livro.create({
            titulo: 'Código Limpo: Habilidades Práticas do Agile Software',
            categoria: 'Computação, Informática e Mídias Digitais',
            dt_lancamento: new Date(),
            id_autor: autor.id_autor, // Usar o ID do autor criado
            dt_inclusao: new Date()
        });

        console.log('Livro criado:', livro.toJSON());

        // Criar uma instância do modelo Tb_biblioteca e salvar no banco de dados
        const biblioteca = await Tb_biblioteca.create({
            nome: 'BIBLIOTECA MUNICIPAL "Professora Jandyra Basseto Pântano"',
            endereco: 'Praça Comendador Muller, 172 - Centro, Americana - SP, 13465-289',
            dt_inclusao: new Date(),
        });

        console.log('Biblioteca Criada:', biblioteca.toJSON());

        const bibliotecaLivro = await Tb_biblioteca_livro.create({
            id_biblioteca: biblioteca.id_biblioteca,
            id_livro: livro.id_livro,
            quantidade: 3,
            dt_inclusao: new Date()
        });

        console.log('BibliotecaLivro Criado:', bibliotecaLivro.toJSON());

        const usuario = await tb_usuario.create({
            login: 'admin',
            senha: await bcrypt.hash('password123',10),
            token: null, 
            dt_inclusao: new Date()// Iniciando o campo de token como nulo
        });

        console.log('Usuário criado:', usuario.toJSON());

    } catch (error) {
        console.error('Erro ao conectar ou sincronizar:', error);
    } 
}

export default validateModel;
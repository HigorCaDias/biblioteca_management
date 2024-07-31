import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tb_biblioteca from './tb_biblioteca';
import Tb_livro from './tb_livro'; // Corrigi o nome do arquivo importado

interface BibliotecaLivroAttributes {
    id_biblioteca: number;
    id_livro: number;
    quantidade: number;
    dt_inclusao: Date ;
    dt_atualizacao: Date | null;
}

interface BibliotecaLivroCreationAttributes extends Optional<BibliotecaLivroAttributes, | 'dt_atualizacao'> {}

class Tb_biblioteca_livro extends Model<BibliotecaLivroAttributes, BibliotecaLivroCreationAttributes> implements BibliotecaLivroAttributes {
    public id_biblioteca!: number;
    public id_livro!: number;
    public quantidade!: number;
    public dt_inclusao!: Date ;
    public dt_atualizacao!: Date | null;
}

Tb_biblioteca_livro.init({
    id_biblioteca: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tb_biblioteca,
            key: 'id_biblioteca',
        },
        onDelete: 'CASCADE', // Opcional: define comportamento ao deletar uma biblioteca
    },
    id_livro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tb_livro,
            key: 'id_livro',
        },
        onDelete: 'CASCADE', // Opcional: define comportamento ao deletar um livro
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ajuste conforme necessário
    },
    dt_inclusao: {
        type: DataTypes.DATE,
        allowNull: true, // Permitir que seja nulo
        defaultValue: DataTypes.NOW,
    },
    dt_atualizacao: {
        type: DataTypes.DATE,
        allowNull: true, // Permitir que seja nulo
    },
}, {
    sequelize,
    tableName: 'tb_biblioteca_livro',
    timestamps: false,
});

export default Tb_biblioteca_livro;

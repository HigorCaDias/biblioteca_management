import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Tb_autor from "./tb_autor"; // Importar o modelo Tb_autor

interface LivroAttributes {
    id_livro: number;
    titulo: string;
    categoria: string;
    dt_lancamento: Date;
    id_autor: number;
    dt_inclusao: Date;
    dt_atualizacao: Date;
}

interface LivroCreationAttributes extends Optional<LivroAttributes, 'id_livro' | 'dt_atualizacao'> {}

class Tb_livro extends Model<LivroAttributes, LivroCreationAttributes> implements LivroAttributes {
    public id_livro!: number;
    public titulo!: string;
    public categoria!: string;
    public dt_lancamento!: Date;
    public id_autor!: number;
    public dt_inclusao!: Date;
    public dt_atualizacao!: Date;
}

Tb_livro.init({
    id_livro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dt_lancamento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    id_autor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tb_autor,
            key: 'id_autor',
        },
    },
    dt_inclusao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    dt_atualizacao: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    tableName: 'tb_livro',
    timestamps: false,
});

export default Tb_livro;

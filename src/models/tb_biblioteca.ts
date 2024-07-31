import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface BibliotecaAttributes {

    id_biblioteca: number;
    nome: string;
    endereco: string;
    dt_inclusao: Date;
    dt_atualizacao: Date;
}

interface BiblioecaCreationAttributes extends Optional<BibliotecaAttributes, 'id_biblioteca' | 'dt_atualizacao'> {}

class Tb_biblioteca extends Model<BibliotecaAttributes, BiblioecaCreationAttributes> implements BibliotecaAttributes {

    public id_biblioteca!: number;
    public nome!: string;
    public endereco!: string;
    public dt_inclusao!: Date;
    public dt_atualizacao!: Date;
}

Tb_biblioteca.init({
    id_biblioteca: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'tb_biblioteca',
    timestamps: false,
});

export default Tb_biblioteca;

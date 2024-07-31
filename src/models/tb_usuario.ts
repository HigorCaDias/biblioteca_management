import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id_usuario: number;
    login: string;
    senha: string;
    token: string | null;
    dt_inclusao: Date;
    dt_atualizacao: Date;
}

// Aqui definimos um tipo que indica que 'id_usuario' e 'token' são opcionais na criação
interface UserCreationAttributes extends Optional<UserAttributes, 'id_usuario' | 'token' | 'dt_atualizacao' > {}

class tb_usuario extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id_usuario!: number;
    public login!: string;
    public senha!: string;
    public token!: string | null;
    public dt_inclusao!: Date
    public dt_atualizacao!: Date
}

tb_usuario.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
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
    tableName: 'tb_usuario',
    timestamps: false,
});

export default tb_usuario;

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface AutorAttibutes {
    
    id_autor: number;
    nome: string;
    nacionalidade: string,
    dt_inclusao: Date;
    dt_atualizacao: Date
}

interface AutoCreationAttibutes extends Optional<AutorAttibutes,'id_autor' | 'dt_atualizacao'> {}

class Tb_Autor extends Model<AutorAttibutes,AutoCreationAttibutes> implements AutorAttibutes {

    public id_autor!: number;
    public nome!: string;
    public nacionalidade!: string;
    public dt_inclusao!: Date;
    public dt_atualizacao!: Date;
}

Tb_Autor.init({
    id_autor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique:true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nacionalidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dt_inclusao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dt_atualizacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'tb_autor',
    timestamps: false,
  });
  
  export default Tb_Autor;
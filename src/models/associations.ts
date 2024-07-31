import Tb_livro from '../models/tb_livro';
import Tb_biblioteca from '../models/tb_biblioteca';
import Tb_biblioteca_livro from '../models/tb_biblioteca_livro';

Tb_livro.belongsToMany(Tb_biblioteca, { through: Tb_biblioteca_livro, foreignKey: 'id_livro' });
Tb_biblioteca.belongsToMany(Tb_livro, { through: Tb_biblioteca_livro, foreignKey: 'id_biblioteca' });
Tb_biblioteca_livro.belongsTo(Tb_livro, { foreignKey: 'id_livro' });
Tb_biblioteca_livro.belongsTo(Tb_biblioteca, { foreignKey: 'id_biblioteca' });


export default {
    Tb_livro,
    Tb_biblioteca,
    Tb_biblioteca_livro
};
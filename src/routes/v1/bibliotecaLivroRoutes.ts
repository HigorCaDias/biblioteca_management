import { Router } from 'express';
import BibliotecaLivroController from '../../controllers/bibliotecaLivroController';
import { validateRequest } from '../../utils/validationHandler';
import { bibliotecalivroCreateSchema, bibliotecalivroUpdateSchema } from '../../validation/bibliotecaLivroValidation'
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();


//Rotas Get
router.get('/bibliotecas-livros', authenticate, BibliotecaLivroController.getAllBibliotecaLivros);
router.get('/bibliotecas-livros/:id_biblioteca/:id_livro', authenticate, BibliotecaLivroController.getBibliotecaLivroById);

//Rotas Post
router.post('/bibliotecas-livros', authenticate, validateRequest(bibliotecalivroCreateSchema), BibliotecaLivroController.createBibliotecaLivro);

//Rotas Put
router.put('/bibliotecas-livros/:id_biblioteca/:id_livro', authenticate, validateRequest(bibliotecalivroUpdateSchema), BibliotecaLivroController.updateLivroInBiblioteca);

//Rotas Delete
router.delete('/bibliotecas-livros/:id_biblioteca/:id_livro', authenticate, BibliotecaLivroController.deleteBibliotecaLivro);

export default router;

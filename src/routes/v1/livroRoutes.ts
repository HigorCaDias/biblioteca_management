import express from 'express';
import livroController from '../../controllers/livroController';
import { validateRequest } from '../../utils/validationHandler';
import { livroCreateSchema, livroUpdateSchema } from '../../validation/livroValidation';
import { authenticate } from '../../middleware/authMiddleware';

const router = express.Router();


//Rotas Get
router.get('/livros', authenticate, livroController.getAllLivros);
router.get('/livros/:id_livro', authenticate, livroController.getLivroById);

//Rotas Post
router.post('/livros', authenticate, validateRequest(livroCreateSchema), livroController.createLivro);

//Rotas Put
router.put('/livros/:id_livro', authenticate, validateRequest(livroUpdateSchema), livroController.updateLivroById);

//Rotas Delete
router.delete('/livros/:id_livro', authenticate, livroController.deleteLivroById);

export default router;

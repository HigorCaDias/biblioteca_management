import { Router } from 'express';
import AutorController from '../../controllers/autorController';
import { validateRequest } from '../../utils/validationHandler';
import { autorUpdateSchema, autorCreateSchema } from '../../validation/autorValidation';
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();


//Rotas Get
router.get('/autores', authenticate, AutorController.getAllAutores);
router.get('/autores/:id_autor', authenticate, AutorController.getAutorById);

//Rotas Post
router.post('/autores', authenticate, validateRequest(autorCreateSchema), AutorController.createAutor);

//Rotas Put
router.put('/autores/:id_autor', authenticate, validateRequest(autorUpdateSchema), AutorController.updateAutorById);

//Rotas Delete
router.delete('/autores/:id_autor',authenticate, AutorController.deleteAutorById);

export default router;
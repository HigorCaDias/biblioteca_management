import { Router } from 'express';
import BibliotecaController from '../../controllers/bibliotecaController';
import { validateRequest } from '../../utils/validationHandler';
import { bibliotecaCreatecaSchema, bibliotecaUpdateSchema } from '../../validation/bibliotecaValidation';
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();


//Rotas Get
router.get('/bibliotecas', authenticate, BibliotecaController.getAllBibliotecas);
router.get('/bibliotecas/:id_biblioteca', authenticate, BibliotecaController.getBibliotecaById);

//Rotas Post
router.post('/bibliotecas',authenticate, validateRequest(bibliotecaCreatecaSchema), BibliotecaController.createBiblioteca);

//Rotas Put
router.put('/bibliotecas/:id_biblioteca', authenticate, validateRequest(bibliotecaUpdateSchema), BibliotecaController.updateBibliotecaById);

//Rotas Delete
router.delete('/bibliotecas/:id_biblioteca', authenticate, BibliotecaController.deleteBibliotecaById);

export default router;

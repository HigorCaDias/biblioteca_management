import { Router } from 'express';
import autHController from '../../controllers/authController';
import { validateRequest } from '../../utils/validationHandler';
import { registerSchema, loginSchema,updateUserSchema} from '../../validation/authValidation';
import { authenticate } from '../../middleware/authMiddleware';


const router = Router();

// Rotas get
router.get('/usuarios',authenticate ,autHController.getUsuario);

// Rotas Post
router.post('/register', validateRequest(registerSchema), autHController.usuarioRegister);
router.post('/login', validateRequest(loginSchema), autHController.usuarioLogin);

// Rotas Update
router.put('/usuarios/:id_usuario',authenticate, validateRequest(updateUserSchema), autHController.updateUsuario);

// Rotas Delete
router.delete('/usuarios/:id_usuario',authenticate ,autHController.deleteUsuario);



export default router;

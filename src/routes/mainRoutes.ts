import { Router } from 'express';
import autorRoutes from './v1/autorRoutes';
import livroRoutes from './v1/livroRoutes';
import bibliotecaRoutes from './v1/bibliotecaRoutes'
import bibliotecaLivroRoutes from './v1/bibliotecaLivroRoutes'
import authRoutes from './v1/authRoutes'



const router = Router();

router.use('/v1', autorRoutes);
router.use('/v1', livroRoutes);
router.use('/v1', bibliotecaRoutes);
router.use('/v1', bibliotecaLivroRoutes);
router.use('/v1', authRoutes)

export default router;

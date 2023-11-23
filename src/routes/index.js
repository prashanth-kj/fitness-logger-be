import express from 'express';
import userRoutes from './userRoutes.js';
import exerciseRoutes from './exerciseRoutes.js'
const router= express.Router()

router.use('/user',userRoutes);
router.use('/exercise',exerciseRoutes)
export default router
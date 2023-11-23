import express from 'express';
import cardioController from '../controller/cardioController.js'
import resistanceController from '../controller/resistanceController.js';
import Auth from '../common/Auth.js';
const router= express.Router();

//cardio routes
router.post('/cardio', Auth.validate, cardioController.createCardio);
router.get('/cardio',Auth.validate,cardioController.getCardioByUserId);
router.get('/cardio/:id',Auth.validate,cardioController.getCardioById);
router.delete('/cardio/:id',cardioController.deleteCardioById);

//Resistance routes
router.post('/resistance',Auth.validate,resistanceController.createResistance);
router.get('/resistance',Auth.validate,resistanceController.getResistanceByUserId);
router.get('/resistance/:id',Auth.validate,resistanceController.getResistancebyId);
router.delete('/resistance/:id',resistanceController.deleteResistancebyId);

export default router;
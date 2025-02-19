import { Router } from "express";
import {login, register, logout, profile,} from '../controllers/auth.controllers.js'
import { authenticate } from '../midleware/authMidleware.js';
const router = Router()


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get('/profile', authenticate, profile); // Aplica el middleware de autenticación
//router.put('/profile', authenticate, updateProfile); 
//router.post('/request-reset', requestResetPassword);
//router.patch('/reset-password/:token', resetPassword);
export default router
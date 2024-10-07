import express from "express";
import { login, registerUser, listUsers } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/users', protect, listUsers);

export default router;
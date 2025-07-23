import express from 'express';
import { checkAuth, updateUserProfile, userLogin, userSignUp } from '../controllers/userControllers.js';
import protectedRoute from '../middlewares/auth.js';

const userRouter = express.Router();

// User authentication routes
userRouter.post('/signup', userSignUp);
userRouter.post('/login', userLogin);

//Protected routes
userRouter.get('/check', protectedRoute, checkAuth);
userRouter.put('/update-profile', protectedRoute, updateUserProfile);

export default userRouter;
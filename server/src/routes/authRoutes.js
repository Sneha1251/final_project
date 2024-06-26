// routes/authRoutes.js
import express from 'express';
import { authentication } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /page:
 *   get:
 *     summary: Get the home page
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: Welcome message
 */
router.get('/page', authMiddleware, (req, res) => {
  res.send('Welcome to home page');
});

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: testuser
 *               password: testpass
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/signup', authentication.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: testuser
 *               password: testpass
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', authentication.login);

export default router;


// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import UserController from "./modules/user/controller";
import { AuthController } from "./auth/controller";
import authMiddleware, { RequestWithUser } from "./middlewares/auth";

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ success: true });
});

// USERS
app.post('/user', UserController.POST);

// AUTH
app.post('/login', AuthController.LOGIN);

// Rotas autenticadas
app.get('/profile', authMiddleware, (req: RequestWithUser, res: Response) => {
  const { id, username } = req.body.user;
  res.send({ id, username });
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

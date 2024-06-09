// src/index.js
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserController from "./user/controller";
import { AuthController } from "./auth/controller";
import authMiddleware, { RequestWithUser } from "./middlewares/auth";
import { HintController } from "./hint/controller";

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(cors());

// --- Public routes

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true });
});

// - Users
app.post("/users", UserController.POST);

app.post("/login", AuthController.LOGIN);

// --- Authenticated routes

app.get("/profile", authMiddleware, (req: RequestWithUser, res: Response) => {
  const { id, username } = req.body.user;
  res.send({ id, username });
});

// - Hints
app.post("/hints", authMiddleware, HintController.CREATE);
app.get("/hints", authMiddleware, HintController.LIST);
app.get("/hints/:id", authMiddleware, HintController.FIND);
app.put("/hints/:id", authMiddleware, HintController.UPDATE);
app.delete("/hints/:id", authMiddleware, HintController.DELETE);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

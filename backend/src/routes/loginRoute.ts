import { Router } from "express";
import { login } from "../controllers/loginController";

const userRouter = Router();

userRouter.post("/login", login);

export default userRouter;

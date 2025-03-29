import { Router } from "express";
import { historic } from "../controllers/historicController";

const historicCheckRouter = Router();

historicCheckRouter.get("/historico", historic);

export default historicCheckRouter;

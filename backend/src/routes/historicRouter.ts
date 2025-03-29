import { Router } from "express";
import { historic, deleteHistoric } from "../controllers/historicController";

const historicCheckRouter = Router();

historicCheckRouter.get("/historico", historic);
historicCheckRouter.delete("/historico/:id", deleteHistoric);

export default historicCheckRouter;

import { Router } from "express";
import { equalityCheck } from "../controllers/equalityCheckController";

const equalityCheckRouter = Router();

equalityCheckRouter.post("/irmaos-siameses", equalityCheck);

export default equalityCheckRouter;

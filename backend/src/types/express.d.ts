import { UserPayload } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

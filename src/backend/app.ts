import * as express from "express";
import { router } from "./router";

export const app = express();
app.use("/api", router);

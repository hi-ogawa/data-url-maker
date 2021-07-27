import { Router } from "express";
import { makeRouterDSL } from "ts-actionpack";
import { Controller } from "./controller";

export const router = Router();
const { GET, POST, ALL } = makeRouterDSL(router);

// prettier-ignore
{
  GET   (/\/url\/(.*)/,         Controller, "url");
  POST  ("/upload",             Controller, "upload");
  ALL   ("*",                   Controller, "notFound");
}

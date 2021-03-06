import * as express from "express";
const router: express.Router = express.Router();

// this is the body api

export function setupRouter(w: Response, r: Request): express.Router {
  router.get("/", (r, w) => {
    console.log(r);
    w.send("hello world");
  });
  return router;
}

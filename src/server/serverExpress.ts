import * as express from "express";
import * as database from "./dataBaseCommunication";
const router: express.Router = express.Router();

// this is the body api

export function setupRouter(w: Response, r: Request): express.Router {
  router.get("/", (r, w) => {
    w.send("hello world");
  });
    router.get("/hello", (r, w) => {
      database
        .madeApi()
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    });
  return router;
}

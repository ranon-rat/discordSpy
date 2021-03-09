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
        .then((res) => {
          w.send(res);
          console.log(res);
        })
        .catch((e) => {
          e ? console.log(e) : null;
        });
    });
  return router;
}

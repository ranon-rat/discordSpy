import * as express from "express";
import * as database from "./dataBaseCommunication";
const router: express.Router = express.Router();

// this is the body api

export function setupRouter(w: Response, r: Request): express.Router {
  router.get("/", express.static(__dirname + "/frontend"));
  router.get("/api", (r, w) => {
    database.madeApi().then((r) => w.send(r)); //.then((res) => w.send(res));
  });
  return router;
}

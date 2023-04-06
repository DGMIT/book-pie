import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/ioc.container";
import * as express from "express";
import * as cors from "cors";
import "./controller/book.controller";
import "./controller/report.controller";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(cors({ origin: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
});

const app = server.build();

app.listen(4000, () => {
  console.log("✅ Listening on: http://localhost:4000");
});

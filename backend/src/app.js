
import express from "express";
import { router } from "./route/routes.js";
import cors from "cors";
import config from "./config/config.js";

const app = express();
app.use(cors({
  origin: {
    web: config.web.link,
  },
  methods: "GET, POST, DELETE, PATCH, PUT"
}))
app.use(express.json());

export default app.use('/', router);


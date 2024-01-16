
import express from "express";
import { router } from "./route/routes.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: {
    web: "",
    local: "http://localhost:5173"
  },
  methods: "GET, POST, DELETE, PATCH, PUT"
}))
app.use(express.json());

export default app.use('/', router);


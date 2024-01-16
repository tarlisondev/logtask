
import express from "express";
import { router } from "./route/routes.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "https://logtask-client.onrender.com",
  methods: "GET, POST, DELETE, PATCH, PUT"
}))
app.use(express.json());

export default app.use('/', router);


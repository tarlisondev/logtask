
import { Router } from "express";
import controllerLogin from "../controller/controller.js";
import { verify, exists, authenticator } from "../middlewares/middleware.js";

const router = Router();

router
  .post('/register', verify.name, verify.email, verify.tel, verify.password, exists.email, exists.tel,
    controllerLogin.loginCreate)

  .put('/update/:id', verify.id, verify.name, verify.email, verify.tel,
    controllerLogin.loginUpdate)

  .delete('/delete/:id', verify.id, authenticator.authorization,
    controllerLogin.loginDelete)

  .get('/profile/:id', authenticator.authorization, controllerLogin.loginList)

  .post('/sign', verify.email, verify.password,
    controllerLogin.sigIn)

  .post('/task/:id', verify.id, verify.task, controllerLogin.createTask)

  .get('/task/:id', verify.id, controllerLogin.listTask)

  .delete('/task/:id', controllerLogin.deleteTask)

  .patch('/task/:id', controllerLogin.updateTask);

export {
  router
}

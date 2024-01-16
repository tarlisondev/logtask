import { login } from "../model/model.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const authenticator = {
  async authorization(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {

      const secret = config.jwt.secret;
      jwt.verify(token, secret);
      next();

    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: "Token invalid" });
    }
  }
}

const exists = {
  async email(req, res, next) {
    const { email } = req.body;
    const existEmail = await login.findOne({ email: email });
    if (existEmail) return res.status(401).json({ msg: "Email exists" });
    next();
  },

  async tel(req, res, next) {
    const { tel } = req.body;
    const existTel = await login.findOne({ tel: tel });
    if (existTel) return res.status(401).json({ msg: "Tel exists" });
    next();
  }
}

const verify = {
  task(req, res, next) {
    const task = req.body.myTask;
    if (!task) return res.status(422).json({ msg: 'Task required' });
    next()
  },
  name(req, res, next) {
    const name = req.body.name;
    if (!name) return res.status(422).json({ msg: 'Name required' });
    next()
  },

  email(req, res, next) {
    const email = req.body.email;
    if (!email) return res.status(422).json({ msg: 'Email required' });
    next()
  },

  tel(req, res, next) {
    const tel = req.body.tel;
    if (!tel) return res.status(422).json({ msg: 'Tel required' });
    next()
  },

  password(req, res, next) {
    const password = req.body.password;
    if (!password) return res.status(422).json({ msg: 'Password required' });
    next()
  },

  async id(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) return res.status(422).json({ msg: 'Id required' });
      if (id.length !== 24) return res.status(422).json({ msg: 'Id invalid' });

      const existId = await login.findById({ _id: id });
      if (!existId) return res.status(401).json({ msg: "Id not exist" });
      next()
    } catch (error) {
      console.log(error)
      res.status(422).json({ msg: "Error" })
    }

  }
}

export {
  verify,
  exists,
  authenticator,
} 
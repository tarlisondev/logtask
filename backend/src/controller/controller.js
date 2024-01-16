import { login, task } from "../model/model.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const controllerLogin = {

  async createTask(req, res) {

    const { idUser, myTask } = req.body;

    const date = new Date().toLocaleDateString();

    await task.create({
      idUser, myTask, date, status: 'pendente'
    })

    res.status(201).json({ msg: 'Task Created successfully' })
  },

  async listTask(req, res) {

    const idUser = req.params.id;
    const myTask = await task.find({ idUser: idUser })
    res.status(200).json({ myTask })

  },

  async deleteTask(req, res) {
    const id = req.params.id;
    await task.findByIdAndDelete({ _id: id })
    res.status(200).json({ msg: 'Task Deleted successfully' })
  },

  async updateTask(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) return res.status(422).json({ msg: 'Status required' })

    await task.findByIdAndUpdate(id, { status })

    res.status(201).json({ msg: 'Task updated successfully' })
  },

  async sigIn(req, res) {

    const { email, password } = req.body;

    const existEmail = await login.findOne({ email: email });
    if (!existEmail) return res.status(422).json({ msg: "Email or password Invalid" });

    const passCompare = await compare(password, existEmail.password);
    if (!passCompare) return res.status(422).json({ msg: "Email or password Invalid" });

    try {
      const secret = config.jwt.secret;
      const token = jwt.sign({ id: existEmail._id }, secret)
      res.status(200).json({ msg: "Authorized successfully", id: existEmail._id, token })
    }
    catch (error) {
      console.log(error)
      res.status(500).json({ msg: "Error server" });
    }
  },

  async loginCreate(req, res) {

    const { name, email, tel, profile, password } = req.body;
    const passHash = await hash(password, 12);

    const date = new Date().toLocaleDateString();

    await login.create({ name, email, tel, profile, password: passHash, create_at: date, update_at: date });
    res.status(201).json({ msg: "User create successfully" });

  },

  async loginUpdate(req, res) {

    const date = new Date().toLocaleDateString();
    const { id } = req.params;
    const { name, email, tel, profile } = req.body;

    await login.findByIdAndUpdate(id, { name, email, tel, profile, update_at: date });
    res.status(201).json({ msg: "User update successfully" });

  },

  async loginDelete(req, res) {

    const { id } = req.params;
    await login.deleteOne({ _id: id });
    res.status(200).json({ msg: "Deleted successfully" });

  },

  async loginList(req, res) {

    const { id } = req.params;
    const list = await login.findById(id, '-password');
    res.status(200).json({ list });

  }
}

export default controllerLogin;

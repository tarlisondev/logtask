import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Auth/AuthContext"
import { Link } from "react-router-dom";

import { ImMenu } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { ImExit } from "react-icons/im";

import "../../styles/global.css";
import Menu from "../../components/Menu";

function Profile() {

  const { createTask, listTasks, updateTask, deleteTask, profile, user } = useContext(AuthContext);
  const [myUser, setMyUser] = useState({});
  const [task, setTask] = useState({ task: '' });
  const [list, setList] = useState([]);
  const [test, setTest] = useState(false)

  function refreshList() {

    listTasks(user.data.id)
      .then((res) => {
        res.status === 200 && setList(res.data.myTask)
      })
      .catch(err => console.log(err.response.data.msg))
  }

  useEffect(() => {

    profile(user.data.id, user.data.token)
      .then((res) => {
        res.status === 200 &&
          setMyUser(res.data.list),
          refreshList()
      })
      .catch(err => alert(err.response.data.msg))

  }, []);

  function handleCreateTask() {
    if (!task.task) return alert("Digite uma tarefa")
    if (task.task.length < 3) return alert("Pelo menos 3 caracteres")
    createTask(user.data.id, task.task)
      .then((res) => {
        res.status === 201 &&
          setTask({ task: '' }),
          refreshList()
      })
      .catch(err => alert(err.response.data.msg))
  }

  function handleDeleteTask(id) {
    deleteTask(id)
      .then((res) => {
        res.status === 200 && refreshList()
      })
      .catch(err => alert(err.response.data.msg))
  }

  function handleUpdateTask(id, status) {
    updateTask(id, status)
      .then((res) => {
        res.status === 201 && refreshList()
      })
      .catch(err => alert(err.response.data.msg))
  }

  function menu() {
    !test ? setTest(true) : setTest(false)
  }

  return (

    <div className="container">

      <header className="profile-header">

        <div className="profile-user">
          <img src={myUser && myUser.profile} alt={myUser && myUser.name} />
          <h1>{myUser && myUser.name}</h1>
        </div>

        <nav className="profile-menu">
          <ImMenu onClick={menu} />
        </nav>

      </header>

      {
        test &&

        <Menu>

          <div>
            <img src={myUser && myUser.profile} alt={myUser && myUser.email} />
            <span>{myUser && myUser.email}</span>
          </div>

          <Link to="/profile/update"><TiEdit /> edit account</Link>
          <Link to="/profile/delete"><IoTrashOutline />delete account</Link>
          <Link to="/"><ImExit />exit account</Link>

          <span onClick={menu} className="menu-hide"><IoCloseSharp /></span>

        </Menu>
      }

      <hr />

      <section>

        <div className="box-task">

          <input
            type="text"
            placeholder="Criar tarefa"
            value={task.task}
            onChange={e => setTask({ ...task, task: e.target.value })}
            onFocus={null}
          />
          <button onClick={handleCreateTask}>Add</button>
        </div>

        {myUser && list.length !== 0 ?
          <>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Task</th>
                  <th>Criado em</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.map((task, index) => (

                    <tr key={task._id}>

                      <td>{index + 1}</td>
                      <td>{task.myTask}</td>
                      <td>{task.date}</td>
                      <td>
                        <select
                          value={task.status}
                          onChange={e => handleUpdateTask(task._id, e.target.value)}
                        >
                          <option value="pendente">Pendente</option>
                          <option value="em andamento">Em andamento</option>
                          <option value="concluido">Concluido</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteTask(task._id)}><IoTrashOutline /></button>
                      </td>
                    </tr>

                  ))
                }

              </tbody>

            </table>
          </> : <div className="box-found">Não há tarefas a serem exibidas!</div>
        }

      </section>

    </div>
  )
}

export default Profile
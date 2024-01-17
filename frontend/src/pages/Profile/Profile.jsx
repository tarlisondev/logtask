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
import PreView from "../../components/PreView";
import Message from "../../components/Message";
import Loading from "../../components/Loading";

function Profile() {

  const { createTask, listTasks, updateTask, deleteTask, profile, user } = useContext(AuthContext);
  const [myUser, setMyUser] = useState({});
  const [data, setData] = useState({
    myTasks: [],
    task: '',
    message: '',
    menuView: false,
    profileView: false,
    messageView: false,
    loadView: false,
  });

  function refreshList() {
    listTasks(user.data.id)
      .then((res) => {
        res.status === 200 && setData({ myTasks: res.data.myTask })
      })
      .catch(err => setData({ message: err.response.data.msg }))
  }

  useEffect(() => {

    profile(user.data.id, user.data.token)
      .then((res) => {
        res.status === 200 &&
          setMyUser(res.data.list),
          refreshList()
      })
      .catch(err => setData({ message: err.response.data.msg }))

  }, []);

  function handleCreateTask() {
    if (!data.task) return setData({ message: "Digite uma tarefa" })
    if (data.task.length < 3) return setData({ message: "Pelo menos 3 caracteres" })
    createTask(user.data.id, data.task)
      .then((res) => {
        res.status === 201 &&
          setData({ task: '' }),
          refreshList()
      })
      .catch(err => setData({ message: err.response.data.msg }))

    setData({ loadView: true })
  }

  function handleDeleteTask(id) {
    deleteTask(id)
      .then((res) => {
        res.status === 200 && refreshList()
      })
      .catch(err => setData({ message: err.response.data.msg }))
    setData({ loadView: true })
  }

  function handleUpdateTask(id, status) {
    updateTask(id, status)
      .then((res) => {
        res.status === 201 && refreshList()
      })
      .catch(err => setData({ message: err.response.data.msg }))
    setData({ loadView: true })
  }

  function menuView() {
    !data.menuView ? setData({ menuView: true }) : setData({ menuView: false })
  }

  function profileView() {
    !data.profileView ? setData({ profileView: true }) : setData({ profileView: false })
  }

  function MessageView() {
    !data.messageView ? setData({ messageView: true }) : setData({ messageView: false })
  }

  return (

    <div className="container">

      <header className="profile-header">

        <div className="profile-user">
          <img onClick={profileView} src={myUser && myUser.profile} alt={myUser && myUser.name} />
          <h1>{myUser && myUser.name}</h1>
        </div>

        <nav className="profile-menu">
          <ImMenu onClick={menuView} />
        </nav>

      </header>

      {data.profileView && <PreView img={myUser.profile} btn={profileView} />}

      {
        data.menuView &&

        <Menu>

          <div>
            <img src={myUser && myUser.profile} alt={myUser && myUser.email} />
            <span>{myUser && myUser.email}</span>
          </div>

          <Link to="/profile/update"><TiEdit /> <span>edit account</span></Link>
          <Link to="/profile/delete"><IoTrashOutline /><span>delete account</span></Link>
          <Link to="/"><ImExit /><span>exit account</span></Link>

          <span onClick={menuView} className="menu-hide"><IoCloseSharp /></span>

        </Menu>
      }

      <hr />

      <section>

        <div className="box-task">

          <input
            type="text"
            placeholder="Criar tarefa"
            value={data.task}
            onChange={e => setData({ task: e.target.value })}
          />
          <button onClick={handleCreateTask}>Add</button>
        </div>

        {data.myTasks && data.myTasks.length !== 0 ?
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
                  data.myTasks.map((task, index) => (

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


      {data.message && <Message msg={data.message} btn={MessageView} />}
      {data.loadView && <Loading />}

    </div>

  )
}

export default Profile
import { useContext, useState } from "react"
import { AuthContext } from "../../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Back from "../../components/Back";

import "../../styles/global.css";
import Message from "../../components/Message";
import Loading from "../../components/Loading";

function Login() {

  const { sign } = useContext(AuthContext);
  const [myUser, setMyUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [msg, setMsg] = useState({ message: '', view: false, load: false });

  const handleLogin = (e) => {
    e.preventDefault();
    sign(myUser.email, myUser.password)
      .then((res) => {
        res.status === 200 && setMsg({ message: res.data.msg }), navigate("/profile")
      })
      .catch(err => setMsg({ message: err.response.data.msg }))

    setMsg({ load: true })

  }

  function MessageView() {
    !msg.view ? setMsg({ view: true }) : setMsg({ view: false })
  }

  return (
    <div className="container">

      <Link to="/"><Back /></Link>

      <form className="form-login">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="email"
          value={myUser.email}
          onChange={e => setMyUser({ ...myUser, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="password"
          value={myUser.password}
          onChange={e => setMyUser({ ...myUser, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>
      </form>

      {msg.message && <Message msg={msg.message} btn={MessageView} />}
      {msg.load && <Loading />}

    </div>

  )
}

export default Login
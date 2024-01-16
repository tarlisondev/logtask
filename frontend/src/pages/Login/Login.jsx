import { useContext, useState } from "react"
import { AuthContext } from "../../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Back from "../../components/Back";

import "../../styles/global.css";

function Login() {


  const { user, sign } = useContext(AuthContext);
  const [myUser, setMyUser] = useState({ email: '', password: '' });
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    sign(myUser.email, myUser.password)
      .then((res) => {
        res.status === 200 && alert(res.data.msg), navigate("/profile")
      })
      .catch((err) => {
        alert(err.response.data.msg)
      })
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

      <hr />

    </div>

  )
}

export default Login
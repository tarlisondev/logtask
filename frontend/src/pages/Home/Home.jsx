import { Link } from "react-router-dom";
import "../../styles/global.css";
import logo from "../../imgs/logtask.png"

function Home() {
  return (
    <div className="home">
      <img src={logo} alt="" />
      <h1>Seja bem vindo(a)</h1>
      <p>Faça <Link to="/login">Login</Link> ou <Link to="/register">Registre-se</Link> para continuar!</p>
    </div >
  )
}

export default Home
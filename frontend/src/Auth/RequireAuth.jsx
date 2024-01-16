import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {

  const auth = useContext(AuthContext);

  if (auth.user.log) return children;

  return <Navigate to="/" />

}

export default RequireAuth;
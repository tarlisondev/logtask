import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Auth/AuthContext';

import "../../styles/global.css";
import { Link, useNavigate } from 'react-router-dom';
import Back from '../../components/Back';

function Register() {

  const { register, user } = useContext(AuthContext);
  const [myUser, setMyUser] = useState({ name: '', email: '', tel: '', profile: '', password: '', confirmPassword: '' });
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  function handleRegister(event) {
    event.preventDefault();
    register(myUser.name, myUser.email, myUser.tel, myUser.profile, myUser.password)
      .then((res) => {
        res.status === 201 && alert(res.data.msg), navigate('/login')
      })
      .catch((err) => {
        alert(err.response.data.msg)
      })
  }

  function handleSimilar() {

    if (myUser.password !== myUser.confirmPassword) {
      setValid(true)
      return alert("Passwords is unSimilar");
    }
    if (!myUser.name || !myUser.email || !myUser.tel || !myUser.password) {
      setValid(true)
      return alert("Fields with ( * ) is required")
    }

    setValid(false);
  }

  return (
    <div className='container'>
      <Link to="/"> <Back />  </Link>

      <form className='form-register'>

        <h1>Register</h1>

        <div>
          <label>Name<span>*</span></label>
          <input
            type="text"
            placeholder='you name'
            value={myUser.name}
            onChange={e => setMyUser({ ...myUser, name: e.target.value })}
          />

          <label>Email<span>*</span></label>
          <input
            type="email"
            placeholder='name@email.com'
            value={myUser.email}
            onChange={e => setMyUser({ ...myUser, email: e.target.value })}
          />

          <label>Tel<span>*</span></label>
          <input
            type="number"
            placeholder='(00) 000000-0000'
            value={myUser.tel}
            onChange={e => setMyUser({ ...myUser, tel: e.target.value })}
          />

          <label>Profile<span></span></label>
          <input
            type="text"
            placeholder='address you link image'
            value={myUser.profile}
            onChange={e => setMyUser({ ...myUser, profile: e.target.value })}
          />

          <label>Password<span>*</span></label>
          <input
            type="password"
            placeholder='password'
            value={myUser.password}
            onChange={e => setMyUser({ ...myUser, password: e.target.value })}
          />

          <label>Confirm password<span>*</span></label>
          <input
            type="password"
            placeholder='confirm password'
            value={myUser.confirmPassword}
            onChange={e => setMyUser({ ...myUser, confirmPassword: e.target.value })}
            onBlur={handleSimilar}
          />

          <button disabled={valid} onClick={handleRegister}>Register</button>

        </div>
      </form>
    </div>
  )
}

export default Register
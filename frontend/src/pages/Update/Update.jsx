
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../Auth/AuthContext';
import "../../styles/global.css";
import Back from '../../components/Back';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

function Update() {

  const { profile, edit, user } = useContext(AuthContext);
  const [myUser, setMyUser] = useState({ name: '', email: '', tel: '', profile: '' });
  const [msg, setMsg] = useState({ message: '', view: false, load: false });
  const navigate = useNavigate()

  useEffect(() => {

    profile(user.data.id, user.data.token)
      .then((res) => {
        res.status === 200 &&
          setMyUser({
            ...myUser,
            name: res.data.list.name,
            email: res.data.list.email,
            tel: res.data.list.tel,
            profile: res.data.list.profile
          })
      })
      .catch(err => alert(err.response.data.msg))
  }, []);

  function handleEdit(event) {
    event.preventDefault();

    edit(user.data.id, myUser.name, myUser.email, myUser.tel, myUser.profile)
      .then((res) => {
        res.status === 201 &&
          setMsg({ message: res.data.msg }),
          navigate("/profile")
      })
      .catch(err => setMsg({ message: err.response.data.msg }))

    setMsg({ load: true })
  }

  function MessageView() {
    !msg.view ? setMsg({ view: true }) : setMsg({ view: false })
  }

  return (
    <div className='container'>
      <Link to="/profile"><Back /></Link>

      <form className='form-edit'>

        <h1>Edit</h1>

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
            placeholder='address you image'
            value={myUser.profile}
            onChange={e => setMyUser({ ...myUser, profile: e.target.value })}
          />

          <button onClick={handleEdit}>Confirm</button>

        </div>
      </form>

      {msg.message && <Message msg={msg.message} btn={MessageView} />}
      {msg.load && <Loading />}

    </div>
  )
}

export default Update;
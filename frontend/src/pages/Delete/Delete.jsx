import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import Back from '../../components/Back';
import "../../styles/global.css";
import Message from '../../components/Message';
import Loading from '../../components/Loading';

function Delete() {

  const { remove, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [msg, setMsg] = useState({ message: '', view: false, load: false });

  function handleDelete() {
    remove(user.data.id, user.data.token)
      .then((res) => {
        res.status === 200 &&
          setMsg({ message: res.data.msg }),
          navigate('/')
      })
      .catch(err => setMsg({ message: err.response.data.msg }))
  }

  function MessageView() {
    !msg.view ? setMsg({ view: true }) : setMsg({ view: false })
  }

  return (
    <div className='container'>
      <Link to="/profile"><Back /></Link>

      <h1 className='delete-account-title'>Excluir minha conta</h1>
      <p className='delete-account-text'> Atenção: ao excluir sua conta não será possivel recuperar-la</p>
      <button className='delete-account-btn' onClick={handleDelete}>Excluir Conta</button>

      {msg.message && <Message msg={msg.message} btn={MessageView} />}
      {msg.load && <Loading />}

    </div>
  )
}

export default Delete
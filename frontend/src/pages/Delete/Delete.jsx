import React, { useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import Back from '../../components/Back';
import "../../styles/global.css";

function Delete() {

  const { remove, user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleDelete() {
    remove(user.data.id, user.data.token)
      .then((res) => {
        res.status === 200 &&
          alert(res.data.msg),
          navigate('/')
      })
      .catch((err) => {
        alert(err.response.data.msg)
      })
  }

  return (
    <div className='container'>
      <Link to="/profile"><Back /></Link>

      <h1 className='delete-account-title'>Excluir minha conta</h1>
      <p className='delete-account-text'> Atenção: ao excluir sua conta não será possivel recuperar-la</p>
      <button className='delete-account-btn' onClick={handleDelete}>Excluir Conta</button>
    </div>
  )
}

export default Delete
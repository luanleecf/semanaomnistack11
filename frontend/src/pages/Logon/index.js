import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const MySwal = withReactContent(Swal);

        try{
            const response = await api.post('sessions', { id } );
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', response.data.nome);

            history.push('/profile');
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Falha no login',
                text: `ID incorreto, preencha novamente.`,
              })
        }
    }

    return (
        <div className="logon-container">
        <section className="form">

        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
            <h1>Faça seu Logon</h1>

            <input placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#E02041" />
                Não tenho cadastro
               
            </Link>
        </form>
        </section>

        <img src={heroesImg} alt="Heroes"/>
        </div>    
    );
}
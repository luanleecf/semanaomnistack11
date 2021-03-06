import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);


    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


   async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    async function hundleLogout(){
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Gostaria de fazer sair?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#e02041',
            confirmButtonText: 'Sim, gostaria.',
            cancelButtonText: 'Não, quero ficar logado.'
          }).then((result) => {
            if (result.value) {
              MySwal.fire(                
                `Deslogado com sucesso!`,
                'Em algum lugar um animalzinho precisa de você.',
                'success',
                    `${history.push('/')}`

              )  
            } else if (
                result.dismiss === MySwal.DismissReason.cancel
            ) {
              MySwal.fire(
                'Obrigado por ficar.',
                'Continue salvando o dia :)',
                'success'
              )
            }
          })
        localStorage.clear();   
  
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongNome}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button  onClick={hundleLogout}   type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
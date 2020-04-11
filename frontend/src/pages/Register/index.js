import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        };
        
        const MySwal = withReactContent(Swal);
        
        try {
            const response = await api.post('ongs', data);
            

                MySwal.fire({
                    icon: 'success',
                    title: <p>Cadastrado com sucesso</p>,
                    footer: 'Copyright 2020',
                    onOpen: () => {
                    
                MySwal.clickConfirm()
                  
                }
              }).then(() => {
                return MySwal.fire(<p>Seu ID de acesso: {response.data.id}</p>);
              })

            history.push('/');
        } catch (err) {
            
            MySwal.fire({
                icon: 'error',
                title: 'Erro no cadastro.',
                text: `Campos incorrentos, preencha corretamente.`,
              })
 
        }        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude a encontrar os casos da sua ONG</p>
                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Já possuo cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>

                    <input placeholder="Nome da ONG"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />

                    <input type="Email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <input placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80 }} 
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api.js';

import './style.css'

import logoImg from '../../Assets/logo.svg'

export default function Profile() {
    const[incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() =>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
                setIncidents(response.data);
        })
    }, [ongId]);



    async function handleDeleteIncident(id) {
        try{
            await api.delete(`Incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
        } catch (err) {
            alert('Erro ao deletar o caso. Tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/');
       
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to='/incidents/new'>Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E04021" />
                </button>
            </header>
            
            <h1>Casos Cadastrados</h1>

            <ul>              
               {incidents.map(incident => {
                   return (     
                   <li key={incidents.id}>
                    <strong>CASO: </strong> 
                    <p>{incident.title}</p>

                    <strong>Descrição: </strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident} type="button">
                        <FiTrash2 size={20} color = "a8a8b3"/>
                    </button>
                </li>
                )
               }
                )}                
            </ul>

        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';


export default function Home() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    async function loadMissions() {
      const user_id = localStorage.getItem('user_id');
      const response = await api.get('/missions', {
        headers: { user_id }
      });
      console.log(response.data)

      setMissions(response.data);
    }
    loadMissions();

  }, [])

  return (
    <div className="container-missions">

      <div className="content-missions">
        <section>
          <h1>Missões em Aberto</h1>
        </section>
        <ul className="missions-list">
          {missions.map(mission => (
            <li key={mission._id}>
              <header style={{ backgroundColor: '#f9f9f9' }} >
                <strong>{mission.session}</strong><br />
                <span>{mission.requester}</span><br />
                <span>{mission.reason}</span><br />
                <span>{mission.date}</span><br />
              </header>

            </li>

          ))}
        </ul>
        <Link to="/Register">
          <button className="btn">Cadastrar nova Missão</button>
        </Link>
      </div>
    </div>

  )
}
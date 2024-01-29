import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListTerrainsNonValide  from '../components/ListTerrainsNonValide';
import loadingSpinner from '../img/loading.gif';

export default function TerrainNonValide () {
    const [listTerrain,setListTerrain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();
    const fetchData = async() => {
        try {
            const response = await fetch("https://parecelle-webservice-production.up.railway.app/GET/terrains/non-valides");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setListTerrain(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const valider = async (terrainObject) => {
        
        try {
            setLoading(true);
            const response = await fetch("https://parecelle-webservice-production.up.railway.app/PUT/terrains", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(terrainObject)
            });
            fetchData();
            if (!response.ok) {
                throw new Error('Failed to insert data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
  
    
    return(
        <>
                <div className="main-container" >
                    <nav className="nav-bar">
                        <h1 style={{ fontSize: '24px' }} >Admin</h1>
                        <Link to="/cultures" >Liste des cultures</Link>
                        <Link to="" className="active" >Terrains non valides</Link>
                    </nav>
                    <div className="container">
                        <header></header>
                            <main className="content">
                                <article>
                                <h1 style={{ fontSize: '24px' }} >Liste des terrains non valides</h1>
                                {loading ? (
                                        <div className="loading" >
                                                <img src={loadingSpinner} />
                                        </div>
                                    ) : (
                                        <div className="list_terrain">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Propriétaire</th>
                                                        <th>Nombre parecelles</th>
                                                        <th>latitude</th>
                                                        <th>longitude</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {listTerrain && listTerrain.map((terrain => (
                                                    <tr>
                                                        <td>{terrain.proprietaire.nomUser}</td>
                                                        <td>{terrain.nombreParecelles}</td>
                                                        <td>{terrain.latitude}</td>
                                                        <td>{terrain.longitude}</td>
                                                        <td style= {{borderBottom : "none",paddingLeft : "2%" }} ><button type='button' onClick={() => valider(terrain)}>Valider</button></td>
                                                    </tr>
                                                )))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </article>
                            </main>
                    </div>
                </div>
        </>
    )
}
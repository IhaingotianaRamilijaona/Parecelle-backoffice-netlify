import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListTerrainsNonValide  from '../components/ListTerrainsNonValide';
import loadingSpinner from '../img/loading.gif';

export default function TerrainNonValide () {
    const [listTerrain,setListTerrain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [loading]);

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
  
    const toggleLoading = (isLoading) => {
        setLoading(isLoading);
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
                                        <ListTerrainsNonValide listTerrain={listTerrain} toggleLoading={toggleLoading} />
                                    )}
                                </article>
                            </main>
                    </div>
                </div>
        </>
    )
}
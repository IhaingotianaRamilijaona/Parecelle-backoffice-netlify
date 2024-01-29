import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListCulture from '../components/LisCulture';
import loadingSpinner from '../img/loading.gif';
import { useNavigate } from 'react-router-dom';


export default function Cultures () {
    const [listCultures,setlistCultures] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nomCulture, setNomCulture] = useState(''); 
    const [prixCulture, setPrixCulture] = useState('');

    const navigate = useNavigate();
    const createCulture = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://parecelle-webservice-production.up.railway.app/POST/cultures?nomCulture="+nomCulture+"&&prixCulture="+prixCulture );
            if (!response.ok) {
                throw new Error('Failed to insert data');
            }
            const data = await response.json();
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await fetch("https://parecelle-webservice-production.up.railway.app/GET/cultures");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setlistCultures(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    return(
        <>
            <div className="main-container" >
                    <nav className="nav-bar">
                        <h1 style={{ fontSize: '24px' }} >Admin</h1>
                        <Link to="" className="active">Liste des cultures</Link>
                        <Link to="/terrain-nonValide" >Terrains non valides</Link>
                    </nav>
                    <div className="container">
                        <header></header>
                            <main className="content">
                                <article>
                                <h1 style={{ fontSize: '24px' }} >Liste des cultures</h1>
                                {loading ? (
                                    <div className="loading" >
                                            <img src={loadingSpinner} />
                                    </div>
                                    ) : (
                                        <>
                                                <div className="form_culture">
                                                    <form>
                                                    <input type="text" name="nomCulture" placeholder="Nom de la culture" value={nomCulture} onChange={(e) => setNomCulture(e.target.value)} />
                                                        <input type="number" name="prixCulture" placeholder="Prix de la culture" min="0" value={prixCulture} onChange={(e) => setPrixCulture(e.target.value)} />
                                                        <button type='button' onClick={createCulture}>Ajouter Culture</button>
                                                    </form>
                                                </div>
                                                <ListCulture listCultures = {listCultures} />
                                        </>
                                    )}
                                </article>
                            </main>
                    </div>
            </div>
        </> 
    )
}
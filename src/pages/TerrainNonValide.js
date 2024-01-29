import React, { useState,useEffect } from 'react';
import ListTerrainsNonValide  from '../components/ListTerrainsNonValide';
import '../css/general.css';

export default function TerrainNonValide () {
    const [listTerrain,setListTerrain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

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
    
    return(
        <>
            {loading ? (
                    <div>Loading...</div>
                ) : (
                <>
                    <nav>Nav</nav>
                    <div className="container">
                        <header>Header</header>
                            <main className="content">
                                <article>
                                    <ListTerrainsNonValide listTerrain={listTerrain} />
                                </article>
                            </main>
                        <footer>Footer</footer>
                    </div>
                </>
            )}
        </>
    )
}
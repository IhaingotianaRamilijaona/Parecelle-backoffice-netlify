import React, { useState,useEffect } from 'react';
import ListCulture from '../components/LisCulture';

export default function Cultures () {
    const [listCultures,setlistCultures] = useState(null);
    const [loading, setLoading] = useState(true);

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
            {loading ? (
                    <div>Loading...</div>
                ) : (
                <div className="col-2">
                    <header>Header</header>
                    <main className="content">
                        <article>
                        <ListCulture listCultures = {listCultures} />
                        </article>
                    </main>
                    <footer>Footer</footer>
                </div>
            )}
        </> 
    )
}
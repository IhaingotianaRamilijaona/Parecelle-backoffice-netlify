import React, { useState,useEffect } from 'react';

export default function CultureFormulaire ( ){
    const [nomCulture, setNomCulture] = useState(''); 
    const [prixCulture, setPrixCulture] = useState('');

    const createCulture = async () => {
        try {
            const response = await fetch("https://parecelle-webservice-production.up.railway.app/POST/cultures?nomCulture="+nomCulture+"&&prixCulture="+prixCulture );
            if (!response.ok) {
                throw new Error('Failed to insert data');
            }
            const data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return(
        <>

        <div className="form_culture">
            <form>
            <input type="text" name="nomCulture" placeholder="Nom de la culture" value={nomCulture} onChange={(e) => setNomCulture(e.target.value)} />
                <input type="number" name="prixCulture" placeholder="Prix de la culture" min="0" value={prixCulture} onChange={(e) => setPrixCulture(e.target.value)} />
                <button type='button' onClick={createCulture}>Confirmer</button>
            </form>
        </div>

        </> 
    )
}
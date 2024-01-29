import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListTerrainsNonValide(props){
    const [listTerrain,setListTerrain] = useState(props.listTerrain);

    useEffect(() => {
        setListTerrain(props.listTerrain);
    }, []);

    const navigate = useNavigate();
    const valider = async (terrainObject) => {
        
        try {
            props.toggleLoading(true);
            const response = await fetch("https://parecelle-webservice-production.up.railway.app/PUT/terrains", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(terrainObject)
            });
    
            if (!response.ok) {
                throw new Error('Failed to insert data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return(
        <>

        </> 
    )
}
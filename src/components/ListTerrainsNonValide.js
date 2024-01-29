import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListTerrainsNonValide(props){
    const [listTerrain,setListTerrain] = useState(props.listTerrain);

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

        </> 
    )
}
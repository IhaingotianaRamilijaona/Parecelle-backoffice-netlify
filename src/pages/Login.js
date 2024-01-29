import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Login (){
    const [nom, setnom] = useState(''); 
    const [mdp, setmdp] = useState('');

    const navigate = useNavigate();
    const checklogin = async () => {
        try {
            const response = await fetch("https://parecelle-webservice-production.up.railway.app/GET/users/login?nom="+nom+"&&mdp="+mdp );
            if (!response.ok) {
                throw new Error('Failed to insert data');
            }
            const data = await response.json();
            if(data!=null){
                navigate('/terrain-nonValide');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return(
        <div className="form_login">
            <form>
                <h1 style={{ fontSize: '30px' }} >Admin</h1>
                <input type="text" placeholder="Identifiant : Bob " value={nom} onChange={(e) => setnom(e.target.value)} values="Bob"/>
                <input type="password" placeholder="Mot de passe : pass456" min="0" value={mdp} onChange={(e) => setmdp(e.target.value)} values="pass456"/>
                <button type='button' onClick={checklogin}>Connexion</button>
            </form>
        </div>
    )
}
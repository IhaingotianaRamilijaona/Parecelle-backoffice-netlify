import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

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
        <body>
        <div className="form_login">
            <form>
                <input type="text" placeholder="Votre identifiant" value={nom} onChange={(e) => setnom(e.target.value)}/>
                <input type="password" placeholder="Votre mot de passe" min="0" value={mdp} onChange={(e) => setmdp(e.target.value)}/>
                <button type='button' onClick={checklogin}>Connexion</button>
            </form>
        </div>
        </body>
    )
}
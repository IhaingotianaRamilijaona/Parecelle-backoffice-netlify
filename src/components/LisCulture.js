import React, { useState,useEffect } from 'react';

export default function ListCulture (props){
    const [listCultures,setListCultures] = useState(props.listCultures)

    return(
        <>

        <div className="list_culture">
            <table>

                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prix</th>
                </tr>

                {listCultures.map((culture, index) => (
                    <tr>
                        <td>{culture.idCulture}</td>
                        <td>{culture.nomCulture}</td>
                        <td>{culture.prix}</td>
                    </tr>
                ))}

            </table>
        </div>

        </> 
    )
}
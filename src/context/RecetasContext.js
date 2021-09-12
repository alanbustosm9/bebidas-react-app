import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'


export const RecetasContext = createContext();

export const RecetasProvider = ( props ) => {

    const [ recetas, setRecetas ] = useState([])

    const [ ingredientes, setIngredientes ] = useState({
        nombre: '',
        categoria: ''
    })

    const [ consulta, setConsulta ] = useState(false)

    const { nombre, categoria } = ingredientes;

    useEffect(() => {
        
        if ( consulta ) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ nombre }&c=${ categoria }`
                
                const resultado = await axios.get( url )

                // console.log(resultado.data.drinks)
                setRecetas( resultado.data.drinks )
            }

            obtenerRecetas()
        }
                
    }, [ ingredientes, consulta, nombre, categoria ])


    return ( 
        <RecetasContext.Provider
            value={{
                recetas,
                setIngredientes,
                setConsulta
            }}
        >
            { props.children }
        </RecetasContext.Provider>

     );
}
 
